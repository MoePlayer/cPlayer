import { Lyric } from "./lyric";
export interface IAudioItem {
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
    nowpoint(): number;
    to(id: number): void;
    addMusic(item: IAudioItem): void;
    removeMusic(item: IAudioItem): boolean;
    playlist: Iplaylist;
}
export interface IplaymodeConstructor {
    new (playlist: Iplaylist, point: number): Iplaymode;
}
