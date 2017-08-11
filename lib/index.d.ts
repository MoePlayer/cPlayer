/// <reference types="node" />
import { IAudioItem, Iplaylist } from './interfaces';
import { EventEmitter } from 'events';
import cplayerView, { ICplayerViewOption } from './view';
export interface ICplayerOption {
    playlist?: Iplaylist;
}
export default class cplayer extends EventEmitter {
    private __paused;
    view: cplayerView;
    audioElement: HTMLAudioElement;
    private playmode;
    private playmodeName;
    mode: string;
    volume: number;
    readonly playlist: IAudioItem[];
    readonly nowplay: IAudioItem;
    readonly nowplaypoint: number;
    readonly played: boolean;
    readonly paused: boolean;
    constructor(options: ICplayerOption & ICplayerViewOption);
    private initializeEventEmitter();
    private eventHandlers;
    private isPlaying();
    openAudio(audio?: IAudioItem): void;
    toggleMode(): void;
    setMode(playmode: string): void;
    getMode(): string;
    play(): void;
    pause(): void;
    to(id: number): void;
    next(): void;
    prev(): void;
    togglePlayState(): void;
    add(item: IAudioItem): void;
    remove(item: IAudioItem): void;
    setVolume(volume: number): void;
    destroy(): void;
}
