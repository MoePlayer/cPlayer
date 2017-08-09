"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return this.audio;
    }
    prev() {
        return this.audio;
    }
    now() {
        return this.audio;
    }
    to(id) {
        this.audio = this.__playlist.reduce((p, c, index) => {
            if (c.__id == id) {
                return c;
            }
            return p;
        });
    }
}
exports.singlecyclePlaymode = singlecyclePlaymode;
//# sourceMappingURL=singlecycle.js.map