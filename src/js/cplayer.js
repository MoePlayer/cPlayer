/*!
 cPlayer REWRITE - 2.0

     Author && user(:cry:)	Corps
     天若有情天亦老,我为长者续一秒~
 */
"use strict";
class cPlayer {
    constructor(options) {
        /*
         *	參數处理,合并默认参数与定义參數
         */
        const DEFAULTS = {
            "element": document.getElementById("cplayer"),
            "list"   : [],
            "mdicon" : true
        };
        /*
        if(!Object.assign) {
            console.log("BAD BROWSER,CPLAYER CAN'T BE USED.");
            alert("Please UPDATE YOUR BROWSER!!!");
        };
        */
        //let __SELF__ = this;
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
        this.options.element.innerHTML = `
    <c-player>
        <div class="lyric invisible">
            <lyric-body>
            </lyric-body>
        </div>
        <div class="controls">
            <div class="c-left">
                <div class="music-description">
                    <div class="image">
                        <img class="meta-bak" src="" alt="">
                    </div>
                    <div class="music-meta">
                        <span class="music-name"></span>
                        <span class="music-artist"></span>
                    </div>
                </div>
                <a class="play-icon"><i class="material-icons">play_arrow</i></a>
            </div>
            <div class="c-center">
                <div class="time">
                    <div class="time-body">
                        <div class="time-line"></div>
                        <div class="time-point"></div>
                    </div>
                </div>
            </div>
            <div class="c-right">
                <div class="volume">
                    <div class="volume-button">
                        <a class="volume-power">
                            <i class="material-icons">volume_up</i>
                        </a>
                    </div>
                    <div class="volume-body">
                        <div class="volume-line"></div>
                        <div class="volume-point"></div>
                    </div>
                </div>
                <div class="list-button">
                    <a class="list-power">
                        <i class="material-icons">playlist_play</i>
                    </a>
                </div>
                <div class="lyric-button">
                    <a class="lyric-power">
                        <i class="material-icons">note</i>
                    </a>
                </div>
            </div>
        </div>

        <div class="list invisible">
            <list-body>
            </list-body>
        </div>
    </c-player>`;
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
        this.toggle();
        this.__LIST__.toggle.addEventListener("click", ()=> {
            if (this.isPaused()) {
                this.play();
            } else {
                this.pause();
            }
        });
        this.__LIST__.lyricPower.addEventListener("click", ()=> {
            if (this.hasLyric(this.now) && this.__LIST__.lyric.classList.contains("invisible")) {
                this.showLyric();
            } else if (this.hasLyric(this.now) && !this.__LIST__.lyric.classList.contains("invisible")) {
                this.hideLyric();
            }
        });
        this.__LIST__.listPower.addEventListener("click", ()=> {
            if (this.hasList() && this.__LIST__.list.classList.contains("invisible")) {
                this.showList();
            } else if (this.hasLyric() && !this.__LIST__.list.classList.contains("invisible")) {
                this.hideList();
            }
        });
        this.__LIST__.volumePower.addEventListener("click", ()=> {
            if (this.isMuted()) {
                this.music.muted = false;
            } else {
                this.volume(0);
            }
        });
        this.music.addEventListener("volumechange", ()=> {
            this.volume();
        });
        this.music.addEventListener("timeupdate", ()=> {
            this.updateTime();
            if (this.hasLyric(this.now)) {
                this.slideLyric(this.music.currentTime);
            }
        });
        this.music.addEventListener("canplaythrough", ()=> {
            //this.__LIST__.toggle.classList.add("pause");
        });
        this.music.addEventListener("pause", ()=> {
            this.__LIST__.toggleIcon.innerHTML = "play_arrow";
        });
        this.music.addEventListener("play", ()=> {
            this.__LIST__.toggleIcon.innerHTML = "pause";
        });
        this.music.addEventListener("ended", ()=> {
            this.__LIST__.lyricBody.style.transform = "";
            this.__LIST__.toggleIcon.innerHTML = "play_arrow";
            if (this.options.list[this.now].loop === true) {
                    this.updateTime(0);
                    this.play();
            }else if (this.hasList()&&this.now !== this.options.list.length-1) {
                this.next();
            }
        });
        this.options.element.addEventListener("mousedown", (a)=>this.dragPercentage(a));
        this.options.element.addEventListener("mousemove", (a)=>this.dragPercentage(a));
        this.options.element.addEventListener("mouseup", (a)=>this.dragPercentage(a));

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
        if(this.music.seeking === true) return;
        /*
        this.music.play().then(()=>{
            console.log("It starts playing......")
        }).catch((e)=>{
            console.warn(e);
            console.log("Maybe The problem is that the music hasn't been loaded,you can send a Loading Request again by using `sth.load()` there.")
        });
        */
        this.music.play();
        return this;
    }

    pause() {
        if(this.music.seeking === true) return;
        this.music.pause();
        return this;
    }

    last() {
        if(this.now === 0) return;
        this.now--;
        this.toggle();
        this.play();
        return this;
    }

    next() {
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
        let list = this.options.list[now], dom = this.__LIST__;
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
        if (this.hasLyric(this.now))this.__LIST__.lyric.classList.remove("invisible");
        if (!this.__LIST__.list.classList.contains("invisible")) this.hideList();
        return this;
    }

    hideLyric() {
        this.__LIST__.lyric.classList.add("invisible");
        return this;
    }

    hasList(func) {
        if(func !== undefined) func();
        return (this.options.list.length > 1);
    }

    showList(func) {
        this.__LIST__.list.classList.remove("invisible");
        if (!this.__LIST__.lyric.classList.contains("invisible")) this.hideLyric();
        if(func !== undefined) func();
        return this;
    }

    hideList(func) {
        this.__LIST__.list.classList.add("invisible");
        if(func !== undefined) func();
        return this;
    }

    refreshList(func) {
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