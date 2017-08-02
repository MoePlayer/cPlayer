import { IAudioItem } from './interfaces';
import cplayer from './';
import returntypeof from './helper/returntypeof';
import { EventEmitter } from 'events';

const htmlTemplate = require('../cplayer.html');
require('../scss/cplayer.scss');

export default class cplayerView extends EventEmitter {
  private elementLinks = returntypeof(this.getElementLinks);
  private rootElement: Element;
  private player: cplayer;

  constructor(element: Element,player: cplayer) {
    super();
    element.innerHTML = htmlTemplate;
    this.player = player;
    this.rootElement = element.getElementsByTagName('c-player')[0];
    this.elementLinks = this.getElementLinks();
    this.injectEventListener();
    this.setPlayIcon(this.player.paused);
  }

  private getElementLinks(rootElement: Element = this.rootElement) {
    return {
      icon: {
        play: rootElement.getElementsByClassName('cp-play-icon')[0],
        mode: rootElement.getElementsByClassName('cp-mode-icon')[0],
      },
      button: {
        prev: rootElement.getElementsByClassName('cp-prev-button')[0],
        play: rootElement.getElementsByClassName('cp-play-button')[0],
        next: rootElement.getElementsByClassName('cp-next-button')[0],
        volume: rootElement.getElementsByClassName('cp-volume-button')[0],
        list: rootElement.getElementsByClassName('cp-list-button')[0],
        mode: rootElement.getElementsByClassName('cp-mode-button')[0]
      },
      progress: rootElement.getElementsByClassName('cp-progress-fill')[0] as HTMLElement,
      poster: rootElement.getElementsByClassName('cp-poster')[0] as HTMLElement,
      title: rootElement.getElementsByClassName('cp-audio-title')[0] as HTMLElement,
      artist: rootElement.getElementsByClassName('cp-audio-artist')[0] as HTMLElement
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

  private injectEventListener() {
    this.elementLinks.button.play.addEventListener('click', this.handleClickPlayButton);
    this.elementLinks.button.prev.addEventListener('click', this.handleClickPrevButton);
    this.elementLinks.button.next.addEventListener('click', this.handleClickNextButton);

    this.player.addListener('playstatechange', this.handlePlayStateChange)
    this.player.addListener('timeupdate', this.handleTimeUpdate)
    this.player.addListener('openaudio', this.handleOpenAudio)
  }

  private handleClickPlayButton = () => {
    this.player.targetPlayState();
  }

  private handleOpenAudio = (audio: IAudioItem) => {
    this.setPoster(audio.poster);
    this.setProgress(0);
    this.elementLinks.title.innerText = audio.name;
    this.elementLinks.artist.innerText = audio.artist;
  }

  private handleTimeUpdate = (playedTime:number, time:number) => {
    this.setProgress(playedTime / time);
  }

  private handleClickPrevButton = () => {
    this.player.prev();
  }

  private handleClickNextButton = () => {
    this.player.next();
  }

  private handlePlayStateChange = (paused:boolean) => {
    this.setPlayIcon(paused);
  }
}
