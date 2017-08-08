/// <reference types="node" />
import { IAudioItem, Iplaylist } from './interfaces';
import { EventEmitter } from 'events';
import cplayerView from './view';
export interface ICplayerOption {
    element?: HTMLElement;
    playlist?: Iplaylist;
}
export default class cplayer extends EventEmitter {
    private __paused;
    view: cplayerView;
    audioElement: HTMLAudioElement;
    private playmode;
    readonly playlist: IAudioItem[];
    readonly nowplay: IAudioItem;
    readonly played: boolean;
    readonly paused: boolean;
    constructor(options: ICplayerOption);
    private initializeEventEmitter();
    private eventHandlers;
    openAudio(audio?: IAudioItem): void;
    play(): void;
    pause(): void;
    to(id: number): void;
    next(): void;
    prev(): void;
    togglePlayState(): void;
    setVolume(volume: number): void;
}
