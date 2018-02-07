"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('./polyfill');
const listloop_1 = require("./playmode/listloop");
const events_1 = require("events");
const lyric_1 = require("./lyric");
const singlecycle_1 = require("./playmode/singlecycle");
const listrandom_1 = require("./playmode/listrandom");
const mediaSession_1 = require("./mediaSession");
let cplayerView = undefined;
if (!process.env.cplayer_noview) {
    cplayerView = require('./view').default;
}
const defaultOption = {
    playlist: [],
    point: 0,
    volume: 1,
    playmode: 'listloop',
    autoplay: false
};
const playmodes = {
    listloop: listloop_1.listloopPlaymode,
    singlecycle: singlecycle_1.singlecyclePlaymode,
    listrandom: listrandom_1.listrandomPlaymode
};
function playlistPreFilter(playlist) {
    return playlist.map((audio, index) => {
        let res = Object.assign({}, audio);
        if (typeof audio.lyric === 'string' && audio.lyric.replace(/\n+/gi, "\n").trim()) {
            res.lyric = lyric_1.decodeLyricStr(audio.lyric);
        }
        if (typeof audio.sublyric === 'string' && audio.sublyric.replace(/\n+/gi, "\n").trim()) {
            res.sublyric = lyric_1.decodeLyricStr(audio.sublyric);
        }
        return res;
    });
}
class cplayer extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.__paused = true;
        this.playmodeName = 'listloop';
        this._volume = 0;
        this.eventHandlers = {
            handlePlay: (...args) => {
                if (this.__paused) {
                    this.pause();
                }
            },
            handlePlaying: (...args) => {
                if (this.audioElement.currentTime === 0) {
                    this.emit('started');
                }
            },
            handleTimeUpdate: (...args) => {
                let time = this.audioElement.duration;
                let playedTime = this.audioElement.currentTime;
                this.emit('timeupdate', playedTime, time);
            },
            handleCanPlayThrough: (...args) => {
                this.emit('canplaythrough', ...args);
            },
            handlePause: (...args) => {
                if (!this.__paused && !this.audioElement.ended) {
                    this.play(true).catch((e) => {
                        console.log(e);
                        this.pause();
                    });
                }
            },
            handleEnded: (...args) => {
                this.emit('ended', ...args);
                if (!this.__paused) {
                    this.next();
                }
            },
            handlePlayListChange: (...args) => {
                this.emit('playlistchange', ...args);
            },
            handlePlaymodeChange: (mode = this.mode) => {
                this.emit('playmodechange', mode);
            },
            handleLoadeddata: (...args) => {
                let time = this.audioElement.duration;
                let playedTime = this.audioElement.currentTime;
                this.emit('timeupdate', playedTime, time);
            }
        };
        options = Object.assign({}, defaultOption, options);
        this.playmode = new playmodes[options.playmode](playlistPreFilter(options.playlist), options.point);
        if (!process.env.cplayer_noview)
            this.view = new cplayerView(this, options);
        mediaSession_1.cplayerMediaSessionPlugin(this);
        // 同步调用会导致，用户的事件得不到触发
        setImmediate(() => {
            this.openAudio();
            this.setVolume(options.volume);
            if (options.autoplay && this.playlist.length > 0) {
                this.play(true).catch((e) => {
                    console.log(e);
                    this.pause();
                });
            }
        });
    }
    set mode(playmode) {
        this.setMode(playmode);
    }
    set volume(volume) {
        this.setVolume(volume);
    }
    get volume() {
        return this._volume;
    }
    get mode() {
        return this.playmodeName;
    }
    get playlist() {
        return this.playmode.playlist;
    }
    get nowplay() {
        return this.playmode && this.playmode.now();
    }
    get nowplaypoint() {
        return this.playmode && this.playmode.nowpoint();
    }
    get played() {
        return !this.__paused;
    }
    get paused() {
        return this.__paused;
    }
    get duration() {
        if (this.audioElement) {
            return this.audioElement.duration;
        }
        return 0;
    }
    get currentTime() {
        if (this.audioElement) {
            return this.audioElement.currentTime;
        }
        return 0;
    }
    initializeEventEmitter(element) {
        const a = element.addEventListener.bind(element);
        const e = this.eventHandlers;
        a('timeupdate', e.handleTimeUpdate);
        a('canplaythrough', e.handleCanPlayThrough);
        a('pause', e.handlePause);
        a('play', e.handlePlay);
        a('playing', e.handlePlaying);
        a('ended', e.handleEnded);
        a('loadeddata', e.handleLoadeddata);
    }
    removeEventEmitter(element) {
        const r = element.removeEventListener.bind(element);
        const e = this.eventHandlers;
        r('timeupdate', e.handleTimeUpdate);
        r('canplaythrough', e.handleCanPlayThrough);
        r('pause', e.handlePause);
        r('play', e.handlePlay);
        r('playing', e.handlePlaying);
        r('ended', e.handleEnded);
        r('loadeddata', e.handleLoadeddata);
    }
    setCurrentTime(currentTime) {
        if (typeof currentTime === 'string') {
            currentTime.trim();
            if (currentTime[currentTime.length - 1] === '%') {
                const percentage = parseFloat(currentTime);
                currentTime = this.duration * (percentage / 100);
            }
        }
        if (this.audioElement) {
            this.audioElement.currentTime = parseFloat(currentTime.toString());
        }
    }
    isPlaying() {
        return this.audioElement.currentTime > 0 && !this.audioElement.paused && !this.audioElement.ended && this.audioElement.readyState > 2;
    }
    openAudio(audio = this.nowplay) {
        if (audio) {
            if (audio.type === 'video') {
                if (!(this.audioElementType === 'HTMLVideoElement')) {
                    if (typeof this.audioElement !== 'undefined') {
                        this.removeEventEmitter(this.audioElement);
                        this.audioElement.src = '';
                    }
                    this.audioElement = document.createElement('video');
                    if (this.audioElement instanceof HTMLVideoElement) {
                        this.audioElementType = 'HTMLVideoElement';
                        this.audioElement.loop = false;
                        this.audioElement.autoplay = false;
                        this.audioElement.poster = audio.poster;
                        this.audioElement.setAttribute('playsinline', 'true');
                        this.audioElement.setAttribute('webkit-playsinline', 'true');
                    }
                    this.initializeEventEmitter(this.audioElement);
                    this.emit('audioelementchange', this.audioElement);
                }
            }
            else {
                if (!(this.audioElementType === 'HTMLAudioElement')) {
                    if (typeof this.audioElement !== 'undefined') {
                        this.removeEventEmitter(this.audioElement);
                        this.audioElement.src = '';
                    }
                    this.audioElement = new Audio();
                    this.audioElementType = 'HTMLAudioElement';
                    this.audioElement.loop = false;
                    this.audioElement.autoplay = false;
                    this.initializeEventEmitter(this.audioElement);
                    this.emit('audioelementchange', this.audioElement);
                }
            }
            this.setVolume(this.volume);
            this.audioElement.src = this.nowplay.src;
            this.emit('openaudio', audio);
            if (!this.__paused) {
                this.play();
            }
        }
    }
    toggleMode() {
        switch (this.playmodeName) {
            case 'listloop':
                this.setMode('singlecycle');
                break;
            case 'singlecycle':
                this.setMode('listrandom');
                break;
            case 'listrandom':
                this.setMode('listloop');
                break;
        }
    }
    setMode(playmode) {
        if (typeof playmode === 'string') {
            if (this.playmodeName !== playmode) {
                if (playmodes[playmode]) {
                    this.playmode = new playmodes[playmode](this.playlist, this.nowplaypoint);
                    this.playmodeName = playmode;
                    this.eventHandlers.handlePlaymodeChange();
                }
            }
        }
    }
    getMode() {
        return this.mode;
    }
    play(Forced = false) {
        let isPlaying = this.isPlaying();
        let res;
        if (!isPlaying && this.playlist.length > 0 || Forced) {
            res = this.audioElement.play();
        }
        if (this.__paused) {
            this.__paused = false;
            this.emit('playstatechange', this.__paused);
            this.emit('play');
        }
        return res;
    }
    pause(Forced = false) {
        let isPlaying = this.isPlaying();
        if (isPlaying && this.playlist.length > 0 || Forced) {
            this.audioElement.pause();
        }
        if (!this.__paused) {
            this.__paused = true;
            this.emit('playstatechange', this.__paused);
            this.emit('pause');
        }
    }
    to(id) {
        this.playmode.to(id);
        this.openAudio();
    }
    next() {
        this.playmode.next();
        this.openAudio();
    }
    prev() {
        this.playmode.prev();
        this.openAudio();
    }
    togglePlayState() {
        if (this.__paused) {
            this.play();
        }
        else {
            this.pause();
        }
    }
    add(item) {
        item = (playlistPreFilter([item]))[0];
        this.playmode.addMusic(item);
        this.eventHandlers.handlePlayListChange();
        if (this.playlist.length === 1) {
            this.to(0);
        }
    }
    remove(item) {
        let needUpdate = this.playmode.removeMusic(item);
        this.eventHandlers.handlePlayListChange();
        if (needUpdate) {
            this.openAudio();
        }
    }
    setVolume(volume) {
        this._volume = parseFloat(volume);
        if (this.audioElement)
            this.audioElement.volume = Math.max(0.0, Math.min(1.0, this._volume));
        this.emit('volumechange', this.audioElement.volume);
    }
    destroy() {
        if (this.audioElement) {
            this.audioElement.src = null;
            this.audioElement.removeEventListener("timeupdate", this.eventHandlers.handleTimeUpdate);
            this.removeAllListeners();
        }
        if (this.view)
            this.view.destroy();
        Object.getOwnPropertyNames(this).forEach((name) => delete this[name]);
        this.__proto__ = Object;
    }
}
exports.default = cplayer;
if (!process.env.cplayer_noview) {
    function parseCPlayerTag() {
        Array.prototype.forEach.call(document.querySelectorAll('template[cplayer]'), (element) => {
            element.attributes.getNamedItem('loaded') ||
                new cplayer(Object.assign({ generateBeforeElement: true, deleteElementAfterGenerate: true, element }, JSON.parse(element.innerHTML)));
        });
    }
    window.addEventListener("load", parseCPlayerTag);
}
window.cplayer = cplayer;
//# sourceMappingURL=index.js.map