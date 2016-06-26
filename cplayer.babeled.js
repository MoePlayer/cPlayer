/*
 cPlayer REWRITE - 2.0

     Author && user(:cry:)	Corps
     天若有情天亦老,我为长者续一秒~
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cPlayer = function () {
    function cPlayer(options) {
        var _this = this;

        _classCallCheck(this, cPlayer);

        /*
         *	參數处理,合并默认参数与定义參數
         */
        var DEFAULTS = {
            "element": document.getElementById("cplayer"),
            "list": []
        };
        var __SELF__ = this;
        this.options = Object.assign({}, DEFAULTS, options);
        var list,
            gbc = function gbc(args) {
            return _this.options.element.getElementsByClassName(args)[0];
        },
            gbn = function gbn(args) {
            return _this.options.element.getElementsByTagName(args)[0];
        };
        this.now = 0;
        this.dragging = { contain: false, target: undefined };
        //现在开始填DOM
        this.options.element.innerHTML = "\n\t\t    <c-player>\n        <div class=\"lyric\">\n            <lyric-body>\n            </lyric-body>\n        </div>\n        <div class=\"main\">\n            <div class=\"image\">\n                <img class=\"meta-bak\" src=\"\">\n            </div>\n            <div class=\"control-bar\">\n                <div class=\"meta\">\n                    <span class=\"music-name\"></span>\n                    <span class=\"music-author\"></span>\n                </div>\n                <div class=\"time\">\n                    <div class=\"time-body\">\n                        <div class=\"time-line\"></div>\n                        <div class=\"time-point\"></div>\n                    </div>\n                </div>\n                <div class=\"control\">\n                    <div class=\"lyric-button\">\n                        <a class=\"lyric-power\"></a>\n                    </div>\n                    <div class=\"volume\">\n                        <div class=\"volume-button\">\n                            <a class=\"volume-power\"></a>\n                        </div>\n                        <div class=\"volume-body\">\n                            <div class=\"volume-line\"></div>\n                            <div class=\"volume-point\"></div>\n                        </div>\n                    </div>\n                    <div class=\"list-button\">\n                        <a class=\"list-power\"></a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"list invisible\">\n            <list-body>\n            </list-body>\n        </div>\n    </c-player>";
        //然后为DOMList填充一下吧
        this.__LIST__ = {
            lyric: gbc("lyric"),
            lyricBody: gbn("lyric-body"),
            toggle: gbc("image"),
            img: gbc("meta-bak"),
            name: gbc("music-name"),
            author: gbc("music-author"),
            time: gbc("time"),
            timeLine: gbc("time-line"),
            timePoint: gbc("time-point"),
            lyricPower: gbc("lyric-power"),
            volumePower: gbc("volume-power"),
            volumeLine: gbc("volume-line"),
            volumePoint: gbc("volume-point"),
            listPower: gbc("list-power"),
            list: gbc("list"),
            listBody: gbn("list-body")
        };

        this.music = new Audio();
        this.toggle();
        __SELF__.__LIST__.toggle.addEventListener("click", function () {
            if (__SELF__.isPaused()) {
                __SELF__.play();
            } else {
                __SELF__.pause();
            }
        });
        __SELF__.__LIST__.lyricPower.addEventListener("click", function () {
            if (__SELF__.hasLyric(__SELF__.now) && __SELF__.__LIST__.lyric.classList.contains("invisible")) {
                __SELF__.showLyric();
            } else if (__SELF__.hasLyric(__SELF__.now) && !__SELF__.__LIST__.lyric.classList.contains("invisible")) {
                __SELF__.hideLyric();
            }
        });
        __SELF__.__LIST__.listPower.addEventListener("click", function () {
            if (__SELF__.hasList() && __SELF__.__LIST__.list.classList.contains("invisible")) {
                __SELF__.showList();
            } else if (__SELF__.hasLyric() && !__SELF__.__LIST__.list.classList.contains("invisible")) {
                __SELF__.hideList();
            }
        });
        __SELF__.__LIST__.volumePower.addEventListener("click", function () {
            if (__SELF__.isMuted()) {
                __SELF__.music.muted = false;
            } else {
                __SELF__.volume(0);
            }
        });
        __SELF__.music.addEventListener("volumechange", function () {
            __SELF__.volume();
        });
        __SELF__.music.addEventListener("timeupdate", function () {
            __SELF__.updateTime();
            if (__SELF__.hasLyric(__SELF__.now)) {
                __SELF__.slideLyric(__SELF__.music.currentTime);
            }
        });
        __SELF__.music.addEventListener("canplaythrough", function () {
            //__SELF__.__LIST__.toggle.classList.add("pause");
        });
        __SELF__.music.addEventListener("pause", function () {
            __SELF__.__LIST__.toggle.classList.add("pause");
        });
        __SELF__.music.addEventListener("play", function () {
            __SELF__.__LIST__.toggle.classList.remove("pause");
        });
        __SELF__.music.addEventListener("ended", function () {
            _this.__LIST__.lyricBody.style.transform = "";
            if (_this.hasList() && _this.now !== _this.options.list.length - 1) {
                _this.next();
            } else {
                if (_this.options.list[_this.now].loop === true) {
                    _this.updateTime(0);
                    _this.play();
                }
            }
        });
        this.options.element.addEventListener("mousedown", function (a) {
            return _this.dragPercentage(a);
        });
        this.options.element.addEventListener("mousemove", function (a) {
            return _this.dragPercentage(a);
        });
        this.options.element.addEventListener("mouseup", function (a) {
            return _this.dragPercentage(a);
        });

        this.volume();
        this.refreshList();
    }

    _createClass(cPlayer, [{
        key: "dragPercentage",
        value: function dragPercentage(options) {
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
                        var vol = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                        vol = vol > 1 ? 1 : vol;
                        vol = vol < 0 ? 0 : vol;
                        this.music.volume = vol;
                    } else if (this.dragging.target.parentNode.classList.contains("time-body")) {
                        var time = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                        time = time > 1 ? 1 : time;
                        time = time < 0 ? 0 : time;
                        this.music.currentTime = time * this.music.duration;
                    }
                    this.dragging.contain = false;
                    this.dragging.target = undefined;
                    break;
            }
        }
    }, {
        key: "volume",
        value: function volume() {
            var vl = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

            if (vl === undefined) {
                this.__LIST__.volumeLine.style.width = this.music.volume * 100 + "%";
                return this.isMuted() ? 0 : this.music.volume;
            } else {
                if (vl === 0) {
                    this.music.muted = true;
                } else {
                    this.music.volume = vl;
                }
            }
        }
    }, {
        key: "isMuted",
        value: function isMuted() {
            return this.music.muted;
        }
    }, {
        key: "play",
        value: function play() {
            if (this.music.seeking === true) return;
            this.music.play().then().catch(function (e) {
                console.warn(e);
            });
            return this.now;
        }
    }, {
        key: "pause",
        value: function pause() {
            if (this.music.seeking === true) return;
            this.music.pause();
            return this.now;
        }
    }, {
        key: "last",
        value: function last() {
            if (this.now === 0) return;
            this.now--;
            this.toggle();
            this.play();
        }
    }, {
        key: "next",
        value: function next() {
            if (this.now === this.options.list.length - 1) return;
            this.now++;
            this.toggle();
            this.play();
        }
    }, {
        key: "to",
        value: function to(now) {
            this.now = now;
            this.toggle();
            this.play();
        }
    }, {
        key: "toggle",
        value: function toggle() {
            var now = arguments.length <= 0 || arguments[0] === undefined ? this.now : arguments[0];

            var list = this.options.list[now],
                dom = this.__LIST__;
            var _ref = [list.image, list.name, list.author, list.url];
            dom.img.src = _ref[0];
            dom.name.innerHTML = _ref[1];
            dom.author.innerHTML = _ref[2];
            this.music.src = _ref[3];

            this.refreshLyric();
            if (!this.hasLyric(this.now)) this.hideLyric();
            //this.play();
        }
    }, {
        key: "isPaused",
        value: function isPaused() {
            return this.music.paused;
        }
    }, {
        key: "hasLyric",
        value: function hasLyric() {
            var id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            return this.options.list[id].lyric !== undefined;
        }
    }, {
        key: "showLyric",
        value: function showLyric() {
            if (this.hasLyric(this.now)) this.__LIST__.lyric.classList.remove("invisible");
            if (!this.__LIST__.list.classList.contains("invisible")) this.hideList();
            return this;
        }
    }, {
        key: "hideLyric",
        value: function hideLyric() {
            this.__LIST__.lyric.classList.add("invisible");
            return this;
        }
    }, {
        key: "hasList",
        value: function hasList() {
            return this.options.list.length > 1;
        }
    }, {
        key: "showList",
        value: function showList() {
            this.__LIST__.list.classList.remove("invisible");
            if (!this.__LIST__.lyric.classList.contains("invisible")) this.hideLyric();
            return this;
        }
    }, {
        key: "hideList",
        value: function hideList() {
            this.__LIST__.list.classList.add("invisible");
            return this;
        }
    }, {
        key: "refreshList",
        value: function refreshList() {
            var __SELF__ = this;
            var list = this.options.list,
                lb = this.__LIST__.listBody;
            lb.innerHTML = "";

            var _loop = function _loop(i) {
                var div = document.createElement("div");
                div.innerHTML = '<span class="music-name">' + list[i].name + '</span><span class="muaic-author">' + list[i].author + '</span>';
                div = lb.appendChild(div);
                div.addEventListener("click", function () {
                    __SELF__.to(i);
                });
            };

            for (var i = 0; i <= list.length - 1; i++) {
                _loop(i);
            }
        }
    }, {
        key: "add",
        value: function add(u) {
            var __SELF__ = this;
            var ln = this.options.list.push(u);
            var div = document.createElement("div");
            div.innerHTML = '<span class="music-name">' + u.name + '</span><span class="muaic-author">' + u.author + '</span>';
            div = this.__LIST__.listBody.appendChild(div);
            div.addEventListener("click", function () {
                __SELF__.to(ln - 1);
            });
        }
    }, {
        key: "lyric",
        value: function lyric() {
            var content = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

            if (content === undefined) {
                if (this.hasLyric(this.now)) return this.options.list[this.now].lyric;
            } else {
                this.options.list[this.now].lyric = content;
                this.refreshLyric();
            }
        }
    }, {
        key: "refreshLyric",
        value: function refreshLyric() {
            //REQUIRE LYRIC...
            this.__LIST__.lyricBody.innerHTML = "";
            if (!this.hasLyric(this.now)) return;
            var lr = this.options.list[this.now].lyric;
            //START LRC BASEING...
            lr = lr.split("\n");
            var lrcs = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = lr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var content = _step.value;

                    if (typeof content !== "string") break;
                    var onelrc = content.split(/\[|\]\[|\]/gi);
                    for (var _i2 = 0; _i2 < onelrc.length - 1; _i2++) {
                        if (onelrc[_i2] === "" && _i2 !== onelrc.length - 1) {
                            onelrc.splice(_i2, 1);
                            _i2--;
                            continue;
                        }

                        if (onelrc[_i2].match(/\d{1,}\:\d{1,}/gi)) {
                            var lyricsarray = onelrc[_i2].split(/\:|\./gi);
                            switch (lyricsarray.length) {
                                case 2:
                                    onelrc[_i2] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]);
                                    break;
                                case 3:
                                    onelrc[_i2] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]) + parseFloat("0." + lyricsarray[2]);
                                    break;
                                default:
                                    throw new Error("Time not be Found!");
                            }
                        }
                    }

                    lrcs.push(onelrc);
                }
                //LRC BASED
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var lyric = [];
            for (var i = lrcs.length - 1; i >= 0; i--) {
                if (lrcs[i].length > 2) {
                    for (var count = lrcs[i].length - 1; count >= 0; count--) {
                        if (count !== lrcs[i].length - 1) {
                            lyric.push({ time: lrcs[i][count], content: lrcs[i][lrcs[i].length - 1] });
                        }
                    }
                } else {
                    lyric.push({ time: lrcs[i][0], content: lrcs[i][1] });
                }
            }

            lyric.sort(function (a, b) {
                return a.time - b.time;
            });
            this.__LYRIC__ = lyric;
            for (var _i = 0; _i <= lyric.length - 1; _i++) {
                var div = document.createElement("lrc");
                div.innerHTML = lyric[_i].content;
                this.__LIST__.lyricBody.appendChild(div);
            }
        }
    }, {
        key: "updateTime",
        value: function updateTime() {
            var time = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

            if (time !== undefined) this.music.currentTime = parseInt(time);
            if (this.dragging.contain === false) this.__LIST__.timeLine.style.width = this.music.currentTime / this.music.duration * 100 + "%";
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

    }, {
        key: "slideLyric",
        value: function slideLyric(time) {
            if (this.__LIST__.lyric.classList.contains("invisible")) return;
            for (var i = this.__LYRIC__.length - 1; i >= 0; i--) {
                if (this.__LYRIC__[i + 1] !== undefined && this.__LYRIC__[i].time < time && this.__LYRIC__[i + 1].time > time || this.__LYRIC__[i + 1] === undefined && this.__LYRIC__[i].time < time) {
                    if (this.__LIST__.lyricBody.querySelector(".now") !== null && this.__LIST__.lyricBody.querySelector(".now") !== this.__LIST__.lyricBody.childNodes[i + 1]) this.__LIST__.lyricBody.querySelector(".now").classList.toggle("now");
                    this.__LIST__.lyricBody.childNodes[i].classList.toggle("now");
                    this.__LIST__.lyricBody.style.transform = "translateY(-" + parseInt(this.__LIST__.lyricBody.childNodes[i].offsetTop - this.__LIST__.lyric.offsetTop - 0.4 * this.__LIST__.lyric.clientHeight) + "px)";
                }
            }
        }
    }]);

    return cPlayer;
}();
