// ==UserScript==
// @name         YouTube Longer Buffer
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      1.0.0
// @description  Makes YouTube buffer far ahead (30 minutes by default, configurable below) instead of the usual ~1-2 minutes
// @author       Alistair1231
// @match        *://www.youtube.com/*
// @match        *://m.youtube.com/*
// @match        *://music.youtube.com/*
// @icon         https://icons.duckduckgo.com/ip2/youtube.com.ico
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/blob/master/youtube-longer-buffer.user.js
//
// How YouTube decides how far ahead to buffer (from the player's base.js):
//   readAheadSecs = min(byteBudget / formatByterate,          // 20 MB video / 8 MB audio on desktop
//                       maxReadAheadSecs,                     // 120 by default
//                       minReadAheadSecs + growth * elapsed)  // 15 + 1 * elapsed by default
// The time caps come from the player response and are patched below (layer 1). The byte budgets are
// hard coded in the player and only exist on the live policy object, so they are patched at runtime
// (layer 2) - without that, 20 MB of video is only ~1 minute at 1080p and the 30 minutes never apply.
//
// On top of all that, the browser caps MSE buffers at 150 MiB video / 12 MiB audio. To go past that
// (needed for a real 30 minutes at high quality), launch the browser with e.g.
//   open -a "Brave Browser" --args --mse-video-buffer-size-limit-mb=1024 --mse-audio-buffer-size-limit-mb=64
// Without those flags YouTube hits QuotaExceededError, shrinks its own budget and re-seeks; the
// script notices that and tells you in the console.
//
// Note: 30 minutes of 1080p is roughly a gigabyte of memory per tab, and it gets downloaded even if
// you close the tab right after.

;(function () {
  'use strict'

  const CONFIG = {
    bufferMinutes: 30, // maximum read-ahead
    initialBufferMinutes: 30, // read-ahead allowed right away (lower it to ramp up instead)
    growthRateMs: 1000, // read-ahead gained per ms of playback, 1000 = 1s per 1s
    patchByteBudget: true, // layer 2, without it the 20 MB video budget still caps the buffer
    videoBudgetMB: 1024,
    audioBudgetMB: 64,
    debug: true,
  }

  // !!!
  // !!! End of configuration
  // !!!

  const PREFIX = '[yt-buffer]'
  const MAX_READ_AHEAD_MS = CONFIG.bufferMinutes * 60000 + 1 // the +1ms makes the value recognizable
  const MIN_READ_AHEAD_MS = CONFIG.initialBufferMinutes * 60000
  const SENTINEL_SECS = MAX_READ_AHEAD_MS / 1000 // what the player stores as its max read-ahead
  const SENTINEL_SECS_MIN = MIN_READ_AHEAD_MS / 1000 // ...and as its minimum, second best marker
  const VIDEO_BUDGET_BYTES = CONFIG.videoBudgetMB * 1024 * 1024
  const AUDIO_BUDGET_BYTES = CONFIG.audioBudgetMB * 1024 * 1024

  // The byte budgets the player hard codes, used to tell the video/audio budget apart from the other
  // large numbers on the policy object (and to recognize the player resetting them).
  const VIDEO_BUDGETS = [104857600, 36700160, 20971520, 8388608]
  const AUDIO_BUDGETS = [8388608, 5242880, 1572864, 524288]

  const MAX_DEPTH = 12
  const MAX_NODES = 30000

  const log = (...args) => CONFIG.debug && console.log(PREFIX, ...args)
  const warn = (...args) => console.warn(PREFIX, ...args)

  // ---------------------------------------------------------------------------
  // Layer 1: raise the read-ahead time caps in every player response
  // ---------------------------------------------------------------------------

  let patchedResponses = 0

  function patchPlayerResponse(playerResponse, source) {
    if (!playerResponse || typeof playerResponse !== 'object') return playerResponse
    // heartbeat/other innertube payloads have no player config to speak of
    if (
      !playerResponse.streamingData &&
      !playerResponse.videoDetails &&
      !playerResponse.playerConfig
    )
      return playerResponse

    try {
      const playerConfig = (playerResponse.playerConfig ||= {})
      const mediaCommonConfig = (playerConfig.mediaCommonConfig ||= {})
      const readahead = (mediaCommonConfig.dynamicReadaheadConfig ||= {})
      readahead.maxReadAheadMediaTimeMs = MAX_READ_AHEAD_MS
      readahead.minReadAheadMediaTimeMs = MIN_READ_AHEAD_MS
      readahead.readAheadGrowthRateMs = CONFIG.growthRateMs
      patchedResponses++
      log(
        `read-ahead limit set to ${CONFIG.bufferMinutes} min (${source}, #${patchedResponses})`
      )
    } catch (error) {
      warn('could not patch player response', error)
    }
    return playerResponse
  }

  // the player response of the page you land on
  let initialPlayerResponse = window.ytInitialPlayerResponse
  if (initialPlayerResponse) patchPlayerResponse(initialPlayerResponse, 'ytInitialPlayerResponse')
  try {
    Object.defineProperty(window, 'ytInitialPlayerResponse', {
      configurable: true,
      get: () => initialPlayerResponse,
      set: (value) => {
        initialPlayerResponse = patchPlayerResponse(value, 'ytInitialPlayerResponse')
      },
    })
  } catch (error) {
    warn('could not hook ytInitialPlayerResponse', error)
  }

  // every following video is fetched from the innertube API
  const nativeFetch = window.fetch
  window.fetch = function (input) {
    const result = nativeFetch.apply(this, arguments)
    let url = ''
    try {
      url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input)
    } catch {
      return result
    }
    if (!url.includes('/youtubei/v1/player') || url.includes('heartbeat')) return result

    return result.then((response) =>
      response
        .clone()
        .json()
        .then((data) => {
          patchPlayerResponse(data, '/youtubei/v1/player')
          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          })
        })
        .catch((error) => {
          warn('could not patch the player API response', error)
          return response
        })
    )
  }

  // ---------------------------------------------------------------------------
  // Layer 2: raise the byte budgets on the player's live streaming policy
  // ---------------------------------------------------------------------------

  const patched = new WeakSet()
  let policy = null
  let videoKey = null
  let audioKey = null
  let quotaWarned = false
  let attempts = 0
  let attemptTimer = null

  const isTraversable = (value) => {
    try {
      return (
        !!value &&
        typeof value === 'object' &&
        value !== window &&
        !(value instanceof Node) &&
        !(value instanceof Window)
      )
    } catch {
      return false
    }
  }

  const ownKeys = (value) => {
    try {
      return Object.keys(value)
    } catch {
      return []
    }
  }

  const read = (object, key) => {
    try {
      return object[key]
    } catch {
      return undefined
    }
  }

  // The policy object is minified and its property names change with every player release, so it is
  // recognized by its values: it carries the read-ahead limit we injected plus a couple of byte
  // budgets, on an object with a lot of properties.
  function isPolicy(candidate) {
    let hasSentinel = false
    let bigNumbers = 0
    const keys = ownKeys(candidate)
    if (keys.length < 30) return false
    for (const key of keys) {
      const value = read(candidate, key)
      if (typeof value !== 'number') continue
      if (value === SENTINEL_SECS || (SENTINEL_SECS_MIN > 0 && value === SENTINEL_SECS_MIN))
        hasSentinel = true
      else if (value >= 1e6) bigNumbers++
    }
    return hasSentinel && bigNumbers >= 2
  }

  function findPolicy() {
    const roots = [
      document.getElementById('movie_player'),
      document.querySelector('ytd-player'),
      document.querySelector('video'),
    ].filter(Boolean)

    const seen = new WeakSet()
    let queue = roots
    let visited = 0

    for (let depth = 0; depth < MAX_DEPTH && queue.length; depth++) {
      const next = []
      for (const node of queue) {
        for (const key of ownKeys(node)) {
          const value = read(node, key)
          if (!isTraversable(value) || seen.has(value)) continue
          seen.add(value)
          if (++visited > MAX_NODES) return null
          if (isPolicy(value)) return value
          next.push(value)
        }
      }
      queue = next
    }
    return null
  }

  const mb = (bytes) => `${Math.round(bytes / 1048576)} MB`

  // picks the video/audio budget out of the large numbers on the policy object
  function findBudgetKeys(candidate) {
    const numbers = ownKeys(candidate)
      .map((key) => [key, read(candidate, key)])
      .filter(([, value]) => typeof value === 'number' && value >= 1e6)
      .sort((a, b) => b[1] - a[1])

    const video = numbers.find(([, value]) => VIDEO_BUDGETS.includes(value))
    const audio = numbers.find(
      ([key, value]) => AUDIO_BUDGETS.includes(value) && key !== video?.[0]
    )
    if (video && audio) return [video[0], audio[0]]

    // unknown player build: fall back to "the two biggest numbers are the budgets"
    if (numbers.length >= 2) {
      warn('unknown byte budgets, guessing from', numbers.slice(0, 2))
      return [numbers[0][0], numbers[1][0]]
    }
    return []
  }

  function patchPolicy(candidate) {
    const [video, audio] = findBudgetKeys(candidate)
    if (!video || !audio) {
      warn('found the streaming policy but not its byte budgets')
      return false
    }
    const before = [read(candidate, video), read(candidate, audio)]
    if (VIDEO_BUDGET_BYTES > before[0]) candidate[video] = VIDEO_BUDGET_BYTES
    if (AUDIO_BUDGET_BYTES > before[1]) candidate[audio] = AUDIO_BUDGET_BYTES

    policy = candidate
    videoKey = video
    audioKey = audio
    log(
      `byte budgets raised: video ${mb(before[0])} -> ${mb(read(candidate, video))}, ` +
        `audio ${mb(before[1])} -> ${mb(read(candidate, audio))}`
    )
    return true
  }

  function locatePolicy() {
    if (!CONFIG.patchByteBudget) return
    attempts++
    const candidate = findPolicy()
    if (candidate) {
      if (!patched.has(candidate)) {
        patched.add(candidate)
        patchPolicy(candidate)
      }
      return
    }
    if (attempts < 6) attemptTimer = setTimeout(locatePolicy, 1000 * attempts)
    else
      warn(
        'could not find the streaming policy object, only the read-ahead time limit was raised. ' +
          'The player probably changed - set patchByteBudget to false to silence this.'
      )
  }

  function scheduleLocate() {
    if (!CONFIG.patchByteBudget) return
    clearTimeout(attemptTimer)
    attempts = 0
    attemptTimer = setTimeout(locatePolicy, 500)
  }

  // Every playback builds a fresh policy, so look again on navigation and when a video starts.
  window.addEventListener('yt-navigate-finish', scheduleLocate, true)
  document.addEventListener('yt-navigate-finish', scheduleLocate, true)
  document.addEventListener('loadedmetadata', scheduleLocate, true)
  document.addEventListener('playing', scheduleLocate, true)
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', scheduleLocate, { once: true })
  else scheduleLocate()

  // The player lowers the budgets itself in two cases: it resets them to one of its own constants
  // when the quality goes above 1080p/4K (re-apply), or it shrinks them by 20% after the browser
  // refused an append because its own MSE limit was reached (leave it alone and say so).
  setInterval(() => {
    if (!policy || !videoKey) return
    const video = read(policy, videoKey)
    const audio = read(policy, audioKey)
    const shrunk = video < VIDEO_BUDGET_BYTES || audio < AUDIO_BUDGET_BYTES
    if (!shrunk) return

    if (VIDEO_BUDGETS.includes(video) || AUDIO_BUDGETS.includes(audio)) {
      log('player reset its byte budgets (quality change), re-applying')
      if (VIDEO_BUDGET_BYTES > video) policy[videoKey] = VIDEO_BUDGET_BYTES
      if (AUDIO_BUDGET_BYTES > audio) policy[audioKey] = AUDIO_BUDGET_BYTES
      return
    }

    if (!quotaWarned) {
      quotaWarned = true
      warn(
        `the browser refused to buffer this much (video budget is down to ${mb(video)}, audio ${mb(
          audio
        )}). ` +
          'Restart the browser with --mse-video-buffer-size-limit-mb and ' +
          '--mse-audio-buffer-size-limit-mb to allow more, or lower videoBudgetMB/audioBudgetMB.'
      )
    }
  }, 5000)
})()
