import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';
export declare class singlecyclePlaymode implements Iplaymode {
    private __playlist;
    private audio;
    private point;
    readonly playlist: IAudioItem[];
    constructor(playlist?: Iplaylist, point?: number);
    next(): IAudioItem;
    prev(): IAudioItem;
    now(): IAudioItem;
    nowpoint(): number;
    to(point: number): void;
    addMusic(item: IAudioItem): void;
    removeMusic(item: IAudioItem): boolean;
}
