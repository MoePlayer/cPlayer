import { listloopPlaymode } from './playmode/listloop';
import { IAudioItem, Iplaymode, IplaymodeConstructor } from './interfaces';
import { EventEmitter } from 'events';
import cplayerView from './view';

require('file-loader?name=example.mp3!../example/Azis - Hop.mp3');
require('file-loader?name=example1.mp3!../example/ねこぼーろ - ひねくれネジと雨.mp3');

export interface ICplayerOption {
  element?: HTMLElement,
  playlist?: IAudioItem[]
}

const defaultOption = {
  element: document.body
}

const playmodes: { [key: string]: IplaymodeConstructor } = {
  listloop: listloopPlaymode
}

export default class cplayer extends EventEmitter {
  private __paused = true;
  public view: cplayerView;
  public audioElement: HTMLAudioElement;
  private playmode: Iplaymode;
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

  constructor(options: ICplayerOption) {
    super();
    this.audioElement = new Audio();
    this.initializeEventEmitter();
    this.playmode = new playmodes.listloop(options.playlist, 0);
    this.view = new cplayerView(options.element, this);
    this.openAudio();
  }

  private initializeEventEmitter() {
    this.audioElement.addEventListener('volumechange', this.eventHandlers.handleVolumeChange);
    this.audioElement.addEventListener('timeupdate', this.eventHandlers.handleTimeUpdate);
    this.audioElement.addEventListener('canplaythrough', this.eventHandlers.handleCanPlayThrough);
    this.audioElement.addEventListener('pause', this.eventHandlers.handlePause);
    this.audioElement.addEventListener('play', this.eventHandlers.handlePlay);
    this.audioElement.addEventListener('ended', this.eventHandlers.handleEnded);
  }

  private eventHandlers: { [key: string]: (...args: any[]) => void } = {
    handlePlay: (...args) => {
      if (this.__paused) {
        this.pause();
      }
    },
    handleVolumeChange: (...args) => {
      this.emit('volumechange', ...args);
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
    }
  }

  public openAudio(audio: IAudioItem = this.nowplay) {
    if (audio) {
      this.audioElement.pause();
      this.audioElement.src = this.nowplay.src;
      this.emit('openaudio', audio);
    }
  }

  public play() {
    if (this.audioElement.paused || this.audioElement.ended) {
      this.__paused = false;
      this.audioElement.play();
      this.emit('playstatechange', this.__paused);
      this.emit('play');
    }
  }

  public pause() {
    if (this.audioElement.played) {
      this.__paused = true;
      this.audioElement.pause();
      this.emit('playstatechange', this.__paused);
      this.emit('pause');
    }
  }

  public next() {
    this.playmode.next();
    this.openAudio();
    if (this.__paused) {
      this.pause();
    } else {
      this.play();
    }
  }

  public prev() {
    this.playmode.prev();
    this.openAudio();
    if (this.__paused) {
      this.pause();
    } else {
      this.play();
    }
  }

  public targetPlayState() {
    if (this.__paused) {
      this.play();
    } else {
      this.pause();
    }
  }
}

(window as any).cplayer = cplayer;