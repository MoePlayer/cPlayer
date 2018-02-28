/**
 * 同一时刻只应当有一个Player接管MediaSession
 * 用户`操纵`的最后一个Player.
 * 每次播放/暂停时触发事件,cMediaSession 代理所有 cPlayer 的 MediaSession.
 * 心茫然.jpg
 */
export declare class cMediaSession {
    private metadata;
    constructor();
    play(): void;
    pause(): void;
    next(): void;
    previous(): void;
    refresh(): void;
}
