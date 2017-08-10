import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';

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

  public to(id: number) {
    let toPoint = this.__playlist.reduce((p, c, index) => {
      if (c.__id == id) {
        return index;
      }
      return p;
    }, this.__playlist[0].__id);
    this.point = toPoint;
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
}