/*!
 cPlayer REWRITE - 2.0

     Author && user(:cry:)	Corps
     天若有情天亦老,我为长者续一秒~
 */
class cPlayer {
    constructor(options) {
        const EVENTS = {
            "play"              :[], //When Music be played, Emit.
            "pause"             :[], //When Music be paused, Emit.
            "volumechange"      :[],
            "timeupdate"        :[],
            "canplaythrough"    :[],
            "ended"             :[],
            //All the above are binded on AUDIO Elements,
            //The following items are Function's callback function.
            "toggle"            :[],
            "previous"          :[],
            "next"              :[],
            "changeList"        :[],
            "changeLyric"       :[],
            "slideList"         :[],
            "slideLyric"        :[],
            "clickLyricPower"   :[],
            "clickListPower"    :[],
            "clickVolumePower"  :[],
        };
        this.emitter = new cEmitter(EVENTS);
        this.on = (eventName,func)=>this.emitter.on(eventName,func);
        /*
         *	參數处理,合并默认参数与定义參數
         */
        const DEFAULTS = {
            "element": document.getElementById("cplayer"),
            "list"   : [],
            "mdicon" : true
        };
        if(Object.assign !== undefined){
            this.options = Object.assign({}, DEFAULTS, options);
        }
        if(this.options.mdicon !== false){
            let link = document.createElement("link");
            link.rel = "stylesheet";
            if(typeof this.options.mdicon === "string"){
                link.href = this.options.mdicon;
            }else{
                link.href = "https://cdn.bootcss.com/material-design-icons/2.2.3/iconfont/material-icons.css";
            }
            document.head.appendChild(link);
        };
        var list, gbc = (args,ald)=>ald!==undefined?ald.getElementsByClassName(args)[0]:this.options.element.getElementsByClassName(args)[0], gbn = (args)=>this.options.element.getElementsByTagName(args)[0];
        this.now = 0;
        this.dragging = {contain: false, target: undefined};
        //现在开始填DOM
        (()=>{
            let cPlayer = document.createElement("c-player");
                let lyric = document.createElement("div");
                    lyric.classList.add("lyric");
                    lyric.classList.add("invisible");
                        let lyricBody = document.createElement("lyric-body");
                    lyric.appendChild(lyricBody);
                let controls = document.createElement("div");
                    controls.classList.add("controls");
                        let cLeft = document.createElement("div");
                            cLeft.classList.add("c-left");
                                let musicDescription = document.createElement("div");
                                    musicDescription.classList.add("music-description");
                                        let image = document.createElement("div");
                                            image.classList.add("image");
                                                let metaBak = document.createElement("img");
                                                    metaBak.classList.add("meta-bak");
                                            image.appendChild(metaBak);
                                        let musicMeta = document.createElement("div");
                                            musicMeta.classList.add("music-meta");
                                                let musicName = document.createElement("span");
                                                    musicName.classList.add("music-name");
                                                let musicArtist = document.createElement("span");
                                                    musicArtist.classList.add("music-artist");
                                            musicMeta.appendChild(musicName);
                                            musicMeta.appendChild(musicArtist);
                                    musicDescription.appendChild(image);
                                    musicDescription.appendChild(musicMeta);
                                let playIcon = document.createElement("a");
                                    playIcon.classList.add("play-icon");
                                        let playtoggleicon = document.createElement("i");
                                            playtoggleicon.classList.add("material-icons");
                                            playtoggleicon.innerHTML = "play_arrow";
                                    playIcon.appendChild(playtoggleicon);
                            cLeft.appendChild(musicDescription);
                            cLeft.appendChild(playIcon);
                        let cCenter = document.createElement("div");
                            cCenter.classList.add("c-center");
                                let time = document.createElement("div");
                                    time.classList.add("time");
                                        let timeBody = document.createElement("div");
                                            timeBody.classList.add("time-body");
                                                let timeLine = document.createElement("div");
                                                    timeLine.classList.add("time-line");
                                                let timePoint = document.createElement("div");
                                                    timePoint.classList.add("time-point");
                                            timeBody.appendChild(timeLine);
                                            timeBody.appendChild(timePoint);
                                    time.appendChild(timeBody);
                            cCenter.appendChild(time);
                        let cRight = document.createElement("div");
                            cRight.classList.add("c-right");
                                let volume = document.createElement("div");
                                    volume.classList.add("volume");
                                        let volumeButton = document.createElement("div");
                                            volumeButton.classList.add("volume-button");
                                                let volumePower = document.createElement("a");
                                                    volumePower.classList.add("volume-power");
                                                        let volumeIcon = document.createElement("i");
                                                            volumeIcon.classList.add("material-icons");
                                                            volumeIcon.innerHTML = "volume_up";
                                                    volumePower.appendChild(volumeIcon);
                                            volumeButton.appendChild(volumePower);
                                        let volumeBody = document.createElement("div");
                                            volumeBody.classList.add("volume-body");
                                                let volumeLine = document.createElement("div");
                                                    volumeLine.classList.add("volume-line");
                                                let volumePoint = document.createElement("div");
                                                    volumePoint.classList.add("volume-point");
                                            volumeBody.appendChild(volumeLine);
                                            volumeBody.appendChild(volumePoint);
                                    volume.appendChild(volumeButton);
                                    volume.appendChild(volumeBody);
                                let listButton = document.createElement("div");
                                    listButton.classList.add("list-button");
                                        let listPower = document.createElement("a");
                                            listPower.classList.add("list-power")
                                                let listIcon = document.createElement("i");
                                                    listIcon.classList.add("material-icons");
                                                    listIcon.innerHTML = "playlist_play";
                                            listPower.appendChild(listIcon);
                                    listButton.appendChild(listPower);
                                let lyricButton = document.createElement("div");
                                    lyricButton.classList.add("lyric-button");
                                        let lyricPower = document.createElement("a");
                                            lyricPower.classList.add("lyric-power");
                                                let lyricIcon = document.createElement("i");
                                                    lyricIcon.classList.add("material-icons");
                                                    lyricIcon.innerHTML = "note";
                                            lyricPower.appendChild(lyricIcon);
                                    lyricButton.appendChild(lyricPower);
                            cRight.appendChild(volume);
                            cRight.appendChild(listButton);
                            cRight.appendChild(lyricButton);
                    controls.appendChild(cLeft);
                    controls.appendChild(cCenter);
                    controls.appendChild(cRight);
                let list = document.createElement("div");
                    list.classList.add("list");
                    list.classList.add("invisible");
                        let listBody = document.createElement("list-body");
                    list.appendChild(listBody);
            cPlayer.appendChild(lyric);
            cPlayer.appendChild(controls);
            cPlayer.appendChild(list);
            this.options.element.appendChild(cPlayer);
        })();
        //然后为DOMList填充一下吧
        this.__LIST__ = {
            "lyric"      : gbc("lyric"),
            "lyricBody"  : gbn("lyric-body"),
            "toggle"     : gbc("play-icon"),
            "img"        : gbc("meta-bak"),
            "name"       : gbc("music-name"),
            "artist"     : gbc("music-artist"),
            "time"       : gbc("time"),
            "timeLine"   : gbc("time-line"),
            "timePoint"  : gbc("time-point"),
            "lyricPower" : gbc("lyric-power"),
            "volumePower": gbc("volume-power"),
            "volumeLine" : gbc("volume-line"),
            "volumePoint": gbc("volume-point"),
            "listPower"  : gbc("list-power"),
            "list"       : gbc("list"),
            "listBody"   : gbn("list-body")
        };
        this.__LIST__.toggleIcon = gbc("material-icons",this.__LIST__.toggle);
        this.__LIST__.volumeIcon = gbc("material-icons",this.__LIST__.volumePower);

        this.music = new Audio;
        //绑定事件开始:

        this.emitter.on("toggle",()=>{
            if (this.isPaused()) {
                this.play();
            } else {
                this.pause();
            }
        }).on("clickLyricPower",()=>{
            if (this.hasLyric(this.now) && this.__LIST__.lyric.classList.contains("invisible")) {
                this.showLyric();
            } else if (this.hasLyric(this.now) && !this.__LIST__.lyric.classList.contains("invisible")) {
                this.hideLyric();
            }
        }).on("clickListPower",()=>{
            if (this.hasList() && this.__LIST__.list.classList.contains("invisible")) {
                this.showList();
            } else if (this.hasLyric() && !this.__LIST__.list.classList.contains("invisible")) {
                this.hideList();
            }
        }).on("clickVolumePower",()=>{
            if (this.isMuted()) {
                this.music.muted = false;
            } else {
                this.volume(0);
            }
        }).on("timeupdate",()=>{
            this.updateTime();
            if (this.hasLyric(this.now)) {
                this.slideLyric(this.music.currentTime);
            }
        }).on("volumechange",()=>{
            this.volume(); //做更新界面用.
        }).on("pause",()=>{
            //...
        }).on("play",()=>{
            //...
        }).on("ended",()=>{
            this.__LIST__.lyricBody.style.transform = "";
            this.__LIST__.toggleIcon.innerHTML = "play_arrow";
            if (this.options.list[this.now].loop === true) {
                    this.updateTime(0);
                    this.play();
            }else if (this.hasList()&&this.now !== this.options.list.length-1) {
                this.next();
            }
        });

        //结束


        this.toggle();
        this.__LIST__.toggle.addEventListener("click", ()=>this.emitter.emit("toggle"));
        this.__LIST__.lyricPower.addEventListener("click", ()=>this.emitter.emit("clickLyricPower"));
        this.__LIST__.listPower.addEventListener("click", ()=>this.emitter.emit("clickListPower"));
        this.__LIST__.volumePower.addEventListener("click", ()=>this.emitter.emit("clickVolumePower"));
        this.music.addEventListener("volumechange", (ev)=>this.emitter.emit("volumechange",ev));
        this.music.addEventListener("timeupdate", (ev)=>this.emitter.emit("timeupdate",ev));
        this.music.addEventListener("canplaythrough", ()=>this.emitter.emit("canplaythrough"));
        this.music.addEventListener("pause", ()=>this.emitter.emit("pause"));
        this.music.addEventListener("play", ()=>this.emitter.emit("play"));
        this.music.addEventListener("ended", ()=>this.emitter.emit("ended"));
        //以下内容不适合使用cEmitter,所以就不使用了.
        this.options.element.addEventListener("mousedown", (a)=>this.dragPercentage(a));
        this.options.element.addEventListener("mousemove", (a)=>this.dragPercentage(a));
        this.options.element.addEventListener("mouseup", (a)=>this.dragPercentage(a));
        //以上内容不适合使用cEmitter,所以就不使用了.

        this.volume();
        this.refreshList();
    };

    dragPercentage(options) {
        switch (options.type) {
            case "mousedown":
                if (!(options.target !== this.__LIST__.timePoint || options.target !== this.__LIST__.volumePoint)) return;
                this.dragging.contain = true;
                this.dragging.target = options.target;
                break;
            case "mousemove":
                if (this.dragging.contain === false) return;
                if (this.dragging.target.parentNode.classList.contains("volume-body")) {
                    this.__LIST__.volumeLine.style.width = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth * 100 + "%";
                } else if (this.dragging.target.parentNode.classList.contains("time-body")) {
                    this.__LIST__.timeLine.style.width = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth * 100 + "%";
                }
                //实时修正VOLUME(某人强烈要求)
                if (this.dragging.target.parentNode.classList.contains("volume-body")) {
                    let vol = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                    vol = vol > 1 ? 1 : vol;
                    vol = vol < 0 ? 0 : vol;
                    this.music.volume = vol;
                }
                break;
            case "mouseup":
                if (this.dragging.contain === false) return;
                if (this.dragging.target.parentNode.classList.contains("volume-body")) {
                    let vol = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                    vol = vol > 1 ? 1 : vol;
                    vol = vol < 0 ? 0 : vol;
                    this.music.volume = vol;
                } else if (this.dragging.target.parentNode.classList.contains("time-body")) {
                    let time = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                    time = time > 1 ? 1 : time;
                    time = time < 0 ? 0 : time;
                    this.music.currentTime = time * this.music.duration;
                }
                this.dragging.contain = false;
                this.dragging.target = undefined;
                break;
        }
    }

    volume(vl = undefined) {
        if (vl === undefined) {
            this.__LIST__.volumeLine.style.width = (this.music.volume * 100) + "%";
            if(!this.isMuted()){
                this.__LIST__.volumeIcon.innerHTML = "volume_up";
            }
            return this.isMuted() ? 0 : this.music.volume;
        } else {
            if (vl === 0) {
                this.music.muted = true;
                this.__LIST__.volumeIcon.innerHTML = "volume_mute";
            } else {
                this.music.volume = vl;
                this.__LIST__.volumeIcon.innerHTML = "volume_up";
            }
        }
    }

    isMuted() {
        return this.music.muted;
    }

    play() {
        if(this.music.seeking === true) return this;
        this.music.play();
        return this;
    }

    pause() {
        if(this.music.seeking === true) return;
        this.music.pause();
        return this;
    }

    previous() {
        this.emitter.emit("previous");
        if(this.now === 0) return;
        this.now--;
        this.toggle();
        this.play();
        return this;
    }

    next() {
        this.emitter.emit("next");
        if(this.now === this.options.list.length-1) return;
        this.now++;
        this.toggle();
        this.play();
        return this;
    }

    to(now) {
        this.now = now;
        this.toggle();
        this.play();
        return this;
    }

    toggle(now = this.now) {
        this.emitter.emit("toggle");
        let list = this.options.list[now], dom = this.__LIST__;
        this.pause();
        [dom.img.src, dom.name.innerHTML, dom.artist.innerHTML, this.music.src] = [list.image, list.name, list.artist, list.url];
        this.refreshLyric();
        if (!this.hasLyric(this.now))this.hideLyric();
        this.__LIST__.lyricBody.style.transform = "";
        //this.play();
        return this;
    }

    isPaused(func) {
        if(func !== undefined) func();
        return this.music.paused;
    }

    hasLyric(id = 0,func) {
        if(func !== undefined) func();
        return (this.options.list[id].lyric !== undefined);
    }

    showLyric() {
        this.emitter.emit("slideLyric",true);
        if (this.hasLyric(this.now))this.__LIST__.lyric.classList.remove("invisible");
        if (!this.__LIST__.list.classList.contains("invisible")) this.hideList();
        return this;
    }

    hideLyric() {
        this.emitter.emit("slideLyric",false);
        this.__LIST__.lyric.classList.add("invisible");
        return this;
    }

    hasList(func) {
        if(func !== undefined) func();
        return (this.options.list.length > 1);
    }

    showList(func) {
        this.emitter.emit("slideList",true);
        this.__LIST__.list.classList.remove("invisible");
        if (!this.__LIST__.lyric.classList.contains("invisible")) this.hideLyric();
        if(func !== undefined) func();
        return this;
    }

    hideList(func) {
        this.emitter.emit("slideList",false);
        this.__LIST__.list.classList.add("invisible");
        if(func !== undefined) func();
        return this;
    }

    refreshList(func) {
        this.emitter.emit("changeList");
        //let __SELF__ = this;
        let list = this.options.list, lb = this.__LIST__.listBody;
        lb.innerHTML = ``;
        for (let i = 0; i <= list.length - 1; i++) {
            let div = document.createElement("div");
            div.innerHTML = '<span class="music-name">' + list[i].name + '</span><span class="music-artist">' + list[i].artist + '</span>';
            div = lb.appendChild(div);
            div.addEventListener("click", ()=> {
                this.to(i);
            });
        }
        if(func !== undefined) func();
    }

    add(u,func) {
        //let __SELF__ = this;
        let ln = this.options.list.push(u);
        let div = document.createElement("div");
        div.innerHTML = '<span class="music-name">' + u.name + '</span><span class="music-artist">' + u.artist + '</span>';
        div = this.__LIST__.listBody.appendChild(div);
        div.addEventListener("click", ()=> {
            this.to(ln - 1);
        });
        if(func !== undefined) func();
    }

    lyric(content = undefined) {
        if (content === undefined) {
            if (this.hasLyric(this.now)) return this.options.list[this.now].lyric;
        } else {
            this.options.list[this.now].lyric = content;
            this.refreshLyric();
        }
        return this;
    }

    refreshLyric() {
        //REQUIRE LYRIC...
        this.__LIST__.lyricBody.innerHTML = ``;
        if (!this.hasLyric(this.now)) return;
        let lr = this.options.list[this.now].lyric;
        //START LRC BASEING...
        lr = lr.split("\n");
        let lrcs = [];
        for (let content of lr) {
            if (typeof content !== "string") break;
            let onelrc = content.split(/\[|\]\[|\]/gi);
            for (let i = 0; i < onelrc.length - 1; i++) {
                if (onelrc[i] === "" && i !== onelrc.length - 1) {
                    onelrc.splice(i, 1);
                    i--;
                    continue;
                }

                if (onelrc[i].match(/\d{1,}\:\d{1,}/gi)) {
                    let lyricsarray = onelrc[i].split(/\:|\./gi);
                    switch (lyricsarray.length) {
                        case 2:
                            onelrc[i] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]);
                            break;
                        case 3:
                            onelrc[i] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]) + parseFloat("0." + lyricsarray[2]);
                            break;
                        default:
                            throw new Error("Time not be Found!")
                    }
                }
            }

            lrcs.push(onelrc);
        }
        //LRC BASED
        let lyric = [];
        for (let i = lrcs.length - 1; i >= 0; i--) {
            if (lrcs[i].length > 2) {
                for (let count = lrcs[i].length - 1; count >= 0; count--) {
                    if (count !== lrcs[i].length - 1) {
                        lyric.push({time: lrcs[i][count], content: lrcs[i][lrcs[i].length - 1]});
                    }
                }

            } else {
                lyric.push({time: lrcs[i][0], content: lrcs[i][1]});
            }
        }

        lyric.sort((a, b)=> {
            return a.time - b.time;
        });
        this.__LYRIC__ = lyric;
        for (let i = 0; i <= lyric.length - 1; i++) {
            let div = document.createElement("lrc");
            div.innerHTML = lyric[i].content;
            this.__LIST__.lyricBody.appendChild(div);
        }
        this.emitter.emit("changeLyric");

    }

    updateTime(time = undefined,func) {
        if (time !== undefined)this.music.currentTime = parseInt(time);
        if (this.dragging.contain === false) this.__LIST__.timeLine.style.width = (this.music.currentTime / this.music.duration) * 100 + "%";
        //if(this.isPaused()) this.play();
        if(func !== undefined) func(this.music.currentTime);
        return this.music.currentTime;
    }

    /*
     Function:slideLyric
     use <numberic>time
     如果LYRIC到最初(没有前一个DIV时),确定NOW.
     如果LYRIC为中间,确定时间,NOW.
     [i]:当前歌词
     [i-1]:上一个歌词
     [i+1]:下一个歌词
     * 此时应操纵下一个歌词!!!!(重要) *
     */
    slideLyric(time) {
        if(this.__LIST__.lyric.classList.contains("invisible"))return;
        let lyricToTop,halfBody,translateY;
        for (var i = this.__LYRIC__.length - 1; i >= 0; i--) {
            if (this.__LYRIC__[i + 1] !== undefined && this.__LYRIC__[i].time < time && this.__LYRIC__[i + 1].time > time
                || this.__LYRIC__[i + 1] === undefined && this.__LYRIC__[i].time < time) {
                if (this.__LIST__.lyricBody.querySelector(".now") !== null && this.__LIST__.lyricBody.querySelector(".now") !== this.__LIST__.lyricBody.childNodes[i + 1])
                    this.__LIST__.lyricBody.querySelector(".now").classList.toggle("now");
                this.__LIST__.lyricBody.childNodes[i].classList.toggle("now");
                //以下四句借鉴了KK的写法,感谢Kookxiang.
                let lyricToTop = this.__LIST__.lyricBody.childNodes[i].offsetTop - this.__LIST__.lyricBody.childNodes[0].offsetTop - 0.5 * this.__LIST__.lyricBody.childNodes[i].clientHeight;
                let halfBody = 0.5 * this.__LIST__.lyric.clientHeight - this.__LIST__.lyricBody.childNodes[i].clientHeight;
                let translateY = -(lyricToTop - halfBody);
                this.__LIST__.lyricBody.style.transform = "translateY(" + translateY + "px)";
            }
        }
    }
}


//Object.assign 解决方案
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

class cEmitter{
    constructor(typeList){
        if(typeList){
            this.events = typeList;
        }else{
            this.events = [];
        }
    }
    on(eventName,func){
        //func的参数这样写:function([参数A,参数B]){}或者箭头函数([参数A,参数B])=>{}
        if(this.events[eventName]&&this.events[eventName].push !== undefined&&typeof func === "function"){
            this.events[eventName].push(func);
        }else if(this.events[eventName]===undefined||this.events[eventName].push===undefined){
            this.events[eventName] = [];
        }else{
            throw new TypeError("Uncaught Unexcepted TypeError.")
        }
        return this;
    }
    emit(eventName,...args){
        for(let i = 0;i<this.events[eventName].length;i++){
            this.events[eventName][i](args);
        }
        return this;
        //也许会有emitter.emit(..).emit(..)的写法?一次执行俩事件,实在不知道哪里有用...
    }
}