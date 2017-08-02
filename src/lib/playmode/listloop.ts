import { IAudioItem, Iplaymode } from '../interfaces';

export class listloopPlaymode implements Iplaymode {
  private __playlist: IAudioItem[] = [];
  private point = 0;
  get playlist() {
    return this.__playlist;
  }
  
  constructor(playlist: IAudioItem[] = [], point: number = 0) {
    this.__playlist = playlist;
    this.point = point;
  }

  public next() {
    this.point = this.nextPoint();
    return this.playlist[this.point];
  }

  public prev() {
    this.point = this.prevPoint();
    return this.playlist[this.point];
  }

  public now() {
    return this.playlist[this.point];
  }

  private nextPoint() {
    let res = this.point + 1;
    if (res >= this.__playlist.length) {
      res = 0;
    }
    return res;
  }

  private prevPoint() {
    let res = this.point - 1;
    if (res < 0) {
      res = this.__playlist.length - 1
    }
    return res;
  }
}