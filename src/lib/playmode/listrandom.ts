import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';
import shallowEqual from "../helper/shallowEqual";
import { baseRemoveMusic } from "./listloop";

export class listrandomPlaymode implements Iplaymode {
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
    this.point = this.randomPoint();
    return this.__playlist[this.point];
  }

  public prev() {
    this.point = this.randomPoint();
    return this.__playlist[this.point];
  }

  public now() {
    return this.__playlist[this.point];
  }

  public nowpoint() {
    return this.point;
  }

  public to(point: number) {
    this.point = point;
  }

  public addMusic(item:IAudioItem){
    this.__playlist.push(item);
  }

  private randomPoint(): number {
    if (this.__playlist.length > 1) {
      let random = Math.floor(this.__playlist.length * Math.random());
      if (random === this.point) {
        return this.randomPoint();
      } else {
        return random;
      }
    } else return 0;
  }

  public removeMusic(item: IAudioItem) {
    let {playlist,nowpoint,needupdate} = baseRemoveMusic(item, this.__playlist, this.point, (point) => this.randomPoint())
    this.__playlist = playlist;
    this.point = nowpoint;
    return needupdate;
  }
}