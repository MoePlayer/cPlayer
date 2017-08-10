import { IAudioItem } from './interfaces';
import cplayer from './';
import returntypeof from './helper/returntypeof';
import { EventEmitter } from 'events';
import parseHTML from "./helper/parseHTML";
import { ILyricItem } from "./lyric";

const defaultPoster = require('../defaultposter.jpg')
const htmlTemplate = require('../cplayer.html');
const playIcon = require('../playicon.svg');
require('../scss/cplayer.scss');

function kanaFilter(str: string) {
  const starttag = '<span class="cp-lyric-text-zoomout">';
  const endtag = '</span>';
  let res = '';
  let startflag = false;
  for (let ch of str) {
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
  return (zoomOutKana ? kanaFilter(lyric) : lyric) + (sublyric?`<span class="cp-lyric-text-sub">${sublyric}</span>`:'')
}

export interface ICplayerViewOption {
  element?: Element;
  generateBeforeElement?: boolean;
  deleteElementAfterGenerate?: boolean;
  zoomOutKana?: boolean;
}

const defaultOption:ICplayerViewOption = {
  element: document.body,
  generateBeforeElement: false,
  deleteElementAfterGenerate: false,
  zoomOutKana: false
}

export default class cplayerView extends EventEmitter {
  private elementLinks = returntypeof(this.getElementLinks);
  private rootElement: Element;
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
      let newFragment = parseHTML(htmlTemplate);
      this.options.element.parentNode.insertBefore(newFragment, this.options.element);
      this.rootElement = this.options.element.previousSibling as Element;
    } else {
      this.options.element.appendChild(parseHTML(htmlTemplate));
      this.rootElement = this.options.element.lastChild as Element;
    }
    if (options.deleteElementAfterGenerate) {
      options.element.parentElement.removeChild(options.element);
    }
    this.elementLinks = this.getElementLinks();
    this.injectEventListener();
    this.setPlayIcon(this.player.paused);
  }

  private getPlayListLinks(rootElement: Element = this.rootElement) {
    return rootElement.querySelectorAll('.cp-playlist li');
  }

  private getElementLinks(rootElement: Element = this.rootElement) {
    let gebc: (className:string)=> Element = className=>rootElement.getElementsByClassName(className)[0];
    return {
      icon: {
        play: gebc('cp-play-icon'),
        mode: gebc('cp-mode-icon'),
      },
      button: {
        prev: gebc('cp-prev-button'),
        play: gebc('cp-play-button'),
        next: gebc('cp-next-button'),
        volume: gebc('cp-volume-icon'),
        list: gebc('cp-list-button'),
        mode: gebc('cp-mode-button')
      },
      progress: gebc('cp-progress-fill') as HTMLElement,
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

  private setProgress(point: number) {
    this.elementLinks.progress.style.transform = `translateX(-${100 - point * 100}%)`
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

  private toggleDropDownMenu() {
    let dropDownMenu = this.elementLinks.dropDownMenu;
    if (this.dropDownMenuShowInfo) {
      dropDownMenu.style.height = this.player.playlist.length * 25 + 'px';
      dropDownMenu.classList.remove('cp-drop-down-menu-info');
      dropDownMenu.classList.add('cp-drop-down-menu-playlist');
      this.dropDownMenuShowInfo = false;
    } else {
      dropDownMenu.style.height = '';
      dropDownMenu.classList.remove('cp-drop-down-menu-playlist');
      dropDownMenu.classList.add('cp-drop-down-menu-info');
      this.dropDownMenuShowInfo = true;
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
    var lis = this.player.playlist.map((audio) => {
      var element = document.createElement('li');
      element.innerHTML = `
        ${audio.__id === this.player.nowplay.__id ? playIcon : '<span class="cp-play-icon"></span>'}
        <span>${audio.name}</span><span class='cp-playlist-artist'>${audio.artist ? ' - ' + audio.artist : ''}</span>
      `
      return element;
    })
    this.elementLinks.playlist.innerHTML = '';
    lis.forEach((li) => {
      this.elementLinks.playlist.appendChild(li);
    })
    this.elementLinks.playlistItems = this.getPlayListLinks();
    this.injectPlayListEventListener();
  }

  private injectPlayListEventListener() {
    this.elementLinks.playlistItems.forEach((i, index) => {
      i.addEventListener('click', (event) => {
        this.handleClickPlayList(index, event);
      })
    })
  }

  private injectEventListener() {
    this.elementLinks.button.play.addEventListener('click', this.handleClickPlayButton);
    this.elementLinks.button.prev.addEventListener('click', this.handleClickPrevButton);
    this.elementLinks.button.next.addEventListener('click', this.handleClickNextButton);
    this.elementLinks.button.volume.addEventListener('click', this.handleClickVolumeButton)
    this.elementLinks.button.list.addEventListener('click', this.handleClickListButton);
    this.elementLinks.button.mode.addEventListener('click', this.handleClickModeButton);
    this.elementLinks.volumeController.addEventListener('mousemove', this.handleMouseVolumeController)
    this.elementLinks.volumeController.addEventListener('mousedown', this.handleMouseVolumeController)
    this.elementLinks.volumeController.addEventListener('touchmove', this.handleTouchVolumeController)

    this.player.addListener('playstatechange', this.handlePlayStateChange);
    this.player.addListener('timeupdate', this.handleTimeUpdate);
    this.player.addListener('openaudio', this.handleOpenAudio);
    this.player.addListener('volumechange', this.handleVolumeChange);
    this.player.addListener('playmodechange', this.handleModeChange);
    this.player.addListener('playlistchange',()=>this.updatePlaylist());
    this.injectPlayListEventListener();
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
          let duration = this.player.audioElement.duration - lyric.time;
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

  private handleClickPlayList = (id: number, event: Event) => {
    if (this.player.nowplay.__id !== id)
    this.player.to(id);
  }

  private handleClickPlayButton = () => {
    this.player.togglePlayState();
  }

  private handleClickVolumeButton = () => {
    this.toggleVolumeControllerKeepShow();
  }

  private handleOpenAudio = (audio: IAudioItem) => {
    this.setPoster(audio.poster || defaultPoster);
    this.setProgress(0);
    this.elementLinks.title.innerText = audio.name;
    this.elementLinks.artist.innerText = audio.artist || '';
    this.updateLyric();
    this.updatePlaylist();
  }

  private handleModeChange = (mode: string) => {
    this.setMode(mode);
  }

  private handleVolumeChange = (volume:number) => {
    this.setVolume(volume);
  };

  private handleTimeUpdate = (playedTime: number, time: number) => {
    this.setProgress(playedTime / time);
    this.updateLyric(playedTime);
  }

  private handleClickPrevButton = () => {
    this.player.prev();
  }

  private handleClickNextButton = () => {
    this.player.next();
  }

  private handlePlayStateChange = (paused: boolean) => {
    this.setPlayIcon(paused);
  }

  private handleMouseVolumeController = (event: MouseEvent) => {
    this.removeVolumeControllerKeepShow()
    if (event.buttons === 1) {
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
}
