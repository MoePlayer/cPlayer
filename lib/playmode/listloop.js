"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    to(id) {
        let toPoint = this.__playlist.reduce((p, c, index) => {
            if (c.__id == id) {
                return index;
            }
            return p;
        }, this.__playlist[0].__id);
        this.point = toPoint;
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
}
exports.listloopPlaymode = listloopPlaymode;
//# sourceMappingURL=listloop.js.map