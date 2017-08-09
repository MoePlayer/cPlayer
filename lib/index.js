"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listloop_1 = require("./playmode/listloop");
const events_1 = require("events");
const view_1 = require("./view");
const lyric_1 = require("./lyric");
const singlecycle_1 = require("./playmode/singlecycle");
const listrandom_1 = require("./playmode/listrandom");
require('file-loader?name=example2.mp3!../example/Azis - Hop.mp3');
require('file-loader?name=example1.mp3!../example/ねこぼーろ - ひねくれネジと雨.mp3');
require('file-loader?name=example.mp3!../example/96猫,伊東歌詞太郎 - チルドレンレコード - 双声道版.mp3');
const defaultOption = {
    playlist: []
};
const playmodes = {
    listloop: listloop_1.listloopPlaymode,
    singlecycle: singlecycle_1.singlecyclePlaymode,
    listrandom: listrandom_1.listrandomPlaymode
};
function playlistPreFilter(playlist) {
    return playlist.map((audio, index) => {
        let res = Object.assign({}, audio, { __id: index });
        if (typeof audio.lyric === 'string') {
            res.lyric = lyric_1.decodeLyricStr(audio.lyric);
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
                if (!this.__paused) {
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
        this.initializeEventEmitter();
        this.playmode = new playmodes.listloop(playlistPreFilter(options.playlist), 0);
        this.view = new view_1.default(this, options);
        this.openAudio();
        this.eventHandlers.handlePlaymodeChange();
    }
    set mode(playmode) {
        this.setMode(playmode);
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
    }
    openAudio(audio = this.nowplay) {
        if (audio) {
            this.audioElement.pause();
            this.audioElement.src = this.nowplay.src;
            this.emit('openaudio', audio);
        }
    }
    play() {
        if (this.audioElement.paused || this.audioElement.ended) {
            this.__paused = false;
            this.audioElement.play();
            this.emit('playstatechange', this.__paused);
            this.emit('play');
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
                    this.playmode = new playmodes[playmode](this.playlist, this.nowplay.__id);
                    this.playmodeName = playmode;
                    this.eventHandlers.handlePlaymodeChange();
                }
            }
        }
    }
    getMode() {
        return this.mode;
    }
    pause() {
        if (this.audioElement.played) {
            this.__paused = true;
            this.audioElement.pause();
            this.emit('playstatechange', this.__paused);
            this.emit('pause');
        }
    }
    to(id) {
        this.playmode.to(id);
        this.openAudio();
        if (this.__paused) {
            this.pause();
        }
        else {
            this.play();
        }
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
    setVolume(volume) {
        this.audioElement.volume = Math.max(0.0, Math.min(1.0, volume));
    }
}
exports.default = cplayer;
function parseCPlayerTag() {
    document.querySelectorAll('template[cplayer]').forEach((element) => {
        element.attributes.getNamedItem('loaded') ||
            new cplayer(Object.assign({ generateBeforeElement: true, deleteElementAfterGenerate: true, element }, JSON.parse(element.innerHTML)));
    });
}
window.addEventListener("load", parseCPlayerTag);
window.cplayer = cplayer;
//# sourceMappingURL=index.js.map