import { IAudioItem, Iplaymode, Iplaylist } from '../interfaces';

export class singlecyclePlaymode implements Iplaymode {
  private __playlist: Iplaylist = [];
  private audio: IAudioItem;
  get playlist() {
    return this.__playlist;
  }
  
  constructor(playlist: Iplaylist = [], point: number = 0) {
    this.__playlist = playlist;
    this.to(point);
  }

  public next() {
    return this.audio;
  }

  public prev() {
    return this.audio;
  }

  public now() {
    return this.audio;
  }

  public to(id: number) {
    this.audio = this.__playlist.reduce((p, c, index) => {
      if (c.__id == id) {
        return c;
      }
      return p;
    });
  }
}