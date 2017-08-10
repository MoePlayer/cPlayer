import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';
export declare class listrandomPlaymode implements Iplaymode {
    private __playlist;
    private point;
    readonly playlist: IAudioItem[];
    constructor(playlist?: Iplaylist, point?: number);
    next(): IAudioItem;
    prev(): IAudioItem;
    now(): IAudioItem;
    to(id: number): void;
    private randomPoint();
}
