"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listloop_1 = require("./listloop");
class singlecyclePlaymode {
    constructor(playlist = [], point = 0) {
        this.__playlist = [];
        this.__playlist = playlist;
        this.to(point);
    }
    get playlist() {
        return this.__playlist;
    }
    next() {
        return this.__playlist[this.point];
    }
    prev() {
        return this.__playlist[this.point];
    }
    now() {
        return this.__playlist[this.point];
    }
    nowpoint() {
        return this.point;
    }
    to(point) {
        this.point = point;
    }
    addMusic(item) {
        this.__playlist.push(item);
    }
    removeMusic(item) {
        let { playlist, nowpoint, needupdate } = listloop_1.baseRemoveMusic(item, this.__playlist, this.point, (point) => Math.max(0, Math.min(point, this.__playlist.length - 1)));
        this.__playlist = playlist;
        this.point = nowpoint;
        return needupdate;
    }
}
exports.singlecyclePlaymode = singlecyclePlaymode;
//# sourceMappingURL=singlecycle.js.map