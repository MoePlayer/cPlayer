import { Lyric } from "./lyric";

export interface IAudioItem {
  __id?: number; //音频在列表中的唯一索引
  name: string; //名称
  poster?: string; //海报
  artist?: string; //艺术家
  src: string; //音频
  lyric?: Lyric | string; // 歌词
  sublyric?: Lyric | string; // 小歌词
}

export type Iplaylist = IAudioItem[];

export interface Iplaymode {
  next(): IAudioItem;
  prev(): IAudioItem;
  now(): IAudioItem;
  to(id: number): void;
  playlist: Iplaylist;
}

export interface IplaymodeConstructor {
  new (playlist: Iplaylist, point: number): Iplaymode;
}