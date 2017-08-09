import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';
export declare class singlecyclePlaymode implements Iplaymode {
    private __playlist;
    private audio;
    readonly playlist: IAudioItem[];
    constructor(playlist?: Iplaylist, point?: number);
    next(): IAudioItem;
    prev(): IAudioItem;
    now(): IAudioItem;
    to(id: number): void;
}
