import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';
import shallowEqual from "../helper/shallowEqual";
import { baseRemoveMusic } from "./listloop";

export class singlecyclePlaymode implements Iplaymode {
  private __playlist: Iplaylist = [];
  private audio: IAudioItem;
  private point: number;
  get playlist() {
    return this.__playlist;
  }

  constructor(playlist: Iplaylist = [], point: number = 0) {
    this.__playlist = playlist;
    this.to(point);
  }

  public next() {
    return this.__playlist[this.point];
  }

  public prev() {
    return this.__playlist[this.point];
  }

  public now() {
    return this.__playlist[this.point];
  }

  public nowpoint() {
    return this.point;
  }

  public to(point: number) {
    this.point = Math.max(0, Math.min(point, this.__playlist.length - 1));
  }

  public addMusic(item: IAudioItem) {
    this.__playlist.push(item);
  }

  public removeMusic(item: IAudioItem) {
    let {playlist,nowpoint,needupdate} = baseRemoveMusic(item, this.__playlist, this.point, (point) => Math.max(0, Math.min(point, this.__playlist.length - 1)))
    this.__playlist = playlist;
    this.point = nowpoint;
    return needupdate;
  }
}