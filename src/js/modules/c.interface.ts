export type AddEventListener = (
    type: string,
    listener: (event: Event) => void,
    options?: AddEventListenerOptions
) => void
export interface cList {
    name: string; //歌曲名
    artist: string; //艺术家
    image: string; //专辑图像
    url?: string; //音乐URL
    loop?: boolean; //是否循环
    lyric?: string; //歌词
    transLyric?: string; //歌词翻译
}
export interface cOption {
    element: HTMLElement; //cPlayer装载入该元素,效果等同于appendChild
    list?: cList[];
    autoplay?: boolean; //是否自动播放
}
export interface __LYRIC__ {
	[index: number]: {
		"content": string;
		"time": number;
	};
	now?: number;
	length: number;
}