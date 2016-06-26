/*
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
            "list"   : []
        };
        let __SELF__ = this;
        this.options = Object.assign({}, DEFAULTS, options);
        var list, gbc = (args)=>this.options.element.getElementsByClassName(args)[0], gbn = (args)=>this.options.element.getElementsByTagName(args)[0];
        this.now = 0;
        this.dragging = {contain: false, target: undefined};
        //现在开始填DOM
        this.options.element.innerHTML = `
		    <c-player>
        <div class="lyric">
            <lyric-body>
            </lyric-body>
        </div>
        <div class="main">
            <div class="image">
                <img class="meta-bak" src="">
            </div>
            <div class="control-bar">
                <div class="meta">
                    <span class="music-name"></span>
                    <span class="music-author"></span>
                </div>
                <div class="time">
                    <div class="time-body">
                        <div class="time-line"></div>
                        <div class="time-point"></div>
                    </div>
                </div>
                <div class="control">
                    <div class="lyric-button">
                        <a class="lyric-power"></a>
                    </div>
                    <div class="volume">
                        <div class="volume-button">
                            <a class="volume-power"></a>
                        </div>
                        <div class="volume-body">
                            <div class="volume-line"></div>
                            <div class="volume-point"></div>
                        </div>
                    </div>
                    <div class="list-button">
                        <a class="list-power"></a>
                    </div>
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
            lyric      : gbc("lyric"),
            lyricBody  : gbn("lyric-body"),
            toggle     : gbc("image"),
            img        : gbc("meta-bak"),
            name       : gbc("music-name"),
            author     : gbc("music-author"),
            time       : gbc("time"),
            timeLine   : gbc("time-line"),
            timePoint  : gbc("time-point"),
            lyricPower : gbc("lyric-power"),
            volumePower: gbc("volume-power"),
            volumeLine : gbc("volume-line"),
            volumePoint: gbc("volume-point"),
            listPower  : gbc("list-power"),
            list       : gbc("list"),
            listBody   : gbn("list-body")
        };

        this.music = new Audio;
        this.toggle();
        __SELF__.__LIST__.toggle.addEventListener("click", ()=> {
            if (__SELF__.isPaused()) {
                __SELF__.play();
            } else {
                __SELF__.pause();
            }
        });
        __SELF__.__LIST__.lyricPower.addEventListener("click", ()=> {
            if (__SELF__.hasLyric(__SELF__.now) && __SELF__.__LIST__.lyric.classList.contains("invisible")) {
                __SELF__.showLyric();
            } else if (__SELF__.hasLyric(__SELF__.now) && !__SELF__.__LIST__.lyric.classList.contains("invisible")) {
                __SELF__.hideLyric();
            }
        });
        __SELF__.__LIST__.listPower.addEventListener("click", ()=> {
            if (__SELF__.hasList() && __SELF__.__LIST__.list.classList.contains("invisible")) {
                __SELF__.showList();
            } else if (__SELF__.hasLyric() && !__SELF__.__LIST__.list.classList.contains("invisible")) {
                __SELF__.hideList();
            }
        });
        __SELF__.__LIST__.volumePower.addEventListener("click", ()=> {
            if (__SELF__.isMuted()) {
                __SELF__.music.muted = false;
            } else {
                __SELF__.volume(0);
            }
        });
        __SELF__.music.addEventListener("volumechange", ()=> {
            __SELF__.volume();
        });
        __SELF__.music.addEventListener("timeupdate", ()=> {
            __SELF__.updateTime();
            if (__SELF__.hasLyric(__SELF__.now)) {
                __SELF__.slideLyric(__SELF__.music.currentTime);
            }
        });
        __SELF__.music.addEventListener("canplaythrough", ()=> {
            //__SELF__.__LIST__.toggle.classList.add("pause");
        });
        __SELF__.music.addEventListener("pause", ()=> {
            __SELF__.__LIST__.toggle.classList.add("pause");
        });
        __SELF__.music.addEventListener("play", ()=> {
            __SELF__.__LIST__.toggle.classList.remove("pause");
        });
        __SELF__.music.addEventListener("ended", ()=> {
            this.__LIST__.lyricBody.style.transform = "";
            if (this.hasList()&&this.now !== this.options.list.length-1) {
                this.next();
            } else {
                if (this.options.list[this.now].loop === true) {
                    this.updateTime(0);
                    this.play();
                }
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
            return this.isMuted() ? 0 : this.music.volume;
        } else {
            if (vl === 0) {
                this.music.muted = true;
            } else {
                this.music.volume = vl;
            }
        }
    }

    isMuted() {
        return this.music.muted;
    }

    play() {
        if(this.music.seeking === true) return;
        this.music.play().then().catch((e)=>{console.warn(e)});
        return this.now;
    }

    pause() {
        if(this.music.seeking === true) return;
        this.music.pause();
        return this.now;
    }

    last() {
        if(this.now === 0) return;
        this.now--;
        this.toggle();
        this.play();
    }

    next() {
        if(this.now === this.options.list.length-1) return;
        this.now++;
        this.toggle();
        this.play();
    }

    to(now) {
        this.now = now;
        this.toggle();
        this.play();
    }

    toggle(now = this.now) {
        let list = this.options.list[now], dom = this.__LIST__;
        [dom.img.src, dom.name.innerHTML, dom.author.innerHTML, this.music.src] = [list.image, list.name, list.author, list.url];
        this.refreshLyric();
        if (!this.hasLyric(this.now))this.hideLyric();
        //this.play();
    }

    isPaused() {
        return this.music.paused;
    }

    hasLyric(id = 0) {
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

    hasList() {
        return (this.options.list.length > 1);
    }

    showList() {
        this.__LIST__.list.classList.remove("invisible");
        if (!this.__LIST__.lyric.classList.contains("invisible")) this.hideLyric();
        return this;
    }

    hideList() {
        this.__LIST__.list.classList.add("invisible");
        return this;
    }

    refreshList() {
        let __SELF__ = this;
        let list = this.options.list, lb = this.__LIST__.listBody;
        lb.innerHTML = ``;
        for (let i = 0; i <= list.length - 1; i++) {
            let div = document.createElement("div");
            div.innerHTML = '<span class="music-name">' + list[i].name + '</span><span class="muaic-author">' + list[i].author + '</span>';
            div = lb.appendChild(div);
            div.addEventListener("click", ()=> {
                __SELF__.to(i);
            });
        }

    }

    add(u) {
        let __SELF__ = this;
        let ln = this.options.list.push(u);
        let div = document.createElement("div");
        div.innerHTML = '<span class="music-name">' + u.name + '</span><span class="muaic-author">' + u.author + '</span>';
        div = this.__LIST__.listBody.appendChild(div);
        div.addEventListener("click", ()=> {
            __SELF__.to(ln - 1);
        });
    }

    lyric(content = undefined) {
        if (content === undefined) {
            if (this.hasLyric(this.now)) return this.options.list[this.now].lyric;
        } else {
            this.options.list[this.now].lyric = content;
            this.refreshLyric();
        }
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

    updateTime(time = undefined) {
        if (time !== undefined)this.music.currentTime = parseInt(time);
        if (this.dragging.contain === false) this.__LIST__.timeLine.style.width = (this.music.currentTime / this.music.duration) * 100 + "%";
        //if(this.isPaused()) this.play();
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
        for (var i = this.__LYRIC__.length - 1; i >= 0; i--) {
            if (this.__LYRIC__[i + 1] !== undefined && this.__LYRIC__[i].time < time && this.__LYRIC__[i + 1].time > time
                || this.__LYRIC__[i + 1] === undefined && this.__LYRIC__[i].time < time) {
                if (this.__LIST__.lyricBody.querySelector(".now") !== null && this.__LIST__.lyricBody.querySelector(".now") !== this.__LIST__.lyricBody.childNodes[i + 1])
                    this.__LIST__.lyricBody.querySelector(".now").classList.toggle("now");
                this.__LIST__.lyricBody.childNodes[i].classList.toggle("now");
                this.__LIST__.lyricBody.style.transform = "translateY(-" + parseInt(this.__LIST__.lyricBody.childNodes[i].offsetTop -this.__LIST__.lyric.offsetTop - 0.4 * this.__LIST__.lyric.clientHeight) + "px)";

            }
        }
    }
}
