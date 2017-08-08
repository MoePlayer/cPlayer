import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';

export class listloopPlaymode implements Iplaymode {
  private __playlist: Iplaylist = [];
  private point = 0;
  get playlist() {
    return this.__playlist;
  }
  
  constructor(playlist: Iplaylist = [], point: number = 0) {
    this.__playlist = playlist;
    this.to(point);
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

  public to(id: number) {
    let toPoint = this.__playlist.reduce((p, c, index) => {
      if (c.__id == id) {
        return index;
      }
      return p;
    }, 0);
    this.point = toPoint;
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