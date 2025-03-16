# Dark Mode Toggle

I got frustrated with how complex and unreliable existing dark mode methods were, so I made a very simple one myself. It simply inverts the colors of the page, while keeping images and videos the same. 

Double-Hit Esc to shortly display the toggle button. Dark Mode state is saved in `window.localStorage.darkMode` for persistence.

Style loads very early to avoid white flash.


Button:  
![](https://i.imgur.com/QHLkEt1.png)

Before:  
![](https://i.imgur.com/dPOUHGp.png)

After:  
![](https://i.imgur.com/Dqjb1hq.png)
