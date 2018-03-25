import { IAudioItem } from './interfaces';
import cplayer from './';
import returntypeof from './helper/returntypeof';
import { EventEmitter } from 'events';
import parseHTML from "./helper/parseHTML";
import { ILyricItem } from "./lyric";

const defaultPoster = require('../defaultposter.jpg')
const htmlTemplate = require('../cplayer.html');
const playIcon = require('../playicon.svg');
const style = require('!css-loader!postcss-loader!sass-loader!../scss/cplayer.scss');

function kanaFilter(str: string) {
  const starttag = '<span class="cp-lyric-text-zoomout">';
  const endtag = '</span>';
  let res = '';
  let startflag = false;
  for(let i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    let kano = /[ぁ-んァ-ン]/.test(ch);
    if (kano && !startflag) {
      res += starttag;
      startflag = true;
    }
    if (!kano && startflag) {
      res += endtag;
      startflag = false;
    }
    res += ch;
  }
  if (startflag) {
    res += endtag;
  }
  return res;
}

function buildLyric(lyric: string, sublyric?: string, zoomOutKana: boolean = false) {
  return (zoomOutKana ? kanaFilter(lyric) : lyric) + (sublyric ? `<span class="cp-lyric-text-sub">${sublyric}</span>` : '')
}

function secondNumber2TimeStr(secondTime: number) {
  const minute: string = parseInt((secondTime / 60).toString()).toString().padStart(2, '0');
  const second: string = parseInt((secondTime % 60).toString()).toString().padStart(2, '0');
  return minute + ':' + second;
}

export interface ICplayerViewOption {
  element?: Element;
  generateBeforeElement?: boolean;
  deleteElementAfterGenerate?: boolean;
  zoomOutKana?: boolean;
  showPlaylist?: boolean;
  showPlaylistButton?: boolean;
  width?: string;
  size?: string;
  style?: string;
  dark?: boolean;
  big?: boolean;
  dropDownMenuMode?: 'bottom' | 'top' | 'none' | string;
}

const defaultOption: ICplayerViewOption = {
  element: document.body,
  generateBeforeElement: false,
  deleteElementAfterGenerate: false,
  zoomOutKana: false,
  showPlaylist: false,
  showPlaylistButton: true,
  dropDownMenuMode: 'bottom',
  width: '',
  size: '12px',
  style: ''
}


function createStyleElement(style: string) {
  const styleElement = document.createElement('style');
  styleElement.id = 'cplayer-style';
  styleElement.innerHTML = style;
  return styleElement;
}

function createShadowElement(targetElement: Element, htmlTemplate: string, style: string) {
  let shadowRoot = (targetElement as any).createShadowRoot() as ShadowRoot;
  shadowRoot.innerHTML = htmlTemplate;
  shadowRoot.appendChild(createStyleElement(style));
  return shadowRoot.firstChild as HTMLElement;
}

function createBeforeElement(targetElement: Element, htmlTemplate: string, style: string) {
  let element = document.createElement('div');
  element.innerHTML = htmlTemplate;
  targetElement.parentNode.insertBefore(element, targetElement);
  if (!document.getElementById('cplayer-style')) {
    document.body.appendChild(createStyleElement(style));
  }
  return element.firstChild as HTMLElement;
}

function createBeforeShadowElement(targetElement: Element, htmlTemplate: string, style: string) {
  let element = document.createElement('div');
  let shadowRoot = (element as any).createShadowRoot() as ShadowRoot;
  shadowRoot.innerHTML = htmlTemplate;
  shadowRoot.appendChild(createStyleElement(style));
  targetElement.parentNode.insertBefore(element, targetElement);
  return shadowRoot.firstChild as HTMLElement;
}

function createElement(targetElement: Element, htmlTemplate: string, style: string) {
  targetElement.innerHTML = htmlTemplate;
  if (!document.getElementById('cplayer-style')) {
    document.body.appendChild(createStyleElement(style));
  }
  return targetElement.firstChild as HTMLElement;
}

export default class cplayerView extends EventEmitter {
  private elementLinks = returntypeof(this.getElementLinks);
  private rootElement: HTMLElement;
  private player: cplayer;
  private dropDownMenuShowInfo = true;
  private options: ICplayerViewOption;

  constructor(player: cplayer, options: ICplayerViewOption) {
    super();
    this.options = {
      ...defaultOption,
      ...options
    };
    this.player = player;
    if (this.options.generateBeforeElement) {
      if ((this.options.element as any).createShadowRoot) {
        this.rootElement = createBeforeShadowElement(this.options.element, htmlTemplate, style + this.options.style);
      } else {
        this.rootElement = createBeforeElement(this.options.element, htmlTemplate, style + this.options.style);
      }
    } else {
      if ((this.options.element as any).createShadowRoot) {
        this.rootElement = createShadowElement(this.options.element, htmlTemplate, style + this.options.style);
      } else {
        this.rootElement = createElement(this.options.element, htmlTemplate, style + this.options.style);
      }
    }
    if (options.deleteElementAfterGenerate) {
      options.element.parentElement.removeChild(options.element);
    }
    this.rootElement.style.width = this.options.width;
    this.rootElement.style.fontSize = this.options.size;
    this.elementLinks = this.getElementLinks();
    this.injectEventListener();
    this.setPlayIcon(this.player.paused);
    this.dropDownMenuShowInfo = !this.options.showPlaylist;
    if (this.dropDownMenuShowInfo) {
      this.showInfo();
    } else this.showPlaylist();
    if (!this.options.showPlaylistButton)
      this.elementLinks.button.list.style.display = 'none';
    else
      this.elementLinks.button.list.style.display = '';
    this.elementLinks.dropDownMenu.classList.add('cp-drop-down-menu-' + this.options.dropDownMenuMode)
    if (this.options.dark) {
      this.dark();
    }
    if (this.options.big) {
      this.big();
    }

    this.setPoster(this.player.nowplay.poster || defaultPoster);
    this.setProgress(this.player.currentTime / this.player.duration,
      this.player.currentTime,
      this.player.duration);
    this.elementLinks.title.innerText = this.player.nowplay.name;
    this.elementLinks.artist.innerText = this.player.nowplay.artist || '';
    this.updateLyric();
    this.updatePlaylist();
  }

  public getRootElement() {
    return this.rootElement;
  }

  public dark() {
    this.rootElement.classList.add('cp-dark');
  }

  public big() {
    this.rootElement.classList.add('cp-big');
  }

  private getPlayListLinks(rootElement: Element = this.rootElement) {
    return rootElement.querySelectorAll('.cp-playlist li');
  }

  private getElementLinks(rootElement: Element = this.rootElement) {
    let gebc: (className: string) => Element = className => rootElement.getElementsByClassName(className)[0];
    return {
      icon: {
        play: gebc('cp-play-icon') as HTMLElement,
        mode: gebc('cp-mode-icon') as HTMLElement,
      },
      button: {
        prev: gebc('cp-prev-button') as HTMLElement,
        play: gebc('cp-play-button') as HTMLElement,
        next: gebc('cp-next-button') as HTMLElement,
        volume: gebc('cp-volume-icon') as HTMLElement,
        list: gebc('cp-list-button') as HTMLElement,
        mode: gebc('cp-mode-button') as HTMLElement
      },
      progress: gebc('cp-progress') as HTMLElement,
      progressFill: gebc('cp-progress-fill') as HTMLElement,
      progressButton: gebc('cp-progress-button') as HTMLElement,
      progressDuration: gebc('cp-progress-duration') as HTMLElement,
      progressCurrentTime: gebc('cp-progress-current-time') as HTMLElement,
      poster: gebc('cp-poster') as HTMLElement,
      title: gebc('cp-audio-title') as HTMLElement,
      artist: gebc('cp-audio-artist') as HTMLElement,
      lyric: gebc('cp-lyric-text') as HTMLElement,
      lyricContainer: gebc('cp-lyric') as HTMLElement,
      volumeController: gebc('cp-volume-controller') as HTMLElement,
      volumeFill: gebc('cp-volume-fill') as HTMLElement,
      volumeControllerButton: gebc('cp-volume-controller-button') as HTMLElement,
      volumeControllerContainer: gebc('cp-volume-container') as HTMLElement,
      dropDownMenu: gebc('cp-drop-down-menu') as HTMLElement,
      playlist: gebc('cp-playlist') as HTMLElement,
      playlistItems: this.getPlayListLinks(rootElement)
    }
  }

  private setPlayIcon(paused: boolean) {
    if (paused) {
      this.elementLinks.icon.play.classList.add('cp-play-icon-paused');
    } else {
      this.elementLinks.icon.play.classList.remove('cp-play-icon-paused');
    }
  }

  private setProgress(point: number, currentTime: number, duration: number) {
    this.elementLinks.progressFill.style.width = `${point * 100}%`;
    this.elementLinks.progressButton.style.right = (1 - point) * 100 + '%';
    this.elementLinks.progressCurrentTime.innerText = secondNumber2TimeStr(currentTime);
    this.elementLinks.progressDuration.innerText = secondNumber2TimeStr(duration);
  }

  private setPoster(src: string) {
    this.elementLinks.poster.style.backgroundImage = `url("${src}")`;
  }

  private __OldVolume = 1;
  private setVolume(volume: number) {
    if (this.__OldVolume !== volume) {
      this.elementLinks.volumeFill.style.width = `${volume * 100}%`;
      this.elementLinks.volumeControllerButton.style.right = (1 - volume) * 100 + '%';
      this.__OldVolume = volume
    }
  }

  private setMode(mode: string) {
    var modeattr = document.createAttribute('data-mode');
    modeattr.value = mode;
    this.elementLinks.button.mode.attributes.setNamedItem(modeattr);
  }

  public showInfo() {
    let dropDownMenu = this.elementLinks.dropDownMenu;
    dropDownMenu.style.height = '';
    dropDownMenu.classList.remove('cp-drop-down-menu-playlist');
    dropDownMenu.classList.add('cp-drop-down-menu-info');
    this.dropDownMenuShowInfo = true;
  }

  public showPlaylist() {
    let dropDownMenu = this.elementLinks.dropDownMenu;
    dropDownMenu.style.height = this.player.playlist.length * 2.08333 + 'em';
    dropDownMenu.classList.remove('cp-drop-down-menu-info');
    dropDownMenu.classList.add('cp-drop-down-menu-playlist');
    this.dropDownMenuShowInfo = false;
  }

  public toggleDropDownMenu() {
    if (this.dropDownMenuShowInfo) {
      this.showPlaylist();
    } else {
      this.showInfo();
    }
  }

  private setVolumeControllerKeepShow() {
    this.elementLinks.volumeControllerContainer.classList.add('cp-volume-container-show');
  }

  private toggleVolumeControllerKeepShow() {
    this.elementLinks.volumeControllerContainer.classList.toggle('cp-volume-container-show');
  }

  private removeVolumeControllerKeepShow() {
    this.elementLinks.volumeControllerContainer.classList.remove('cp-volume-container-show');
  }

  private __OldLyric = '';
  private __OldTotalTime = 0;

  private setLyric(lyric: string, time: number = 0, totalTime: number = 0) {
    if (this.__OldLyric !== lyric || this.__OldTotalTime !== totalTime) {
      this.elementLinks.lyric.innerHTML = lyric;
      this.elementLinks.lyric.style.transition = '';
      this.elementLinks.lyric.style.transform = '';
      if (totalTime !== 0) {
        let lyricWidth = this.elementLinks.lyric.clientWidth;
        let lyricContainerWidth = this.elementLinks.lyricContainer.clientWidth;
        if (lyricWidth > lyricContainerWidth) {
          let duration = totalTime - time;
          let targetOffset = (lyricWidth - lyricContainerWidth);
          let timepage = lyricContainerWidth / lyricWidth * duration;
          let startTime = Math.min(timepage * 0.6, duration);
          let moveTime = duration - timepage;

          this.elementLinks.lyric.style.transition = `transform ${moveTime}ms linear ${startTime}ms`
          this.elementLinks.lyric.style.transform = `translateX(-${targetOffset}px)`;
        }
      }
      this.__OldLyric = lyric;
      this.__OldTotalTime = totalTime;
    }
  }

  private updatePlaylist() {
    var lis = this.player.playlist.map((audio, index) => {
      var element = document.createElement('li');
      element.innerHTML = `
        ${index === this.player.nowplaypoint ? playIcon : '<span class="cp-play-icon"></span>'}
        <span>${audio.name}</span><span class='cp-playlist-artist'>${audio.artist ? '<span class="cp-playlist-by"> - </span>' + audio.artist : ''}</span>
        <span class="cp-playlist-delete"> x </span>
      `
      return element;
    })
    this.elementLinks.playlist.innerHTML = '';
    lis.forEach((li) => {
      this.elementLinks.playlist.appendChild(li);
    })
    this.elementLinks.playlistItems = this.getPlayListLinks();
    this.injectPlayListEventListener();
    if (!this.dropDownMenuShowInfo) {
      this.elementLinks.dropDownMenu.style.height = this.player.playlist.length * 2.08333 + 'em';
    }
  }

  private injectPlayListEventListener() {
    Array.prototype.forEach.call(this.elementLinks.playlistItems,((i: Element, index: number) => {
      i.addEventListener('click', (event) => {
        this.handleClickPlayList(index, event);
      })
      i.getElementsByClassName('cp-playlist-delete')[0].addEventListener('click', (event) => {
        this.handleDeletePlayList(index, event);
      })
    }))
  }

  private injectEventListener() {
    this.elementLinks.button.play.addEventListener('click', this.handleClickPlayButton);
    this.elementLinks.button.prev.addEventListener('click', this.handleClickPrevButton);
    this.elementLinks.button.next.addEventListener('click', this.handleClickNextButton);
    this.elementLinks.button.volume.addEventListener('click', this.handleClickVolumeButton);
    this.elementLinks.button.list.addEventListener('click', this.handleClickListButton);
    this.elementLinks.button.mode.addEventListener('click', this.handleClickModeButton);
    this.elementLinks.volumeController.addEventListener('mousemove', this.handleMouseVolumeController)
    this.elementLinks.volumeController.addEventListener('mousedown', this.handleMouseVolumeController)
    this.elementLinks.volumeController.addEventListener('touchmove', this.handleTouchVolumeController, {passive: true} as any)

    this.elementLinks.progress.addEventListener('mousemove', this.handleMouseProgress)
    this.elementLinks.progress.addEventListener('mousedown', this.handleMouseProgress)
    this.elementLinks.progress.addEventListener('touchmove', this.handleTouchProgress, {passive: true} as any)

    this.player.addListener('playstatechange', this.handlePlayStateChange);
    this.player.addListener('timeupdate', this.handleTimeUpdate);
    this.player.addListener('openaudio', this.handleOpenAudio);
    this.player.addListener('volumechange', this.handleVolumeChange);
    this.player.addListener('playmodechange', this.handleModeChange);
    this.player.addListener('playlistchange', this.handlePlaylistchange);
    this.player.addListener('audioelementchange', this.handleAudioElementChange);
    this.injectPlayListEventListener();
  }

  private handlePlaylistchange = () => {
    this.updatePlaylist()
  }

  private updateLyric(playedTime: number = 0) {
    if (this.player.nowplay.lyric && typeof this.player.nowplay.lyric !== 'string' && this.player.played) {
      let lyric = this.player.nowplay.lyric.getLyric(playedTime * 1000);
      let nextLyric = this.player.nowplay.lyric.getNextLyric(playedTime * 1000);
      if (lyric) {
        let sublyric: ILyricItem;
        if (this.player.nowplay.sublyric && typeof this.player.nowplay.sublyric !== 'string') {
          sublyric = this.player.nowplay.sublyric.getLyric(playedTime * 1000);
        }
        if (nextLyric) {
          let duration = nextLyric.time - lyric.time;
          let currentTime = playedTime * 1000 - lyric.time;
          this.setLyric(buildLyric(lyric.word, sublyric ? sublyric.word : undefined, this.options.zoomOutKana), currentTime, duration);
        } else {
          let duration = this.player.duration - lyric.time;
          let currentTime = playedTime * 1000 - lyric.time;
          this.setLyric(buildLyric(lyric.word, sublyric ? sublyric.word : undefined, this.options.zoomOutKana), currentTime, duration);
        }
      } else {
        this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist, false), playedTime * 1000, nextLyric.time);
      }
    } else {
      this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist, false));
    }
  }

  private handleClickListButton = () => {
    this.toggleDropDownMenu();
  }

  private handleClickModeButton = () => {
    this.player.toggleMode();
  }

  private handleClickPlayList = (point: number, event: Event) => {
    if (this.player.nowplaypoint !== point){
      this.player.to(point);
      this.player.play();
    }
  }

  private handleDeletePlayList = (point: number, event: Event) => {
    this.player.remove(this.player.playlist[point]);
  }

  private handleClickPlayButton = () => {
    this.player.togglePlayState();
  }

  private handleClickVolumeButton = () => {
    this.toggleVolumeControllerKeepShow();
  }

  private handleOpenAudio = (audio: IAudioItem) => {
    if (audio.type !== 'video') {
      this.setPoster(audio.poster || defaultPoster);
    } else {
      this.setPoster('none');
    }
    this.setProgress(0,0,0);
    this.elementLinks.title.innerText = audio.name;
    this.elementLinks.artist.innerText = audio.artist || '';
    this.updateLyric();
    this.updatePlaylist();
  }

  private handleModeChange = (mode: string) => {
    this.setMode(mode);
  }

  private handleVolumeChange = (volume: number) => {
    this.setVolume(volume);
  };

  private handleTimeUpdate = (playedTime: number, time: number) => {
    this.setProgress(playedTime / time, playedTime, time);
    this.updateLyric(playedTime);
  }

  private handleClickPrevButton = () => {
    this.player.prev();
    this.player.play();
  }

  private handleClickNextButton = () => {
    this.player.next();
    this.player.play();
  }

  private handlePlayStateChange = (paused: boolean) => {
    this.setPlayIcon(paused);
  }

  private handleMouseVolumeController = (event: MouseEvent) => {
    this.removeVolumeControllerKeepShow()
    if (event.buttons === 1 || typeof event.buttons === 'undefined' && event.which === 1) {
      let volume = Math.max(0, Math.min(1.0,
        (event.clientX - this.elementLinks.volumeController.getBoundingClientRect().left) / this.elementLinks.volumeController.clientWidth
      ));
      this.player.setVolume(volume);
      this.setVolume(volume);
    }
  };

  private handleTouchVolumeController = (event: TouchEvent) => {
    this.removeVolumeControllerKeepShow()
    let volume = Math.max(0, Math.min(1.0,
      (event.targetTouches[0].clientX - this.elementLinks.volumeController.getBoundingClientRect().left) / this.elementLinks.volumeController.clientWidth
    ));
    this.player.setVolume(volume);
    this.setVolume(volume);
  };

  private handleAudioElementChange = (element: HTMLAudioElement | HTMLVideoElement) => {
    if (element instanceof HTMLVideoElement) {
      this.elementLinks.poster.appendChild(element);
    }
    else {
      this.elementLinks.poster.innerHTML = '';
    }
  }

  private handleMouseProgress = (event: MouseEvent) => {
    if (event.buttons === 1 || typeof event.buttons === 'undefined' && event.which === 1) {
      let progress = Math.max(0, Math.min(1.0,
        (event.clientX - this.elementLinks.progress.getBoundingClientRect().left) / this.elementLinks.progress.clientWidth
      ));
      this.player.setCurrentTime(progress * 100 + '%');
    }
  };

  private handleTouchProgress = (event: TouchEvent) => {
    let progress = Math.max(0, Math.min(1.0,
      (event.targetTouches[0].clientX - this.elementLinks.progress.getBoundingClientRect().left) / this.elementLinks.progress.clientWidth
    ));
    this.player.setCurrentTime(progress * 100 + '%');
  }

  public destroy() {
    this.rootElement.parentElement.removeChild(this.rootElement);
  }
}
