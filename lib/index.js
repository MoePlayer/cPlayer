"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('./polyfill');
const listloop_1 = require("./playmode/listloop");
const events_1 = require("events");
const view_1 = require("./view");
const lyric_1 = require("./lyric");
const singlecycle_1 = require("./playmode/singlecycle");
const listrandom_1 = require("./playmode/listrandom");
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
        if (typeof audio.lyric === 'string') {
            res.lyric = lyric_1.decodeLyricStr(audio.lyric);
        }
        if (typeof audio.sublyric === 'string') {
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
        this.eventHandlers = {
            handlePlay: (...args) => {
                if (this.__paused) {
                    this.pause();
                }
            },
            handleVolumeChange: (...args) => {
                this.emit('volumechange', this.audioElement.volume);
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
                    this.play();
                }
            },
            handleEnded: (...args) => {
                if (!this.__paused) {
                    this.next();
                }
                this.emit('ended', ...args);
            },
            handlePlayListChange: (...args) => {
                this.emit('playlistchange', ...args);
            },
            handlePlaymodeChange: (mode = this.mode) => {
                this.emit('playmodechange', mode);
            }
        };
        options = Object.assign({}, defaultOption, options);
        this.audioElement = new Audio();
        this.audioElement.loop = false;
        this.audioElement.autoplay = false;
        this.initializeEventEmitter();
        this.playmode = new playmodes[options.playmode](playlistPreFilter(options.playlist), options.point);
        this.view = new view_1.default(this, options);
        this.openAudio();
        this.eventHandlers.handlePlaymodeChange();
        this.setVolume(options.volume);
        if (options.autoplay && this.playlist.length > 0) {
            this.play();
        }
    }
    set mode(playmode) {
        this.setMode(playmode);
    }
    set volume(volume) {
        this.setVolume(volume);
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
    initializeEventEmitter() {
        this.audioElement.addEventListener('volumechange', this.eventHandlers.handleVolumeChange);
        this.audioElement.addEventListener('timeupdate', this.eventHandlers.handleTimeUpdate);
        this.audioElement.addEventListener('canplaythrough', this.eventHandlers.handleCanPlayThrough);
        this.audioElement.addEventListener('pause', this.eventHandlers.handlePause);
        this.audioElement.addEventListener('play', this.eventHandlers.handlePlay);
        this.audioElement.addEventListener('ended', this.eventHandlers.handleEnded);
        this.audioElement.addEventListener('loadeddata', this.eventHandlers.handleLoadeddata);
    }
    isPlaying() {
        return this.audioElement.currentTime > 0 && !this.audioElement.paused && !this.audioElement.ended && this.audioElement.readyState > 2;
    }
    openAudio(audio = this.nowplay) {
        if (audio) {
            this.audioElement.src = this.nowplay.src;
            this.emit('openaudio', audio);
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
        if (!isPlaying && this.playlist.length > 0 || Forced) {
            this.audioElement.play();
            if (this.audioElement.paused === false || Forced) {
                this.__paused = false;
                this.emit('playstatechange', this.__paused);
                this.emit('play');
            }
        }
    }
    pause(Forced = false) {
        let isPlaying = this.isPlaying();
        if (isPlaying && this.playlist.length > 0 || Forced) {
            this.audioElement.pause();
            if (this.audioElement.paused === true) {
                this.__paused = true;
                this.emit('playstatechange', this.__paused);
                this.emit('pause');
            }
        }
    }
    to(id) {
        this.playmode.to(id);
        this.openAudio();
        this.play();
    }
    next() {
        this.playmode.next();
        this.openAudio();
        this.play();
    }
    prev() {
        this.playmode.prev();
        this.openAudio();
        this.play();
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
            if (this.__paused) {
                this.pause();
            }
            else {
                this.play();
            }
        }
    }
    setVolume(volume) {
        this.audioElement.volume = Math.max(0.0, Math.min(1.0, volume));
    }
    destroy() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener("timeupdate", this.eventHandlers.handleTimeUpdate);
        this.removeAllListeners();
        this.view.destroy();
        Object.getOwnPropertyNames(this).forEach((name) => delete this[name]);
        this.__proto__ = Object;
    }
}
exports.default = cplayer;
function parseCPlayerTag() {
    Array.prototype.forEach.call(document.querySelectorAll('template[cplayer]'), (element) => {
        element.attributes.getNamedItem('loaded') ||
            new cplayer(Object.assign({ generateBeforeElement: true, deleteElementAfterGenerate: true, element }, JSON.parse(element.innerHTML)));
    });
}
window.addEventListener("load", parseCPlayerTag);
window.cplayer = cplayer;
//# sourceMappingURL=index.js.map