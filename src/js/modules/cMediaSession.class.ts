/**
 * 同一时刻只应当有一个Player接管MediaSession
 * 用户`操纵`的最后一个Player.
 * 每次播放/暂停时触发事件,cMediaSession 代理所有 cPlayer 的 MediaSession.
 * 心茫然.jpg
 */
export class cMediaSession{
    private metadata:{
        title:string,
        artist:string,
        album:string,
        artwork:{src:string,sizes?:string,type?:string}[]
    };
    constructor(){}
    play(){}
    pause(){}
    next(){}
    previous(){
        this.refresh();
    }
    refresh(){
        (window.navigator.mediaSession as MediaSession).metadata = new MediaMetadata(this.metadata);
    }
}