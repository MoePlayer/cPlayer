import { Lyric } from "./lyric";

export interface IAudioItem {
  name: string; //名称
  poster?: string; //海报
  artist?: string; //艺术家
  src: string; //音频
  lyric?: Lyric | string; // 歌词
  sublyric?: Lyric | string; // 小歌词;
  album?: string; // 专辑 & 唱片
  type?: string;
}

export type Iplaylist = IAudioItem[];

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
  new(playlist: Iplaylist, point: number): Iplaymode;
}