"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lyric {
    constructor(items, raw) {
        this.items = [];
        this.items = items;
        this.raw = raw;
    }
    getLyric(time) {
        return this.items.reduce((p, c) => {
            if (c.time < time && (!p || p.time < c.time)) {
                return c;
            }
            return p;
        }, undefined);
    }
    getNextLyric(time) {
        return this.items.reduce((p, c) => {
            if (c.time > time && (!p || p.time > c.time)) {
                return c;
            }
            return p;
        }, undefined);
    }
    toString() {
        return this.raw;
    }
}
exports.Lyric = Lyric;
function decodeLyricStr(lyricStr, options) {
    if (typeof lyricStr !== 'string')
        return lyricStr;
    let lyric = [];
    lyricStr.replace(/\n+/gi, "\n").trim().split("\n").forEach((lyricStrItem) => {
        lyric.push(...decodeLyricStrItem(lyricStrItem));
    });
    if (lyric.length == 0)
        return undefined;
    return new Lyric(lyric, lyricStr);
}
exports.decodeLyricStr = decodeLyricStr;
function decodeLyricStrItem(lyricItemStr) {
    let res = [];
    let timestr = lyricItemStr.match(/\[\d+\:[\.\d]+\]/gi);
    let word = /(?:\[\d+\:[\.\d]+\])*(.*)/gi.exec(lyricItemStr)[1].trim();
    if (timestr && word) {
        timestr.forEach((timestr) => {
            let z = /\[(\d+)\:([\.\d]+)\]/gi.exec(timestr.trim());
            let time = parseInt(z[1]) * 60 * 1000 + parseFloat(z[2]) * 1000;
            res.push({
                time,
                word
            });
        });
    }
    return res;
}
exports.decodeLyricStrItem = decodeLyricStrItem;
//# sourceMappingURL=lyric.js.map