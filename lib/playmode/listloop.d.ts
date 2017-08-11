import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';
export declare function baseRemoveMusic(item: IAudioItem, playlist: Iplaylist, nowpoint: number, newpoint: (point: number) => number): {
    playlist: IAudioItem[];
    nowpoint: number;
    needupdate: boolean;
};
export declare class listloopPlaymode implements Iplaymode {
    private __playlist;
    private point;
    readonly playlist: IAudioItem[];
    constructor(playlist?: Iplaylist, point?: number);
    next(): IAudioItem;
    prev(): IAudioItem;
    now(): IAudioItem;
    nowpoint(): number;
    to(point: number): void;
    addMusic(item: IAudioItem): void;
    private nextPoint();
    private prevPoint();
    removeMusic(item: IAudioItem): boolean;
}
