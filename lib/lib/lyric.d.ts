export interface ILyricItem {
    time: number;
    word: string;
}
export declare class Lyric {
    raw: string;
    items: ILyricItem[];
    getLyric(time: number): ILyricItem;
    getNextLyric(time: number): ILyricItem;
    toString(): string;
    constructor(items: ILyricItem[], raw: string);
}
export declare function decodeLyricStr(lyricStr: string, options?: {}): Lyric;
export declare function decodeLyricStrItem(lyricItemStr: string): ILyricItem[];
