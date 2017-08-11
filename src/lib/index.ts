import { listloopPlaymode } from './playmode/listloop';
import { IAudioItem, Iplaymode, IplaymodeConstructor, Iplaylist } from './interfaces';
import { EventEmitter } from 'events';
import cplayerView, { ICplayerViewOption } from './view';
import { decodeLyricStr } from "./lyric";
import { singlecyclePlaymode } from "./playmode/singlecycle";
import { listrandomPlaymode } from "./playmode/listrandom";
import shallowEqual from "./helper/shallowEqual";

export interface ICplayerOption {
  playlist?: Iplaylist;
  playmode?: string;
  volume?: number;
  point?: number;
}

const defaultOption: ICplayerOption = {
  playlist: [],
  point: 0,
  volume: 1,
  playmode: 'listloop'
}

const playmodes: { [key: string]: IplaymodeConstructor } = {
  listloop: listloopPlaymode,
  singlecycle: singlecyclePlaymode,
  listrandom: listrandomPlaymode
}

function playlistPreFilter(playlist: Iplaylist) {
  return playlist.map((audio, index) => {
    let res = {
      ...audio
    };
    if (typeof audio.lyric === 'string') {
      res.lyric = decodeLyricStr(audio.lyric)
    }
    if (typeof audio.sublyric === 'string') {
      res.sublyric = decodeLyricStr(audio.sublyric)
    }
    return res;
  })
}

export default class cplayer extends EventEmitter {
  private __paused = true;
  public view: cplayerView;
  public audioElement: HTMLAudioElement;
  private playmode: Iplaymode;
  private playmodeName: string = 'listloop';
  set mode(playmode: string) {
    this.setMode(playmode);
  }
  set volume(volume: number) {
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

  constructor(options: ICplayerOption & ICplayerViewOption) {
    super();
    options = {
      ...defaultOption,
      ...options
    }
    this.audioElement = new Audio();
    this.audioElement.loop = false;
    this.audioElement.autoplay = false;
    this.initializeEventEmitter();
    this.playmode = new playmodes[options.playmode](playlistPreFilter(options.playlist), options.point);
    this.view = new cplayerView(this, options);
    this.openAudio();
    this.eventHandlers.handlePlaymodeChange();
    this.setVolume(options.volume);
  }

  private initializeEventEmitter() {
    this.audioElement.addEventListener('volumechange', this.eventHandlers.handleVolumeChange);
    this.audioElement.addEventListener('timeupdate', this.eventHandlers.handleTimeUpdate);
    this.audioElement.addEventListener('canplaythrough', this.eventHandlers.handleCanPlayThrough);
    this.audioElement.addEventListener('pause', this.eventHandlers.handlePause);
    this.audioElement.addEventListener('play', this.eventHandlers.handlePlay);
    this.audioElement.addEventListener('ended', this.eventHandlers.handleEnded);
    this.audioElement.addEventListener('loadeddata', this.eventHandlers.handleLoadeddata)
  }

  private eventHandlers: { [key: string]: (...args: any[]) => void } = {
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
    handlePlaymodeChange: (mode: string = this.mode) => {
      this.emit('playmodechange', mode);
    }
  }

  private isPlaying() {
    return this.audioElement.currentTime > 0 && !this.audioElement.paused && !this.audioElement.ended && this.audioElement.readyState > 2;
  }

  public openAudio(audio: IAudioItem = this.nowplay) {
    if (audio) {
      this.audioElement.src = this.nowplay.src;
      this.emit('openaudio', audio);
    }
  }

  public toggleMode() {
    switch (this.playmodeName) {
      case 'listloop': this.setMode('singlecycle'); break;
      case 'singlecycle': this.setMode('listrandom'); break;
      case 'listrandom': this.setMode('listloop'); break;
    }
  }

  public setMode(playmode: string) {
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

  public getMode() {
    return this.mode;
  }

  public play() {
    let isPlaying = this.isPlaying();
    if (!isPlaying) {
      this.__paused = false;
      this.audioElement.play();
      this.emit('playstatechange', this.__paused);
      this.emit('play');
    }
  }

  public pause() {
    let isPlaying = this.audioElement.currentTime > 0 && !this.audioElement.paused && !this.audioElement.ended && this.audioElement.readyState > 2;
    if (isPlaying) {
      this.__paused = true;
      this.audioElement.pause();
      this.emit('playstatechange', this.__paused);
      this.emit('pause');
    }
  }

  public to(id: number) {
    this.playmode.to(id);
    this.openAudio();
    this.play();
  }

  public next() {
    this.playmode.next();
    this.openAudio();
    this.play();
  }

  public prev() {
    this.playmode.prev();
    this.openAudio();
    this.play();
  }

  public togglePlayState() {
    if (this.__paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  public add(item: IAudioItem) {
    item = (playlistPreFilter([item] as Iplaylist))[0];
    this.playmode.addMusic(item);
    this.eventHandlers.handlePlayListChange();
  }

  public remove(item: IAudioItem) {
    let needUpdate = this.playmode.removeMusic(item);
    this.eventHandlers.handlePlayListChange();
    if (needUpdate) {
      this.openAudio();
      if (this.__paused) {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  public setVolume(volume: number) {
    this.audioElement.volume = Math.max(0.0, Math.min(1.0, volume));
  }

  public destroy() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener("timeupdate", this.eventHandlers.handleTimeUpdate);
    this.removeAllListeners();
    this.view.destroy();
    Object.getOwnPropertyNames(this).forEach((name: keyof cplayer) => delete this[name]);
    (this as any).__proto__ = Object;
  }
}

function parseCPlayerTag() {
  Array.prototype.forEach.call(document.querySelectorAll('template[cplayer]'),(element: Element) => {
    element.attributes.getNamedItem('loaded') ||
      new cplayer({
        generateBeforeElement: true,
        deleteElementAfterGenerate: true,
        element,
        ...JSON.parse(element.innerHTML)
      })
  })
}

window.addEventListener("load", parseCPlayerTag);

(window as any).cplayer = cplayer;