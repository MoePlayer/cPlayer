"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    to(id) {
        let toPoint = this.__playlist.reduce((p, c, index) => {
            if (c.__id == id) {
                return index;
            }
            return p;
        }, this.__playlist[0].__id);
        this.point = toPoint;
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
}
exports.listrandomPlaymode = listrandomPlaymode;
//# sourceMappingURL=listrandom.js.map