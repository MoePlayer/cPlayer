export interface IAudioItem {
  __id?: number; //音频在列表中的唯一索引
  name?: string; //名称
  poster?: string; //海报
  artist?: string; //艺术家
  src: string; //音频
}

export interface Iplaymode {
  next(): IAudioItem;
  prev(): IAudioItem;
  now(): IAudioItem;
  playlist: IAudioItem[];
}

export interface IplaymodeConstructor {
  new (playlist: IAudioItem[], point: number): Iplaymode;
}