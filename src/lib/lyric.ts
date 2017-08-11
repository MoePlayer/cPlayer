export interface ILyricItem {
  time: number;
  word: string;
}


export class Lyric {
  raw: string;
  items: ILyricItem[] = [];
  public getLyric(time: number) {
    return this.items.reduce((p, c) => {
      if (c.time < time && (!p || p.time < c.time)) {
        return c;
      }
      return p;
    }, undefined)
  }
  public getNextLyric(time: number) {
    return this.items.reduce((p, c) => {
      if (c.time > time && (!p || p.time > c.time)) {
        return c;
      }
      return p;
    }, undefined)
  }
  public toString() {
    return this.raw;
  }
  constructor(items: ILyricItem[] ,raw: string) {
    this.items = items;
    this.raw = raw;
  }
}

export function decodeLyricStr(lyricStr: string, options?: {}) {
  if (typeof lyricStr !== 'string') return lyricStr;
  let lyric: ILyricItem[] = [];
  lyricStr.replace(/\n+/gi, "\n").trim().split("\n").forEach((lyricStrItem) => {
    lyric.push(...decodeLyricStrItem(lyricStrItem));
  });
  return new Lyric(lyric, lyricStr);
}

export function decodeLyricStrItem(lyricItemStr: string): ILyricItem[] {
  let res: ILyricItem[] = [];
  let timestr = lyricItemStr.match(/\[\d+\:[\.\d]+\]/gi);
  let word = /(?:\[\d+\:[\.\d]+\])*(.*)/gi.exec(lyricItemStr)[1].trim()
  if (timestr && word) {
    timestr.forEach((timestr) => {
      let z = /\[(\d+)\:([\.\d]+)\]/gi.exec(timestr.trim());
      let time = parseInt(z[1]) * 60 * 1000 + parseFloat(z[2]) * 1000;
      res.push({
        time,
        word
      });
    })
  }
  return res;
}