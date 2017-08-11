"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shallowEqual_1 = require("../helper/shallowEqual");
function baseRemoveMusic(item, playlist, nowpoint, newpoint) {
    let targetPoint;
    let needupdate = false;
    playlist.forEach((a, index) => {
        if (shallowEqual_1.default(a, item)) {
            targetPoint = index;
        }
    });
    if (typeof targetPoint !== 'undefined') {
        playlist.splice(targetPoint, 1);
        if (nowpoint > targetPoint) {
            nowpoint--;
            needupdate = false;
        }
        else if (nowpoint === targetPoint) {
            nowpoint = newpoint(nowpoint);
            needupdate = true;
        }
    }
    return { playlist, nowpoint, needupdate };
}
exports.baseRemoveMusic = baseRemoveMusic;
class listloopPlaymode {
    constructor(playlist = [], point = 0) {
        this.__playlist = [];
        this.point = 0;
        this.__playlist = playlist;
        this.to(point);
    }
    get playlist() {
        return this.__playlist;
    }
    next() {
        this.point = this.nextPoint();
        return this.playlist[this.point];
    }
    prev() {
        this.point = this.prevPoint();
        return this.playlist[this.point];
    }
    now() {
        return this.playlist[this.point];
    }
    nowpoint() {
        return this.point;
    }
    to(point) {
        this.point = Math.max(0, Math.min(point, this.__playlist.length - 1));
    }
    addMusic(item) {
        this.__playlist.push(item);
    }
    nextPoint() {
        let res = this.point + 1;
        if (res >= this.__playlist.length) {
            res = 0;
        }
        return res;
    }
    prevPoint() {
        let res = this.point - 1;
        if (res < 0) {
            res = this.__playlist.length - 1;
        }
        return res;
    }
    removeMusic(item) {
        let { playlist, nowpoint, needupdate } = baseRemoveMusic(item, this.__playlist, this.point, (point) => Math.max(0, Math.min(point, this.__playlist.length - 1)));
        this.__playlist = playlist;
        this.point = nowpoint;
        return needupdate;
    }
}
exports.listloopPlaymode = listloopPlaymode;
//# sourceMappingURL=listloop.js.map