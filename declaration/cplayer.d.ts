import { cEmitter } from "modules/cEmitter.class";
import { cOption, cList, __LYRIC__ } from "modules/c.interface";
import { cBase } from "modules/cBase.class";
import "../scss/cplayer.scss";
declare class cPlayer extends cEmitter {
    static version: string;
    protected dragging: {
        contain: boolean;
        target: HTMLElement | undefined;
    };
    protected now: number;
    CBASE: cBase;
    protected options: cOption;
    protected transLock: boolean;
    music: HTMLAudioElement;
    protected __LIST__: {
        [propName: string]: HTMLElement;
        img: HTMLImageElement;
    };
    protected __LYRIC__: __LYRIC__;
    constructor(options: cOption);
    volume(vl?: number | void): number | undefined;
    isMuted(): boolean;
    play(): this;
    pause(): this | undefined;
    previous(): this | undefined;
    next(): this | undefined;
    to(now: number): this;
    private _toggle(now?);
    isPaused(): boolean;
    hasLyric(id?: number): boolean;
    showLyric(): this;
    hideLyric(): this;
    hasList(): boolean;
    showList(): this;
    hideList(): this;
    private _refreshList();
    add(u: cList): this;
    remove(id: number): this;
    lyric(content?: undefined): string | this | undefined;
    refreshLyric(isTrans?: boolean): void;
    updateTime(time?: number | void, func?: (time: number) => void): void;
    private _slideLyric(time);
    translate(): false | undefined;
    length: number;
}
export { cPlayer };
