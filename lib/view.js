"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returntypeof_1 = require("./helper/returntypeof");
const events_1 = require("events");
const parseHTML_1 = require("./helper/parseHTML");
const defaultPoster = require('../defaultposter.jpg');
const htmlTemplate = require('../cplayer.html');
const playIcon = require('../playicon.svg');
require('../scss/cplayer.scss');
function buildLyric(lyric, sublyric) {
    return lyric + (sublyric ? `<span class="cp-lyric-text-sub">${sublyric}</span>` : '');
}
const defaultOption = {
    element: document.body,
    generateBeforeElement: false,
    deleteElementAfterGenerate: false
};
class cplayerView extends events_1.EventEmitter {
    constructor(player, options) {
        super();
        this.elementLinks = returntypeof_1.default(this.getElementLinks);
        this.dropDownMenuShowInfo = true;
        this.__OldVolume = 1;
        this.__OldLyric = '';
        this.__OldTotalTime = 0;
        this.handleClickListButton = () => {
            this.toggleDropDownMenu();
        };
        this.handleClickModeButton = () => {
            this.player.toggleMode();
        };
        this.handleClickPlayList = (id, event) => {
            if (this.player.nowplay.__id !== id)
                this.player.to(id);
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
        options = Object.assign({}, defaultOption, options);
        this.player = player;
        if (options.generateBeforeElement) {
            let newFragment = parseHTML_1.default(htmlTemplate);
            options.element.parentNode.insertBefore(newFragment, options.element);
            this.rootElement = options.element.previousSibling;
        }
        else {
            options.element.appendChild(parseHTML_1.default(htmlTemplate));
            this.rootElement = options.element.lastChild;
        }
        if (options.deleteElementAfterGenerate) {
            options.element.parentElement.removeChild(options.element);
        }
        this.elementLinks = this.getElementLinks();
        this.injectEventListener();
        this.setPlayIcon(this.player.paused);
    }
    getPlayListLinks(rootElement = this.rootElement) {
        return rootElement.querySelectorAll('.cp-playlist li');
    }
    getElementLinks(rootElement = this.rootElement) {
        return {
            icon: {
                play: rootElement.getElementsByClassName('cp-play-icon')[0],
                mode: rootElement.getElementsByClassName('cp-mode-icon')[0],
            },
            button: {
                prev: rootElement.getElementsByClassName('cp-prev-button')[0],
                play: rootElement.getElementsByClassName('cp-play-button')[0],
                next: rootElement.getElementsByClassName('cp-next-button')[0],
                volume: rootElement.getElementsByClassName('cp-volume-icon')[0],
                list: rootElement.getElementsByClassName('cp-list-button')[0],
                mode: rootElement.getElementsByClassName('cp-mode-button')[0]
            },
            progress: rootElement.getElementsByClassName('cp-progress-fill')[0],
            poster: rootElement.getElementsByClassName('cp-poster')[0],
            title: rootElement.getElementsByClassName('cp-audio-title')[0],
            artist: rootElement.getElementsByClassName('cp-audio-artist')[0],
            lyric: rootElement.getElementsByClassName('cp-lyric-text')[0],
            lyricContainer: rootElement.getElementsByClassName('cp-lyric')[0],
            volumeController: rootElement.getElementsByClassName('cp-volume-controller')[0],
            volumeFill: rootElement.getElementsByClassName('cp-volume-fill')[0],
            volumeControllerButton: rootElement.getElementsByClassName('cp-volume-controller-button')[0],
            volumeControllerContainer: rootElement.getElementsByClassName('cp-volume-container')[0],
            dropDownMenu: rootElement.getElementsByClassName('cp-drop-down-menu')[0],
            playlist: rootElement.getElementsByClassName('cp-playlist')[0],
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
    toggleDropDownMenu() {
        if (this.dropDownMenuShowInfo) {
            this.elementLinks.dropDownMenu.style.height = this.player.playlist.length * 25 + 'px';
            this.elementLinks.dropDownMenu.classList.remove('cp-drop-down-menu-info');
            this.elementLinks.dropDownMenu.classList.add('cp-drop-down-menu-playlist');
            this.dropDownMenuShowInfo = false;
        }
        else {
            this.elementLinks.dropDownMenu.style.height = '';
            this.elementLinks.dropDownMenu.classList.remove('cp-drop-down-menu-playlist');
            this.elementLinks.dropDownMenu.classList.add('cp-drop-down-menu-info');
            this.dropDownMenuShowInfo = true;
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
        var lis = this.player.playlist.map((audio) => {
            var element = document.createElement('li');
            element.innerHTML = `
        ${audio.__id === this.player.nowplay.__id ? playIcon : '<span class="cp-play-icon"></span>'}
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
    }
    injectPlayListEventListener() {
        this.elementLinks.playlistItems.forEach((i, index) => {
            i.addEventListener('click', (event) => {
                this.handleClickPlayList(index, event);
            });
        });
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
        this.elementLinks.volumeController.addEventListener('touchmove', this.handleTouchVolumeController);
        this.player.addListener('playstatechange', this.handlePlayStateChange);
        this.player.addListener('timeupdate', this.handleTimeUpdate);
        this.player.addListener('openaudio', this.handleOpenAudio);
        this.player.addListener('volumechange', this.handleVolumeChange);
        this.player.addListener('playmodechange', this.handleModeChange);
        this.injectPlayListEventListener();
    }
    updateLyric(playedTime = 0) {
        if (this.player.nowplay.lyric && this.player.played) {
            let lyric = this.player.nowplay.lyric.getLyric(playedTime * 1000);
            let nextLyric = this.player.nowplay.lyric.getNextLyric(playedTime * 1000);
            if (lyric) {
                if (nextLyric) {
                    let duration = nextLyric.time - lyric.time;
                    let currentTime = playedTime * 1000 - lyric.time;
                    this.setLyric(buildLyric(lyric.word), currentTime, duration);
                }
                else {
                    let duration = this.player.audioElement.duration - lyric.time;
                    let currentTime = playedTime * 1000 - lyric.time;
                    this.setLyric(buildLyric(lyric.word), currentTime, duration);
                }
            }
            else {
                this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist || ''), playedTime * 1000, nextLyric.time);
            }
        }
        else {
            this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist || ''));
        }
    }
}
exports.default = cplayerView;
//# sourceMappingURL=view.js.map