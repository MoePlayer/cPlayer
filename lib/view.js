"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returntypeof_1 = require("./helper/returntypeof");
const events_1 = require("events");
const defaultPoster = require('../defaultposter.jpg');
const htmlTemplate = require('../cplayer.html');
const playIcon = require('../playicon.svg');
const style = require('!css-loader!postcss-loader!sass-loader!../scss/cplayer.scss');
function kanaFilter(str) {
    const starttag = '<span class="cp-lyric-text-zoomout">';
    const endtag = '</span>';
    let res = '';
    let startflag = false;
    for (let i = 0; i < str.length; i++) {
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
function buildLyric(lyric, sublyric, zoomOutKana = false) {
    return (zoomOutKana ? kanaFilter(lyric) : lyric) + (sublyric ? `<span class="cp-lyric-text-sub">${sublyric}</span>` : '');
}
const defaultOption = {
    element: document.body,
    generateBeforeElement: false,
    deleteElementAfterGenerate: false,
    zoomOutKana: false,
    showPlaylist: false,
    width: '',
    size: '12px',
    style: ''
};
function createStyleElement(style) {
    const styleElement = document.createElement('style');
    styleElement.id = 'cplayer-style';
    styleElement.innerHTML = style;
    return styleElement;
}
function createShadowElement(targetElement, htmlTemplate, style) {
    let shadowRoot = targetElement.createShadowRoot();
    shadowRoot.innerHTML = htmlTemplate;
    shadowRoot.appendChild(createStyleElement(style));
    return shadowRoot.firstChild;
}
function createBeforeElement(targetElement, htmlTemplate, style) {
    let element = document.createElement('div');
    element.innerHTML = htmlTemplate;
    targetElement.parentNode.insertBefore(element, targetElement);
    if (!document.getElementById('cplayer-style')) {
        document.body.appendChild(createStyleElement(style));
    }
    return element.firstChild;
}
function createBeforeShadowElement(targetElement, htmlTemplate, style) {
    let element = document.createElement('div');
    let shadowRoot = element.createShadowRoot();
    shadowRoot.innerHTML = htmlTemplate;
    shadowRoot.appendChild(createStyleElement(style));
    targetElement.parentNode.insertBefore(element, targetElement);
    return shadowRoot.firstChild;
}
function createElement(targetElement, htmlTemplate, style) {
    targetElement.innerHTML = htmlTemplate;
    console.log(style);
    if (!document.getElementById('cplayer-style')) {
        document.body.appendChild(createStyleElement(style));
    }
    return targetElement.firstChild;
}
class cplayerView extends events_1.EventEmitter {
    constructor(player, options) {
        super();
        this.elementLinks = returntypeof_1.default(this.getElementLinks);
        this.dropDownMenuShowInfo = true;
        this.__OldVolume = 1;
        this.__OldLyric = '';
        this.__OldTotalTime = 0;
        this.handlePlaylistchange = () => {
            this.updatePlaylist();
        };
        this.handleClickListButton = () => {
            this.toggleDropDownMenu();
        };
        this.handleClickModeButton = () => {
            this.player.toggleMode();
        };
        this.handleClickPlayList = (point, event) => {
            if (this.player.nowplaypoint !== point)
                this.player.to(point);
        };
        this.handleClickPlayButton = () => {
            this.player.togglePlayState();
        };
        this.handleClickVolumeButton = () => {
            this.toggleVolumeControllerKeepShow();
        };
        this.handleOpenAudio = (audio) => {
            this.setPoster(audio.poster || defaultPoster);
            this.setProgress(0);
            this.elementLinks.title.innerText = audio.name;
            this.elementLinks.artist.innerText = audio.artist || '';
            this.updateLyric();
            this.updatePlaylist();
        };
        this.handleModeChange = (mode) => {
            this.setMode(mode);
        };
        this.handleVolumeChange = (volume) => {
            this.setVolume(volume);
        };
        this.handleTimeUpdate = (playedTime, time) => {
            this.setProgress(playedTime / time);
            this.updateLyric(playedTime);
        };
        this.handleClickPrevButton = () => {
            this.player.prev();
        };
        this.handleClickNextButton = () => {
            this.player.next();
        };
        this.handlePlayStateChange = (paused) => {
            this.setPlayIcon(paused);
        };
        this.handleMouseVolumeController = (event) => {
            this.removeVolumeControllerKeepShow();
            if (event.buttons === 1) {
                let volume = Math.max(0, Math.min(1.0, (event.clientX - this.elementLinks.volumeController.getBoundingClientRect().left) / this.elementLinks.volumeController.clientWidth));
                this.player.setVolume(volume);
                this.setVolume(volume);
            }
        };
        this.handleTouchVolumeController = (event) => {
            this.removeVolumeControllerKeepShow();
            let volume = Math.max(0, Math.min(1.0, (event.targetTouches[0].clientX - this.elementLinks.volumeController.getBoundingClientRect().left) / this.elementLinks.volumeController.clientWidth));
            this.player.setVolume(volume);
            this.setVolume(volume);
        };
        this.options = Object.assign({}, defaultOption, options);
        this.player = player;
        if (this.options.generateBeforeElement) {
            if (this.options.element.createShadowRoot) {
                this.rootElement = createBeforeShadowElement(this.options.element, htmlTemplate, style + this.options.style);
            }
            else {
                this.rootElement = createBeforeElement(this.options.element, htmlTemplate, style + this.options.style);
            }
        }
        else {
            if (this.options.element.createShadowRoot) {
                this.rootElement = createShadowElement(this.options.element, htmlTemplate, style + this.options.style);
            }
            else {
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
        }
        else
            this.showPlaylist();
    }
    getRootElement() {
        return this.rootElement;
    }
    getPlayListLinks(rootElement = this.rootElement) {
        return rootElement.querySelectorAll('.cp-playlist li');
    }
    getElementLinks(rootElement = this.rootElement) {
        let gebc = className => rootElement.getElementsByClassName(className)[0];
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
            progress: gebc('cp-progress-fill'),
            poster: gebc('cp-poster'),
            title: gebc('cp-audio-title'),
            artist: gebc('cp-audio-artist'),
            lyric: gebc('cp-lyric-text'),
            lyricContainer: gebc('cp-lyric'),
            volumeController: gebc('cp-volume-controller'),
            volumeFill: gebc('cp-volume-fill'),
            volumeControllerButton: gebc('cp-volume-controller-button'),
            volumeControllerContainer: gebc('cp-volume-container'),
            dropDownMenu: gebc('cp-drop-down-menu'),
            playlist: gebc('cp-playlist'),
            playlistItems: this.getPlayListLinks(rootElement)
        };
    }
    setPlayIcon(paused) {
        if (paused) {
            this.elementLinks.icon.play.classList.add('cp-play-icon-paused');
        }
        else {
            this.elementLinks.icon.play.classList.remove('cp-play-icon-paused');
        }
    }
    setProgress(point) {
        this.elementLinks.progress.style.transform = `translateX(-${100 - point * 100}%)`;
    }
    setPoster(src) {
        this.elementLinks.poster.style.backgroundImage = `url("${src}")`;
    }
    setVolume(volume) {
        if (this.__OldVolume !== volume) {
            this.elementLinks.volumeFill.style.width = `${volume * 100}%`;
            this.elementLinks.volumeControllerButton.style.right = (1 - volume) * 100 + '%';
            this.__OldVolume = volume;
        }
    }
    setMode(mode) {
        var modeattr = document.createAttribute('data-mode');
        modeattr.value = mode;
        this.elementLinks.button.mode.attributes.setNamedItem(modeattr);
    }
    showInfo() {
        let dropDownMenu = this.elementLinks.dropDownMenu;
        dropDownMenu.style.height = '';
        dropDownMenu.classList.remove('cp-drop-down-menu-playlist');
        dropDownMenu.classList.add('cp-drop-down-menu-info');
        this.dropDownMenuShowInfo = true;
    }
    showPlaylist() {
        let dropDownMenu = this.elementLinks.dropDownMenu;
        dropDownMenu.style.height = this.player.playlist.length * 25 + 'px';
        dropDownMenu.classList.remove('cp-drop-down-menu-info');
        dropDownMenu.classList.add('cp-drop-down-menu-playlist');
        this.dropDownMenuShowInfo = false;
    }
    toggleDropDownMenu() {
        if (this.dropDownMenuShowInfo) {
            this.showPlaylist();
        }
        else {
            this.showInfo();
        }
    }
    setVolumeControllerKeepShow() {
        this.elementLinks.volumeControllerContainer.classList.add('cp-volume-container-show');
    }
    toggleVolumeControllerKeepShow() {
        this.elementLinks.volumeControllerContainer.classList.toggle('cp-volume-container-show');
    }
    removeVolumeControllerKeepShow() {
        this.elementLinks.volumeControllerContainer.classList.remove('cp-volume-container-show');
    }
    setLyric(lyric, time = 0, totalTime = 0) {
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
                    this.elementLinks.lyric.style.transition = `transform ${moveTime}ms linear ${startTime}ms`;
                    this.elementLinks.lyric.style.transform = `translateX(-${targetOffset}px)`;
                }
            }
            this.__OldLyric = lyric;
            this.__OldTotalTime = totalTime;
        }
    }
    updatePlaylist() {
        var lis = this.player.playlist.map((audio, index) => {
            var element = document.createElement('li');
            element.innerHTML = `
        ${index === this.player.nowplaypoint ? playIcon : '<span class="cp-play-icon"></span>'}
        <span>${audio.name}</span><span class='cp-playlist-artist'>${audio.artist ? ' - ' + audio.artist : ''}</span>
      `;
            return element;
        });
        this.elementLinks.playlist.innerHTML = '';
        lis.forEach((li) => {
            this.elementLinks.playlist.appendChild(li);
        });
        this.elementLinks.playlistItems = this.getPlayListLinks();
        this.injectPlayListEventListener();
        if (!this.dropDownMenuShowInfo) {
            this.elementLinks.dropDownMenu.style.height = this.player.playlist.length * 25 + 'px';
        }
    }
    injectPlayListEventListener() {
        Array.prototype.forEach.call(this.elementLinks.playlistItems, ((i, index) => {
            i.addEventListener('click', (event) => {
                this.handleClickPlayList(index, event);
            });
        }));
    }
    injectEventListener() {
        this.elementLinks.button.play.addEventListener('click', this.handleClickPlayButton);
        this.elementLinks.button.prev.addEventListener('click', this.handleClickPrevButton);
        this.elementLinks.button.next.addEventListener('click', this.handleClickNextButton);
        this.elementLinks.button.volume.addEventListener('click', this.handleClickVolumeButton);
        this.elementLinks.button.list.addEventListener('click', this.handleClickListButton);
        this.elementLinks.button.mode.addEventListener('click', this.handleClickModeButton);
        this.elementLinks.volumeController.addEventListener('mousemove', this.handleMouseVolumeController);
        this.elementLinks.volumeController.addEventListener('mousedown', this.handleMouseVolumeController);
        this.elementLinks.volumeController.addEventListener('touchmove', this.handleTouchVolumeController, { passive: true });
        this.player.addListener('playstatechange', this.handlePlayStateChange);
        this.player.addListener('timeupdate', this.handleTimeUpdate);
        this.player.addListener('openaudio', this.handleOpenAudio);
        this.player.addListener('volumechange', this.handleVolumeChange);
        this.player.addListener('playmodechange', this.handleModeChange);
        this.player.addListener('playlistchange', this.handlePlaylistchange);
        this.injectPlayListEventListener();
    }
    updateLyric(playedTime = 0) {
        if (this.player.nowplay.lyric && typeof this.player.nowplay.lyric !== 'string' && this.player.played) {
            let lyric = this.player.nowplay.lyric.getLyric(playedTime * 1000);
            let nextLyric = this.player.nowplay.lyric.getNextLyric(playedTime * 1000);
            if (lyric) {
                let sublyric;
                if (this.player.nowplay.sublyric && typeof this.player.nowplay.sublyric !== 'string') {
                    sublyric = this.player.nowplay.sublyric.getLyric(playedTime * 1000);
                }
                if (nextLyric) {
                    let duration = nextLyric.time - lyric.time;
                    let currentTime = playedTime * 1000 - lyric.time;
                    this.setLyric(buildLyric(lyric.word, sublyric ? sublyric.word : undefined, this.options.zoomOutKana), currentTime, duration);
                }
                else {
                    let duration = this.player.audioElement.duration - lyric.time;
                    let currentTime = playedTime * 1000 - lyric.time;
                    this.setLyric(buildLyric(lyric.word, sublyric ? sublyric.word : undefined, this.options.zoomOutKana), currentTime, duration);
                }
            }
            else {
                this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist, false), playedTime * 1000, nextLyric.time);
            }
        }
        else {
            this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist, false));
        }
    }
    destroy() {
        this.rootElement.parentElement.removeChild(this.rootElement);
    }
}
exports.default = cplayerView;
//# sourceMappingURL=view.js.map