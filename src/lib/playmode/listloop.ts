import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';
import shallowEqual from "../helper/shallowEqual";

export function baseRemoveMusic(item: IAudioItem, playlist: Iplaylist, nowpoint: number, newpoint: (point: number) => number) {
  let targetPoint: number;
  let needupdate = false;
  playlist.forEach((a, index) => {
    if (shallowEqual(a, item)) {
      targetPoint = index;
    }
  })
  if (typeof targetPoint !== 'undefined') {
    playlist.splice(targetPoint, 1);
    if (nowpoint > targetPoint) {
      nowpoint--;
      needupdate = false;
    } else if (nowpoint === targetPoint) {
      nowpoint = newpoint(nowpoint);
      needupdate = true;
    }
  }
  return { playlist, nowpoint, needupdate };
}

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

  public nowpoint() {
    return this.point
  }

  public to(point: number) {
    this.point = point;
  }

  public addMusic(item: IAudioItem) {
    this.__playlist.push(item);
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

  public removeMusic(item: IAudioItem) {
    let { playlist, nowpoint, needupdate } = baseRemoveMusic(item, this.__playlist, this.point, (point) => Math.max(0, Math.min(point, this.__playlist.length - 1)))
    this.__playlist = playlist;
    this.point = nowpoint;
    return needupdate;
  }
}