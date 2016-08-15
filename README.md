# cPlayer 

Maybe It's the best code I wrote.

__Warning: This can only be loaded well in the MODERN-BROWSER(eg. Edge14+,Firefox(Current Version,Chrome(Current Version)...))__

---

## Install && Build

```bash
npm install
npm run dist
```

### Make a DEMO

```bash
npm run demo
```

## Usage

### HTML

```html
<html>
    <head>
        ...
        <link rel="stylesheet" href=".../cplayer.min.css">
        ...
    </head>
    <body>
        ...
        <div id="here"></div>
        ...
        <script src=".../cplayer.min.js"></script>
    </body>
</html>
```

### Javascript

```javascript
let cp = new cPlayer({
    "element":document.getElementById("here"),
    "list":[
        {
            "name":"NINELIE", //The Music's Name
            "artist":"Aimer/EGOist",//The Music's Artist
            "image":"http://xxxxx",//The Music's Cover
            "url":"http://xxxxx",//The Music's URL
            "loop":true,//If loop === true,the Music will be played again and again.
            "lyric":`
            [00:00.00]XXXXXXXX
            .....
            [00:99.99][11:99.99]XXXXX
            ` //The Lyric(Extra)
        },
        {
            .......
        },
        .........
    ]
});
```

## APIs

* `cp.play()` // Play
* `cp.pause()` // Pause
* `cp.volume(number)` // Set Volume
* `cp.isMuted()` // Return if the music is muted
* `cp.isPaused()` // Return if the music is paused
* `cp.last()` // Set the previous music
* `cp.next()` // Set the next music
* `cp.to(now)` // Set the music you set
* `cp.hasLyric(id)` // Return if the music you set has lyric
* `cp.showLyric()` // Show the Lyric Body,if the music at that time hasn't lyric,DO NOTHING;if the Lyric Body is already shown,HIDE IT.
* `cp.hideLyric()` // Hide the Lyric Body
* `cp.hasList()`
* `cp.showList()`
* `cp.hideList()` // (The Same As Above)
* `refreshList()` // Refresh the List from `__LIST__`(unuseful)
* `cp.add(options)` // Add music(the options is like above)
* `cp.lyric(a)` // Set Lyric or Get Lyric
* `cp.refreshLyric()` // Refresh the lyric now from `__LYRIC__`(unuseful)
* `cp.updateTime()` // Set Music's Current Time
* `cp.slideLyric(time)` //Core Lyric Process
* `cp.on(eventName,func)` //__NEW!__ Set Events

## Events

Now Here are some events.

| Event          | param | Note                                                         |
|----------------|:-----:|--------------------------------------------------------------|
|play            |       |                                                              |
|pause           |       |                                                              |
|volumechange    |   √   | Return the music's own event object                          |
|timeupdate      |   √   | The same as above                                            |
|canplaythrough  |       |                                                              |
|ended           |       |                                                              |
|toggle          |       |                                                              |
|previous        |       |                                                              |
|next            |       |                                                              |
|changeList      |       |                                                              |
|changeLyric     |       |                                                              |
|slideList       |   √   | If showed,the param is `true`;If not,the param is `false`    |
|slideLyric      |   √   | The same as above                                            |
|clickListPower  |       |                                                              |
|clickLyricPower |       |                                                              |
|clickVolumePower|       |                                                              |

### Usage

```javascript
cp.on("slideLyric",([showed])=>{
    if(showed===true){
        //...
    }else{
        //...
    }
}).on("timeupdate",([ev])=>{
    //...
})
```

## DEMO

[Click Here to See the Demo](http://cplayer.js.org)
