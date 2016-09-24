/*!
 cPlayer REWRITE - 2.0

     Author && user(:cry:)  Corps
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
         *  參數处理,合并默认参数与定义參數
         */
        const DEFAULTS = {
            "element": document.getElementById("cplayer"),
            "list"   : []
        };
        if(Object.assign !== undefined){
            this.options = Object.assign({}, DEFAULTS, options);
        }

        //SVG建立
        this.SVG = {
            "playArrow"     :'M16 10v28l22-14z',
            "pause"         :'M12 38h8V10h-8v28zm16-28v28h8V10h-8z',
            "playlistPlay"  :'M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z',
            "note"          :'M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z',
            "volumeUp"      :'M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z',
            "volumeMute"    :'M14 18v12h8l10 10V8L22 18h-8z',
            "volumeOff"     :'M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z',
            "volumeDown"    :'M37 24c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zm-27-6v12h8l10 10V8L18 18h-8z',
        };
        (()=>{
            for(let i = 0,keys = Object.keys(this.SVG),length = keys.length;i<length;i++){
                let svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
                    if(keys[i]==="playlistPlay"){
                        svg.setAttribute("viewBox","-12 -12 48 48");
                        svg.setAttribute("enable-background","new -12 -12 48 48")
                    }else{
                        svg.setAttribute("viewBox","0 0 48 48");
                    }
                    svg = keys[i]==="playlistPlay" ?
                     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="' + this.SVG[keys[i]] + '"/></svg>' :
                     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="' + this.SVG[keys[i]] + '"/></svg>';
                this.SVG[keys[i]] = svg;
            }
        })();

        this.CBASE = new cBase;
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
                                                let div = document.createElement("div");
                                                    let musicName = document.createElement("span");
                                                        musicName.classList.add("music-name");
                                                    let musicArtist = document.createElement("span");
                                                        musicArtist.classList.add("music-artist");
                                                    div.appendChild(musicName);
                                                    div.appendChild(musicArtist);
                                            musicMeta.appendChild(div);
                                    musicDescription.appendChild(image);
                                    musicDescription.appendChild(musicMeta);
                                let playIcon = document.createElement("a");
                                    playIcon.classList.add("play-icon");
                                    this.CBASE.replaceInner(playIcon,this.SVG.playArrow);
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
                                                    this.CBASE.replaceInner(volumePower,this.SVG.volumeOff);
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
                                            listPower.classList.add("list-power");
                                            this.CBASE.replaceInner(listPower,this.SVG.playlistPlay);
                                    listButton.appendChild(listPower);
                                let lyricButton = document.createElement("div");
                                    lyricButton.classList.add("lyric-button");
                                        let lyricPower = document.createElement("a");
                                            lyricPower.classList.add("lyric-power");
                                            this.CBASE.replaceInner(lyricPower,this.SVG.note);
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
        this.CBASE.root = this.options.element.getElementsByTagName("c-player");
        this.CBASE.root = this.CBASE.root[this.CBASE.root.length-1];
        //然后为DOMList填充一下吧
        this.__LIST__ = {
            "lyric"      : this.CBASE.getByClass("lyric"),
            "lyricBody"  : this.CBASE.getByTagName("lyric-body"),
            "toggle"     : this.CBASE.getByClass("play-icon"),
            "img"        : this.CBASE.getByClass("meta-bak"),
            "name"       : this.CBASE.getByClass("music-name"),
            "artist"     : this.CBASE.getByClass("music-artist"),
            "time"       : this.CBASE.getByClass("time"),
            "timeLine"   : this.CBASE.getByClass("time-line"),
            "timePoint"  : this.CBASE.getByClass("time-point"),
            "lyricPower" : this.CBASE.getByClass("lyric-power"),
            "volumePower": this.CBASE.getByClass("volume-power"),
            "volumeLine" : this.CBASE.getByClass("volume-line"),
            "volumePoint": this.CBASE.getByClass("volume-point"),
            "listPower"  : this.CBASE.getByClass("list-power"),
            "list"       : this.CBASE.getByClass("list"),
            "listBody"   : this.CBASE.getByTagName("list-body")
        };
        this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
        this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);


        this.music = document.createElement("audio");
        this.music.autoplay = !!this.options.autoplay;
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
            this.CBASE.replaceInner(this.__LIST__.toggle,this.SVG.playArrow);
            //再赋值,更新内容.
            //this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
        }).on("play",()=>{
            this.CBASE.replaceInner(this.__LIST__.toggle,this.SVG.pause);
            //再赋值,更新内容.
            this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
        }).on("ended",()=>{
            //this.__LIST__.lyricBody.style.transform = ""; 为了兼容性封装一遍
            this.CBASE.style(this.__LIST__.lyricBody,"transform","");
            if (this.options.list[this.now].loop === true) {
                    this.updateTime(0);
                    this.play();
            }else if (this.hasList()&&this.now !== this.options.list.length-1) {
                this.next();
            }
        });

        //结束


        if(this.options.list[0]) this.toggle();
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

        //以下内容是为了兼容UC
        if(this.music.onplay = undefined) Object.defineProperty(music,"paused",{set:function(check){
            if(check = true){
                this.emitter.emit("pause");
            }else{
                this.emitter.emit("play");
            }
        }});
        //以上内容是为了兼容UC

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
        let checkLevel = ()=>{
            if(this.music.volume===0||this.isMuted()){
                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeOff);
                this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);
            } else if(this.music.volume>0&&this.music.volume<=0.5){
                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeDown);
                this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);
            } else if(this.music.volume>0.5&&this.music.volume<=1){
                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeUp);
                this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);
            } else {
                console.log("Unexcepted Volume:"+this.music.volume);
            }
        }
        if (vl === undefined) {
            this.__LIST__.volumeLine.style.width = (this.music.volume * 100) + "%";
            checkLevel();
            return this.isMuted() ? 0 : this.music.volume;
        } else {
            if (vl === 0) {
                this.music.muted = true;
                checkLevel();
            } else {
                this.music.volume = vl;
                checkLevel();
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
        this.toggle().play();
        return this;
    }

    next() {
        this.emitter.emit("next");
        if(this.now === this.options.list.length-1) return;
        this.now++;
        this.toggle().play();
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
        this.music.pause();
        //if(this.music.ended)this.music.load();
        [dom.img.src, dom.name.innerHTML, dom.artist.innerHTML, this.music.src] = [list.image, list.name, list.artist, list.url];
        this.refreshLyric();
        if (!this.hasLyric(this.now))this.hideLyric();
        //this.__LIST__.lyricBody.style.transform = "";
        this.CBASE.style(this.__LIST__.lyricBody,"transform","");
        //this.play();
        return this;
    }

    isPaused(func) {
        if(func !== undefined) func();
        return this.music.paused;
    }

    hasLyric(id = 0,func) {
        if(func !== undefined) func();
        return (this.options.list[id].lyric != undefined);
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
        if(ln===1) this.toggle(); //刷新元素.
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
        for (/* let content of lr */ let i = 0,content=lr[i];i<lr.length;i++,content=lr[i]) {
            if (typeof content !== "string") break;
            let onelrc = content.split(/\[|\]\[|\]/gi);
            for (let i = 0; i < onelrc.length - 1; i++) {
                if (onelrc[i] === "" && i !== onelrc.length - 1 || onelrc[i].match(/\d{1,}\:\d{1,}/gi)===null) {
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
                    if (count !== lrcs[i].length - 1 && lrcs[i][lrcs[i].length - 1]!==undefined) {
                        lyric.push({time: lrcs[i][count], content: lrcs[i][lrcs[i].length - 1]});
                    }
                }

            } else if(lrcs[i][1]!==undefined) {
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
        if (time !== undefined)this.music.currentTime = time;
        if (this.dragging.contain === false) this.__LIST__.timeLine.style.width = (this.music.currentTime / this.music.duration) * 100 + "%";
        //if(this.isPaused()) this.play();
        if(func !== undefined) func(this.music.currentTime);
        //return this.music.currentTime;
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
                //this.__LIST__.lyricBody.style.transform = "translateY(" + translateY + "px)";
                this.CBASE.style(this.__LIST__.lyricBody,"transform","translateY(" + translateY + "px)")
            }
        }
    }
    get length(){
        return this.options.list.length;
    }
    set length(length){
        throw new SyntaxError("Read-only Property.");
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
class cBase{
    constructor(rootNode=document.documentElement){
        this.root = rootNode;
        for(let styleList = document.documentElement.style,i = styleList.length;i>0;i--){
            if(styleList[i].indexOf("-webkit-")!==-1){
                this.browser = "webkit";
                break;
            }
            if(styleList[i].indexOf("-moz-")!==-1){
                this.browser = "moz";
                break;
            }
            if(styleList[i].indexOf("-o-")!==-1){
                this.browser = "o";
                break;
            }
            if(styleList[i].indexOf("-ms-")!==-1){
                this.browser = "ms";
                break;
            }
        }
    }
    replace(oldElement,newElement){
        //newElement 不存在于oldElement 的父元素中,首先载入.
        newElement = newElement.cloneNode(true);
        oldElement.parentNode.appendChild(newElement);
        oldElement.parentNode.removeChild(oldElement);
        //顺便如果有值为oldElement的变量,请重新赋值.
    }
    replaceInner(element,innerContent){
        //进行一次简单的封装
        element.innerHTML = innerContent;
    }
    getByClass(className,parentElement){
        return parentElement!=undefined?parentElement.getElementsByClassName(className)[0]:this.root.getElementsByClassName(className)[0];
    }
    getByTagName(tagName,parentElement){
        return parentElement!=undefined?parentElement.getElementsByTagName(tagName)[0]:this.root.getElementsByTagName(tagName)[0];
    }
    rand(start,end){
        if(start===undefined||end===undefined) return Math.random();
        if(start>end) throw new RangeError("the EndNumber must be bigger than the StartNumber");
        return (end-start)*Math.random()+start;
    }
    style(dom,property,content){
        dom.style[this.browser+property.slice(0,1).toUpperCase()+property.slice(1)] = content;
        dom.style[property] = content;
    }
}