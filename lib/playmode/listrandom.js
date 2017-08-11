"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listloop_1 = require("./listloop");
class listrandomPlaymode {
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
        this.point = this.randomPoint();
        return this.__playlist[this.point];
    }
    prev() {
        this.point = this.randomPoint();
        return this.__playlist[this.point];
    }
    now() {
        return this.__playlist[this.point];
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
    randomPoint() {
        if (this.__playlist.length > 1) {
            let random = Math.floor(this.__playlist.length * Math.random());
            if (random === this.point) {
                return this.randomPoint();
            }
            else {
                return random;
            }
        }
        else
            return 0;
    }
    removeMusic(item) {
        let { playlist, nowpoint, needupdate } = listloop_1.baseRemoveMusic(item, this.__playlist, this.point, (point) => this.randomPoint());
        this.__playlist = playlist;
        this.point = nowpoint;
        return needupdate;
    }
}
exports.listrandomPlaymode = listrandomPlaymode;
//# sourceMappingURL=listrandom.js.map