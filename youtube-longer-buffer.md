# YouTube Longer Buffer

Makes YouTube buffer up to 30 minutes ahead (configurable in the `CONFIG` block at the top of
[youtube-longer-buffer.user.js](youtube-longer-buffer.user.js)) instead of the usual minute or two.

## Why it needs two patches

From the current player (`/s/player/<hash>/player_es6.vflset/*/base.js`), the read-ahead target is:

```
readAheadSecs = min(byteBudget / formatByterate,
                    maxReadAheadSecs,
                    minReadAheadSecs + growthRate * elapsedSecs)
```

| knob                | default            | where it comes from                                                            |
| ------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `maxReadAheadSecs`  | 120                | `playerResponse.playerConfig.mediaCommonConfig.dynamicReadaheadConfig`          |
| `minReadAheadSecs`  | 15                 | same                                                                            |
| `growthRate`        | 1 (1s per 1s)      | same                                                                            |
| video byte budget   | 20 MB (36 MB >1080p, 100 MB >2160p) | hard coded in `base.js`, lives on the streaming policy object |
| audio byte budget   | 8 MB               | same                                                                            |

Only raising the time caps does almost nothing at high quality: 20 MB of 1080p video is about a
minute. So the script does both.

**Layer 1** rewrites `dynamicReadaheadConfig` in every player response — the one embedded in the page
(`window.ytInitialPlayerResponse`) and every `/youtubei/v1/player` fetch for later videos.

**Layer 2** finds the live streaming policy object and raises its byte budgets. Its property names are
minified and change with every player release, so it is found by shape: a walk of the object graph
looking for an object with many properties, at least two byte-sized numbers, and the deliberately odd
read-ahead value layer 1 injected (`bufferMinutes * 60 + 0.001` seconds). The player resets those
budgets when the quality goes above 1080p/4K, so they get re-applied.

The walk starts at `window`, **not** at `#movie_player` — the policy is not reachable from the player
element at all. On player `b0d2d49a` it lives 8 levels down at

```
window.ytPubsubPubsubInstance.B[3].app.mediaElement.<x>.loader.policy
```

with the video budget on `SO` and the audio budget on `RP`. That path is build-specific and is only
recorded here for debugging; the script never hardcodes it. Finding it costs ~3000 object visits and
about 11 ms.

## Browser limits

Chromium caps MSE buffers at 150 MiB video and 12 MiB audio
(`media/base/demuxer_memory_limit.h`) — roughly 5 minutes of 1080p, or ~12 minutes of audio. Past
that the append fails with `QuotaExceededError`, and YouTube reacts by shrinking its budget 20% and
re-seeking, which shows up as a hiccup. The script detects that and prints what to do:

```sh
open -a "Brave Browser" --args --mse-video-buffer-size-limit-mb=512 --mse-audio-buffer-size-limit-mb=32
```

(Only takes effect on a cold start of the browser.) Alternatively lower `videoBudgetMB` /
`audioBudgetMB` to ~140 / ~11 to stay under the default limits.

## Checking that it works

Open a long video, then in the console:

```js
const v = document.querySelector('video')
v.buffered.end(v.buffered.length - 1) - v.currentTime // seconds buffered ahead
```

Or right-click the player → *Stats for nerds* → "Buffer health". Without the script it stops around
60-120 s; with it, it should keep climbing until a byte limit is reached.

If the console shows `could not find the streaming policy object`, the object walk failed. This probe
(run with the script **disabled**, on a playing video) shows whether the policy is reachable at all —
it looks for the untouched defaults instead of the sentinel:

```js
const seen = new WeakSet()
let queue = [window]
for (let depth = 0; depth < 12 && queue.length; depth++) {
  const next = []
  for (const node of queue)
    for (const key of Object.keys(node)) {
      let value
      try {
        value = node[key]
      } catch {
        continue
      }
      if (!value || typeof value !== 'object' || value instanceof Node || seen.has(value)) continue
      // cross-origin iframe windows throw on any other property read
      try {
        if (value === window || value.window === value) continue
      } catch {
        continue
      }
      seen.add(value)
      const values = Object.values(value)
      if (values.includes(120) && values.includes(20971520)) {
        console.log('policy found at depth', depth, value)
        queue = []
        break
      }
      next.push(value)
    }
  queue = queue.length ? [] : next
}
```

## Caveats

- The buffer is real memory in the renderer, and **every tab gets its own**. Measured cost:

  | quality | media rate | what 512 MB buys |
  | ------- | ---------- | ---------------- |
  | 1080p30 | ~0.35 MB/s | ~24 min          |
  | 1080p60 | ~0.62 MB/s | ~14 min          |
  | 1440p60 | ~1.2 MB/s  | ~7 min           |
  | 4K60    | ~2.5 MB/s  | ~3.5 min         |

  On macOS this memory does not compress — the payload is already-compressed VP9/AV1 — so the memory
  compressor cannot reclaim it and it goes to swap instead. On a 16 GB machine keep `videoBudgetMB`
  around 512 and remember to multiply by the number of YouTube tabs you leave open.
- It is downloaded even if you close the tab straight after.
- YouTube can rename or restructure any of this at any player release; layer 2 fails soft (warns in
  the console) and layer 1 keeps working on its own.
