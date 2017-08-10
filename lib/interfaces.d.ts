import { Lyric } from "./lyric";
export interface IAudioItem {
    __id?: number;
    name: string;
    poster?: string;
    artist?: string;
    src: string;
    lyric?: Lyric | string;
    sublyric?: Lyric | string;
}
export declare type Iplaylist = IAudioItem[];
export interface Iplaymode {
    next(): IAudioItem;
    prev(): IAudioItem;
    now(): IAudioItem;
    to(id: number): void;
    addMusic(item: IAudioItem): void;
    playlist: Iplaylist;
}
export interface IplaymodeConstructor {
    new (playlist: Iplaylist, point: number): Iplaymode;
}
