/// <reference types="node" />
import { IAudioItem, Iplaylist } from './interfaces';
import { EventEmitter } from 'events';
import View, { ICplayerViewOption } from './view';
export interface ICplayerOption {
    playlist?: Iplaylist;
    playmode?: string;
    volume?: number;
    point?: number;
    autoplay?: boolean;
}
export default class cplayer extends EventEmitter {
    private __paused;
    view: View;
    audioElement: HTMLAudioElement | HTMLVideoElement;
    private playmode;
    private playmodeName;
    private audioElementType;
    private _volume;
    mode: string;
    volume: number;
    readonly playlist: IAudioItem[];
    readonly nowplay: IAudioItem;
    readonly nowplaypoint: number;
    readonly played: boolean;
    readonly paused: boolean;
    readonly duration: number;
    readonly currentTime: number;
    constructor(options: ICplayerOption & ICplayerViewOption);
    private initializeEventEmitter(element);
    private removeEventEmitter(element);
    private eventHandlers;
    setCurrentTime(currentTime: number | string): void;
    private isPlaying();
    openAudio(audio?: IAudioItem): void;
    toggleMode(): void;
    setMode(playmode: string): void;
    getMode(): string;
    play(Forced?: boolean): Promise<void>;
    pause(Forced?: boolean): void;
    to(id: number): void;
    next(): void;
    prev(): void;
    togglePlayState(): void;
    add(item: IAudioItem): void;
    remove(item: IAudioItem): void;
    setVolume(volume: number | string): void;
    destroy(): void;
}
