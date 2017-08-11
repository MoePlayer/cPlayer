/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var shallowEqual_1 = __webpack_require__(5);
function baseRemoveMusic(item, playlist, nowpoint, newpoint) {
    var targetPoint = void 0;
    var needupdate = false;
    playlist.forEach(function (a, index) {
        if (shallowEqual_1.default(a, item)) {
            targetPoint = index;
        }
    });
    if (typeof targetPoint !== 'undefined') {
        playlist.splice(targetPoint, 1);
        if (nowpoint > targetPoint) {
            nowpoint--;
            needupdate = false;
        } else if (nowpoint === targetPoint) {
            nowpoint = newpoint(nowpoint);
            needupdate = true;
        }
    }
    return { playlist: playlist, nowpoint: nowpoint, needupdate: needupdate };
}
exports.baseRemoveMusic = baseRemoveMusic;

var listloopPlaymode = function () {
    function listloopPlaymode() {
        var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, listloopPlaymode);

        this.__playlist = [];
        this.point = 0;
        this.__playlist = playlist;
        this.to(point);
    }

    _createClass(listloopPlaymode, [{
        key: "next",
        value: function next() {
            this.point = this.nextPoint();
            return this.playlist[this.point];
        }
    }, {
        key: "prev",
        value: function prev() {
            this.point = this.prevPoint();
            return this.playlist[this.point];
        }
    }, {
        key: "now",
        value: function now() {
            return this.playlist[this.point];
        }
    }, {
        key: "nowpoint",
        value: function nowpoint() {
            return this.point;
        }
    }, {
        key: "to",
        value: function to(point) {
            this.point = Math.max(0, Math.min(point, this.__playlist.length - 1));
        }
    }, {
        key: "addMusic",
        value: function addMusic(item) {
            this.__playlist.push(item);
        }
    }, {
        key: "nextPoint",
        value: function nextPoint() {
            var res = this.point + 1;
            if (res >= this.__playlist.length) {
                res = 0;
            }
            return res;
        }
    }, {
        key: "prevPoint",
        value: function prevPoint() {
            var res = this.point - 1;
            if (res < 0) {
                res = this.__playlist.length - 1;
            }
            return res;
        }
    }, {
        key: "removeMusic",
        value: function removeMusic(item) {
            var _this = this;

            var _baseRemoveMusic = baseRemoveMusic(item, this.__playlist, this.point, function (point) {
                return Math.max(0, Math.min(point, _this.__playlist.length - 1));
            }),
                playlist = _baseRemoveMusic.playlist,
                nowpoint = _baseRemoveMusic.nowpoint,
                needupdate = _baseRemoveMusic.needupdate;

            this.__playlist = playlist;
            this.point = nowpoint;
            return needupdate;
        }
    }, {
        key: "playlist",
        get: function get() {
            return this.__playlist;
        }
    }]);

    return listloopPlaymode;
}();

exports.listloopPlaymode = listloopPlaymode;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = __webpack_require__(4);
window.addEventListener("load", function () {
    function trigger(times, callback) {
        if (times < 1) return callback();
        return function () {
            times--;
            if (times < 1) return callback();
        };
    }
    lib_1.default.prototype.add163 = function add163(id) {
        var _this = this;

        if (!id) throw new Error("Unable Property.");
        var obj = { name: null, artist: null, image: null, url: null, lyric: null };
        var push = trigger(3, function () {
            return _this.add(obj);
        });
        obj["src"] = "https://api.imjad.cn/cloudmusic/?type=song&id=" + id + "&br=320000&raw=true";
        push();
        fetch("https://api.imjad.cn/cloudmusic/?type=detail&id=" + id).then(function (a) {
            return a.json();
        }).then(function (result) {
            result = result["songs"][0];
            var _ref = [result["name"], result["ar"].length > 1 ? function () {
                for (var i = result["ar"].length - 1; i >= 1; i--) {
                    result["ar"][0]["name"] += "/ " + result["ar"][i]["name"];
                }return result["ar"][0]["name"];
            }() : result["ar"][0]["name"], result["al"]["picUrl"]];
            obj["name"] = _ref[0];
            obj["artist"] = _ref[1];
            obj["poster"] = _ref[2];
            push();
        }).then();
        fetch("https://api.imjad.cn/cloudmusic/?type=lyric&id=" + id).then(function (a) {
            return a.json();
        }).then(function (result) {
            if (result["uncollected"] === true || result["nolyric"]) {
                obj["lyric"] = undefined;
            } else {
                obj["lyric"] = result["lrc"]["lyric"];
                if (result["tlyric"] !== undefined && result["tlyric"]["lyric"] !== undefined) obj["sublyric"] = result["tlyric"]["lyric"];
            }
            ;
            push();
        });
    };
    var playlist = [{
        src: __webpack_require__(20),
        poster: __webpack_require__(21),
        name: 'チルドレンレコード',
        artist: '96猫,伊東歌詞太郎',
        lyric: '[00:28.12]白いイヤホンを耳にあて\n[00:30.51]少しニヤッとして合図する\n[00:32.74]染み込んだこの温度が\n[00:35.07]ドアをノックした瞬間に\n[00:37.47]溢れそうになるよ\n[00:38.97]「まだ視えない？」\n[00:39.81]目を凝らして臨む争奪戦\n[00:41.96]あの日躊躇した脳裏から\n[00:44.07]「今だ、取り戻せ」と\n[00:45.66]コードが鳴り出しそう\n[00:48.61]愛しくて、辛くて\n[00:51.39]世界を嫌ったヒトの\n[00:57.71]酷く理不尽な 「構成」\n[01:00.46]肯定していちゃ未来は生み出せない\n[01:04.98]少年少女前を向く\n[01:07.26]暮れる炎天さえ希望論だって\n[01:09.70]「ツレモドセ」\n[01:10.69]「ツレモドセ」\n[01:12.00]三日月が赤く燃え上がる\n[01:14.04]さぁさぁ、コードを0で刻め\n[01:16.54]想像力の外側の世界へ\n[01:18.86]オーバーな空想戦線へ\n[01:29.87]「お先にどうぞ」って舌を出す\n[01:32.28]余裕ぶった無邪気な目\n[01:34.50]「ほら出番だ」パスワードで\n[01:36.79]目を覚ましたじゃじゃ馬は止まらない\n[01:39.25]もう夜が深くなる\n[01:41.21]「オコサマ」なら燃える延長戦\n[01:43.64]逆境ぐあいがクールだろ\n[01:45.80]寝れないねまだまだ\n[01:47.30]ほら早く！早く\n[01:48.66]イン?テンポで視線を合わせて\n[01:50.81]ハイタッチでビートが鳴り出せば\n[01:52.95]考えてちゃ遅いでしょう\n[01:55.05]ほらノっかってこうぜ\n[01:56.93]ワンコードで視線を合わせて\n[01:59.78]ぶっ飛んだグルーヴが渦巻けば\n[02:02.05]冗談じゃない見えるはず\n[02:04.02]そのハイエンドの風景の隙間に\n[02:06.75]さぁどうだい\n[02:07.76]この暑さも\n[02:08.73]すれ違いそうだった価値観も\n[02:10.93]「悪くないかな」\n[02:12.08]目を開き 手を取り合ったら\n[02:15.84]案外チープな言葉も\n[02:17.69]「合い言葉だ」って言い合える\n[02:19.97]少しだけ前を向ける\n[02:24.75]少年少女、前を向く\n[02:26.91]揺れる炎天すら希望論だって\n[02:29.26]思い出し、口に出す\n[02:31.52]不可思議な出会いと別れを\n[02:34.03]「ねぇねぇ、突飛な世界のこと\n[02:36.13]散々だって笑い飛ばせたんだ」\n[02:38.49]合図が終わる\n[02:40.71]少年少女前を向け\n[02:43.06]眩む炎天すら希望論だって\n[02:45.44]「ツカミトレ」\n[02:46.50]「ツカミトレ」と\n[02:47.71]太陽が赤く燃え上がる\n[02:49.77]さぁさぁ、コールだ。\n[02:51.34]最後にしよう\n[02:52.49]最善策はその目を見開いた\n[02:54.75]オーバーな妄想戦線\n[02:56.71]感情性のメビウスの先へ\n',
        sublyric: '[00:28.12]戴上白色耳机\n[00:30.51]稍微扬起嘴角做出信号\n[00:32.74]渗入体内的这个温度\n[00:35.07]在敲门的那一瞬间\n[00:37.47]也要满溢出来了\n[00:38.97] 「还看不见吗？」\n[00:39.81]凝视面对这场争夺战\n[00:41.96]那天在犹豫的脑袋中\n[00:44.07]「就是现在，拿回来吧」\n[00:45.66]似乎响起了这样的信号\n[00:48.61]深爱著，煎熬著\n[00:51.39]讨厌著世界的人的\n[00:57.71]残酷无道理的「构成」\n[01:00.46]如果承认了就没有未来可言\n[01:04.98]少年少女前进吧\n[01:07.26]连垂暮的炽热烈日都成了希望论\n[01:09.70]「带回来吧」\n[01:10.69]「带回来吧」\n[01:12.00]赤红新月高高燃起\n[01:14.04]来吧来吧，刻上0的记号\n[01:16.54]前往超乎想像的世界\n[01:18.86] 前往超载的空想战线\n[01:29.87]「你先吧」吐出舌头\n[01:32.28]表示还有馀裕的天真眼神\n[01:34.50]「好了登场吧」的密码\n[01:36.79]醒来的悍马停不下来\n[01:39.25]夜已深\n[01:41.21] 「小孩」进行斗志高昂延长赛\n[01:43.64]身陷逆境听起来很酷吧？\n[01:45.80]还睡不著呢 \n[01:47.30]好了快一点！快一点！\n[01:48.66]抓准节拍(in tempo)对上视线\n[01:50.81]击掌打出响亮节奏(beat)\n[01:52.95]思考的话不就太慢了吗？\n[01:55.05]好了敲响门铃吧\n[01:56.93]一个信号(one code)对上视线\n[01:59.78]飞跃的轨迹(groove)也卷起漩涡\n[02:02.05]别开玩笑了应该看得到吧\n[02:04.02]从那高级奢侈(high end)的风景缝隙间\n[02:06.75]觉得怎么样呢？\n[02:07.76]份燥热也 \n[02:08.73]貌似碰巧的价值观也\n[02:10.93]「不算太糟呐」 \n[02:12.08]睁开眼睛，相互握手之後\n[02:15.84]廉价的话语也意外能\n[02:17.69]「是暗语喔」的互相说着\n[02:19.97]能稍微地向前行\n[02:24.75]少年少女前进吧\n[02:26.91]连晃动的炽热夏日都成了希望论\n[02:29.26]回想起来，缓缓道出\n[02:31.52]那不可思议的相遇与离别\n[02:34.03]「呐呐，那飞跃的世界的事情\n[02:36.13] 虽然悲惨但就笑一笑让它过去吧」\n[02:38.49]信号终止\n[02:40.71]少年少女前进吧 \n[02:43.06]连眩目的炽热夏日都成了希望论\n[02:45.44] 「紧抓住吧」\n[02:46.50]「紧抓住吧」\n[02:47.71]赤红烈日高高燃起\n[02:49.77]来吧来吧，在呼唤我们了\n[02:51.34]努力到最後吧\n[02:52.49]上上策张开了那个眼睛\n[02:54.75]超载的妄想战线\n[02:56.71]朝向感性的梅比斯环的前方'
    }, {
        src: __webpack_require__(22),
        poster: __webpack_require__(23),
        name: 'ひねくれネジと雨',
        artist: 'ねこぼーろ',
        lyric: '[by:吃土少女Z]\n[00:00.00] 作曲 : ねこぼーろ\n[00:01.00] 作词 : ねこぼーろ\n[00:35.07]「ねえ 鼓膜 溶ける感覚\n[00:39.73]指の 先で 光る体温\n[00:45.13]僕は 未だ わからないよ」\n[00:50.50]\n[00:51.00]時が経てば 忘れてしまう\n[00:55.50]いつかの君も 色褪せてしまう\n[01:00.96]でも僕は 未だ、「忘れないよ」\n[01:06.78]\n[01:07.44]まわる まわる 世界は\n[01:09.71]僕の事など無視をして\n[01:12.78]何も知らずに そっと\n[01:15.10]僕の心 錆び付かせる\n[01:18.16]もう君を守るなんて言えないな\n[01:22.94]\n[01:23.44]こわれ こわれる 僕は\n[01:25.92]誰も 信じられなくなる\n[01:28.96]「誰も知らずに そっと\n[01:31.30]雨に溶けて 無くなる」とか\n[01:34.33]ああそんなふざけた事 言えないな ああ\n[01:41.10]\n[01:45.19]ああ 鼓膜 突き破る赤\n[01:49.52]頭の裏で 溶けてなくなる\n[01:54.90]そう僕はまだ 聴こえ「ないよ」\n[02:00.99]\n[02:01.35]まわる まわる 世界は\n[02:03.65]僕の事など無視をして\n[02:06.73]何も知らずに そっと\n[02:09.06]僕の鼓動 錆び付かせる\n[02:12.06]もう君を見る事無く消えたいな ああ\n[02:18.19]\n[02:31.74]\n[02:33.74]相対 曖昧な 返答でごまかし\n[02:39.09]大体 反対な 顔を作る\n[02:44.49]後悔 先に立たずだ\n[02:48.55]\n[02:49.98]―nonsense―\n[03:20.32]\n[03:22.32]まわる まわる 世界は\n[03:24.57]僕の事など無視をして\n[03:27.60]何も知らずに そっと\n[03:29.92]僕の心 錆び付かせる\n[03:32.93]「もう君を守るなんて言えないな」\n[03:37.84]\n[03:38.55]こわれ こわれる 僕は\n[03:40.78]誰も 信じられなくなる\n[03:43.77]「誰も知らずに そっと\n[03:46.11]雨に溶けて 無くなる」とか\n[03:49.20]ああそんなふざけた事言えないな\n[03:53.88]\n[03:54.64]ああ\n[03:55.81]まわる\n[03:56.33]まわる\n[03:56.96]まわるまわる\n[03:58.26]まわるまわるまわる\n[04:00.95]これで終わる落ちる目眩だ\n[04:04.67]ああ ああ ああ ああ ああ\n[04:12.14]\n',
        sublyric: '[by:Tsumugi-mio]\n[00:24.23]\n[00:35.07]呐呐 鼓膜 快要融化的感觉\n[00:39.73]指尖 前面 是那光芒的体温\n[00:45.13]现在 的我 还未曾知晓\n[00:51.00]我即将要忘记 那遥远的时光\n[00:55.50]总有一天你也 将会褪去颜色\n[01:00.96]「但是现在的我还 没有 忘记哟」\n[01:07.44]回转的 回转的 这个世界将我全然无视\n[01:09.71]就像什么都不知道一样\n[01:12.78]悄悄地\n[01:15.10]我的心生锈\n[01:18.16]「会守护你的」\n[01:23.44]这句话已经说不出口\n[01:25.92]谁也不会相信\n[01:28.96]悄悄地\n[01:31.30]像雨一样融化掉\n[01:34.33]像这样不可能的事情 我是说不出口的\n[01:45.19]啊啊 扎破 鼓膜的赤红颜色\n[01:49.52]头脑里面 就像要溶化了一样\n[01:54.90]这样的我 再一次变得「听不见了」\n[02:01.35]回转的 回转的 这个世界将我全然无视\n[02:03.65]就像什么都不知道一样\n[02:06.73]悄悄地\n[02:09.06]让我的心最后的跳动生锈\n[02:12.06]你的事情已经像开始就不存在一般消失掉了啊\n[02:33.74]暧昧的回答 那才是谎话\n[02:39.09]你做出的大致都\n[02:44.49]是反对的神情呢\n[02:49.98]- - - - - - - -\n[03:22.32]回转的 回转的 这个世界将我全然无视\n[03:24.57]就像什么都不知道一样\n[03:27.60]悄悄地\n[03:29.92]使我的心生锈\n[03:32.93]「会守护你的」\n[03:38.55]这句话已经说不出口\n[03:40.78]快要坏掉 快要坏掉的\n[03:43.77]谁也不知道 悄悄地\n[03:46.11]像雨一样融化掉 消失不见\n[03:49.20]之类的像这样不可能的事情 说不出口\n[03:54.64]啊啊\n[03:55.81]回转着\n[03:56.33]回转着\n[03:56.96]回转回转着\n[03:58.26]回转着回转着回转着\n[04:00.95]终末时遗留下的头晕\n[04:04.67]啊啊 啊啊 啊啊 啊啊\n'
    }, {
        src: __webpack_require__(24),
        name: 'In my room',
        artist: 'FELT'
    }];
    var player = new lib_1.default({
        element: document.getElementById('app'),
        zoomOutKana: true,
        playlist: playlist
    });
    document.getElementById('add163').addEventListener("click", function (e) {
        var id163 = prompt('输入音乐的网易云ID:').trim();
        if (id163) {
            player.view.showPlaylist();
            player.add163(id163);
        }
    });
    window.demoPlayer = player;
    window.playlist = playlist;
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var listloop_1 = __webpack_require__(0);
var events_1 = __webpack_require__(1);
var view_1 = __webpack_require__(6);
var lyric_1 = __webpack_require__(17);
var singlecycle_1 = __webpack_require__(18);
var listrandom_1 = __webpack_require__(19);
var defaultOption = {
    playlist: [],
    point: 0,
    volume: 1,
    playmode: 'listloop'
};
var playmodes = {
    listloop: listloop_1.listloopPlaymode,
    singlecycle: singlecycle_1.singlecyclePlaymode,
    listrandom: listrandom_1.listrandomPlaymode
};
function playlistPreFilter(playlist) {
    return playlist.map(function (audio, index) {
        var res = Object.assign({}, audio);
        if (typeof audio.lyric === 'string') {
            res.lyric = lyric_1.decodeLyricStr(audio.lyric);
        }
        if (typeof audio.sublyric === 'string') {
            res.sublyric = lyric_1.decodeLyricStr(audio.sublyric);
        }
        return res;
    });
}

var cplayer = function (_events_1$EventEmitte) {
    _inherits(cplayer, _events_1$EventEmitte);

    function cplayer(options) {
        _classCallCheck(this, cplayer);

        var _this = _possibleConstructorReturn(this, (cplayer.__proto__ || Object.getPrototypeOf(cplayer)).call(this));

        _this.__paused = true;
        _this.playmodeName = 'listloop';
        _this.eventHandlers = {
            handlePlay: function handlePlay() {
                if (_this.__paused) {
                    _this.pause();
                }
            },
            handleVolumeChange: function handleVolumeChange() {
                _this.emit('volumechange', _this.audioElement.volume);
            },
            handleTimeUpdate: function handleTimeUpdate() {
                var time = _this.audioElement.duration;
                var playedTime = _this.audioElement.currentTime;
                _this.emit('timeupdate', playedTime, time);
            },
            handleCanPlayThrough: function handleCanPlayThrough() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                _this.emit.apply(_this, ['canplaythrough'].concat(args));
            },
            handlePause: function handlePause() {
                if (!_this.__paused && !_this.audioElement.ended) {
                    _this.play();
                }
            },
            handleEnded: function handleEnded() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                if (!_this.__paused) {
                    _this.next();
                }
                _this.emit.apply(_this, ['ended'].concat(args));
            },
            handlePlayListChange: function handlePlayListChange() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                _this.emit.apply(_this, ['playlistchange'].concat(args));
            },
            handlePlaymodeChange: function handlePlaymodeChange() {
                var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.mode;

                _this.emit('playmodechange', mode);
            }
        };
        options = Object.assign({}, defaultOption, options);
        _this.audioElement = new Audio();
        _this.audioElement.loop = false;
        _this.audioElement.autoplay = false;
        _this.initializeEventEmitter();
        _this.playmode = new playmodes[options.playmode](playlistPreFilter(options.playlist), options.point);
        _this.view = new view_1.default(_this, options);
        _this.openAudio();
        _this.eventHandlers.handlePlaymodeChange();
        _this.setVolume(options.volume);
        return _this;
    }

    _createClass(cplayer, [{
        key: "initializeEventEmitter",
        value: function initializeEventEmitter() {
            this.audioElement.addEventListener('volumechange', this.eventHandlers.handleVolumeChange);
            this.audioElement.addEventListener('timeupdate', this.eventHandlers.handleTimeUpdate);
            this.audioElement.addEventListener('canplaythrough', this.eventHandlers.handleCanPlayThrough);
            this.audioElement.addEventListener('pause', this.eventHandlers.handlePause);
            this.audioElement.addEventListener('play', this.eventHandlers.handlePlay);
            this.audioElement.addEventListener('ended', this.eventHandlers.handleEnded);
            this.audioElement.addEventListener('loadeddata', this.eventHandlers.handleLoadeddata);
        }
    }, {
        key: "isPlaying",
        value: function isPlaying() {
            return this.audioElement.currentTime > 0 && !this.audioElement.paused && !this.audioElement.ended && this.audioElement.readyState > 2;
        }
    }, {
        key: "openAudio",
        value: function openAudio() {
            var audio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.nowplay;

            if (audio) {
                this.audioElement.src = this.nowplay.src;
                this.emit('openaudio', audio);
            }
        }
    }, {
        key: "toggleMode",
        value: function toggleMode() {
            switch (this.playmodeName) {
                case 'listloop':
                    this.setMode('singlecycle');
                    break;
                case 'singlecycle':
                    this.setMode('listrandom');
                    break;
                case 'listrandom':
                    this.setMode('listloop');
                    break;
            }
        }
    }, {
        key: "setMode",
        value: function setMode(playmode) {
            if (typeof playmode === 'string') {
                if (this.playmodeName !== playmode) {
                    if (playmodes[playmode]) {
                        this.playmode = new playmodes[playmode](this.playlist, this.nowplaypoint);
                        this.playmodeName = playmode;
                        this.eventHandlers.handlePlaymodeChange();
                    }
                }
            }
        }
    }, {
        key: "getMode",
        value: function getMode() {
            return this.mode;
        }
    }, {
        key: "play",
        value: function play() {
            var isPlaying = this.isPlaying();
            if (!isPlaying) {
                this.__paused = false;
                this.audioElement.play();
                this.emit('playstatechange', this.__paused);
                this.emit('play');
            }
        }
    }, {
        key: "pause",
        value: function pause() {
            var isPlaying = this.audioElement.currentTime > 0 && !this.audioElement.paused && !this.audioElement.ended && this.audioElement.readyState > 2;
            if (isPlaying) {
                this.__paused = true;
                this.audioElement.pause();
                this.emit('playstatechange', this.__paused);
                this.emit('pause');
            }
        }
    }, {
        key: "to",
        value: function to(id) {
            this.playmode.to(id);
            this.openAudio();
            this.play();
        }
    }, {
        key: "next",
        value: function next() {
            this.playmode.next();
            this.openAudio();
            this.play();
        }
    }, {
        key: "prev",
        value: function prev() {
            this.playmode.prev();
            this.openAudio();
            this.play();
        }
    }, {
        key: "togglePlayState",
        value: function togglePlayState() {
            if (this.__paused) {
                this.play();
            } else {
                this.pause();
            }
        }
    }, {
        key: "add",
        value: function add(item) {
            item = playlistPreFilter([item])[0];
            this.playmode.addMusic(item);
            this.eventHandlers.handlePlayListChange();
        }
    }, {
        key: "remove",
        value: function remove(item) {
            var needUpdate = this.playmode.removeMusic(item);
            this.eventHandlers.handlePlayListChange();
            if (needUpdate) {
                this.openAudio();
                if (this.__paused) {
                    this.pause();
                } else {
                    this.play();
                }
            }
        }
    }, {
        key: "setVolume",
        value: function setVolume(volume) {
            this.audioElement.volume = Math.max(0.0, Math.min(1.0, volume));
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var _this2 = this;

            this.audioElement.src = null;
            this.audioElement.removeEventListener("timeupdate", this.eventHandlers.handleTimeUpdate);
            this.removeAllListeners();
            this.view.destroy();
            Object.getOwnPropertyNames(this).forEach(function (name) {
                return delete _this2[name];
            });
            this.__proto__ = Object;
        }
    }, {
        key: "mode",
        set: function set(playmode) {
            this.setMode(playmode);
        },
        get: function get() {
            return this.playmodeName;
        }
    }, {
        key: "volume",
        set: function set(volume) {
            this.setVolume(volume);
        }
    }, {
        key: "playlist",
        get: function get() {
            return this.playmode.playlist;
        }
    }, {
        key: "nowplay",
        get: function get() {
            return this.playmode && this.playmode.now();
        }
    }, {
        key: "nowplaypoint",
        get: function get() {
            return this.playmode && this.playmode.nowpoint();
        }
    }, {
        key: "played",
        get: function get() {
            return !this.__paused;
        }
    }, {
        key: "paused",
        get: function get() {
            return this.__paused;
        }
    }]);

    return cplayer;
}(events_1.EventEmitter);

exports.default = cplayer;
function parseCPlayerTag() {
    Array.prototype.forEach.call(document.querySelectorAll('template[cplayer]'), function (element) {
        element.attributes.getNamedItem('loaded') || new cplayer(Object.assign({ generateBeforeElement: true, deleteElementAfterGenerate: true, element: element }, JSON.parse(element.innerHTML)));
    });
}
window.addEventListener("load", parseCPlayerTag);
window.cplayer = cplayer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var hasOwn = Object.prototype.hasOwnProperty;
function is(x, y) {
    if (x == y) {
        return x != 0 || y != 0 || 1 / x == 1 / y;
    } else {
        return x != x && y != y;
    }
}
function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true;
    if ((typeof objA === "undefined" ? "undefined" : _typeof(objA)) !== 'object' || objA === null || (typeof objB === "undefined" ? "undefined" : _typeof(objB)) !== 'object' || objB === null) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }
    return true;
}
exports.default = shallowEqual;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var returntypeof_1 = __webpack_require__(7);
var events_1 = __webpack_require__(1);
var parseHTML_1 = __webpack_require__(8);
var defaultPoster = __webpack_require__(9);
var htmlTemplate = __webpack_require__(10);
var playIcon = __webpack_require__(11);
__webpack_require__(12);
function kanaFilter(str) {
    var starttag = '<span class="cp-lyric-text-zoomout">';
    var endtag = '</span>';
    var res = '';
    var startflag = false;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);
        var kano = /[ぁ-んァ-ン]/.test(ch);
        if (kano && !startflag) {
            res += starttag;
            startflag = true;
        }
        if (!kano && startflag) {
            res += endtag;
            startflag = false;
        }
        res += ch;
    }
    if (startflag) {
        res += endtag;
    }
    return res;
}
function buildLyric(lyric, sublyric) {
    var zoomOutKana = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return (zoomOutKana ? kanaFilter(lyric) : lyric) + (sublyric ? "<span class=\"cp-lyric-text-sub\">" + sublyric + "</span>" : '');
}
var defaultOption = {
    element: document.body,
    generateBeforeElement: false,
    deleteElementAfterGenerate: false,
    zoomOutKana: false,
    showPlaylist: false
};

var cplayerView = function (_events_1$EventEmitte) {
    _inherits(cplayerView, _events_1$EventEmitte);

    function cplayerView(player, options) {
        _classCallCheck(this, cplayerView);

        var _this = _possibleConstructorReturn(this, (cplayerView.__proto__ || Object.getPrototypeOf(cplayerView)).call(this));

        _this.elementLinks = returntypeof_1.default(_this.getElementLinks);
        _this.dropDownMenuShowInfo = true;
        _this.__OldVolume = 1;
        _this.__OldLyric = '';
        _this.__OldTotalTime = 0;
        _this.handlePlaylistchange = function () {
            _this.updatePlaylist();
        };
        _this.handleClickListButton = function () {
            _this.toggleDropDownMenu();
        };
        _this.handleClickModeButton = function () {
            _this.player.toggleMode();
        };
        _this.handleClickPlayList = function (point, event) {
            if (_this.player.nowplaypoint !== point) _this.player.to(point);
        };
        _this.handleClickPlayButton = function () {
            _this.player.togglePlayState();
        };
        _this.handleClickVolumeButton = function () {
            _this.toggleVolumeControllerKeepShow();
        };
        _this.handleOpenAudio = function (audio) {
            _this.setPoster(audio.poster || defaultPoster);
            _this.setProgress(0);
            _this.elementLinks.title.innerText = audio.name;
            _this.elementLinks.artist.innerText = audio.artist || '';
            _this.updateLyric();
            _this.updatePlaylist();
        };
        _this.handleModeChange = function (mode) {
            _this.setMode(mode);
        };
        _this.handleVolumeChange = function (volume) {
            _this.setVolume(volume);
        };
        _this.handleTimeUpdate = function (playedTime, time) {
            _this.setProgress(playedTime / time);
            _this.updateLyric(playedTime);
        };
        _this.handleClickPrevButton = function () {
            _this.player.prev();
        };
        _this.handleClickNextButton = function () {
            _this.player.next();
        };
        _this.handlePlayStateChange = function (paused) {
            _this.setPlayIcon(paused);
        };
        _this.handleMouseVolumeController = function (event) {
            _this.removeVolumeControllerKeepShow();
            if (event.buttons === 1) {
                var volume = Math.max(0, Math.min(1.0, (event.clientX - _this.elementLinks.volumeController.getBoundingClientRect().left) / _this.elementLinks.volumeController.clientWidth));
                _this.player.setVolume(volume);
                _this.setVolume(volume);
            }
        };
        _this.handleTouchVolumeController = function (event) {
            _this.removeVolumeControllerKeepShow();
            var volume = Math.max(0, Math.min(1.0, (event.targetTouches[0].clientX - _this.elementLinks.volumeController.getBoundingClientRect().left) / _this.elementLinks.volumeController.clientWidth));
            _this.player.setVolume(volume);
            _this.setVolume(volume);
        };
        _this.options = Object.assign({}, defaultOption, options);
        _this.player = player;
        if (_this.options.generateBeforeElement) {
            var newFragment = parseHTML_1.default(htmlTemplate);
            _this.options.element.parentNode.insertBefore(newFragment, _this.options.element);
            _this.rootElement = _this.options.element.previousSibling;
        } else {
            _this.options.element.appendChild(parseHTML_1.default(htmlTemplate));
            _this.rootElement = _this.options.element.lastChild;
        }
        if (options.deleteElementAfterGenerate) {
            options.element.parentElement.removeChild(options.element);
        }
        _this.elementLinks = _this.getElementLinks();
        _this.injectEventListener();
        _this.setPlayIcon(_this.player.paused);
        _this.dropDownMenuShowInfo = !_this.options.showPlaylist;
        if (_this.dropDownMenuShowInfo) {
            _this.showInfo();
        } else _this.showPlaylist();
        return _this;
    }

    _createClass(cplayerView, [{
        key: "getRootElement",
        value: function getRootElement() {
            return this.rootElement;
        }
    }, {
        key: "getPlayListLinks",
        value: function getPlayListLinks() {
            var rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.rootElement;

            return rootElement.querySelectorAll('.cp-playlist li');
        }
    }, {
        key: "getElementLinks",
        value: function getElementLinks() {
            var rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.rootElement;

            var gebc = function gebc(className) {
                return rootElement.getElementsByClassName(className)[0];
            };
            return {
                icon: {
                    play: gebc('cp-play-icon'),
                    mode: gebc('cp-mode-icon')
                },
                button: {
                    prev: gebc('cp-prev-button'),
                    play: gebc('cp-play-button'),
                    next: gebc('cp-next-button'),
                    volume: gebc('cp-volume-icon'),
                    list: gebc('cp-list-button'),
                    mode: gebc('cp-mode-button')
                },
                progress: gebc('cp-progress-fill'),
                poster: gebc('cp-poster'),
                title: gebc('cp-audio-title'),
                artist: gebc('cp-audio-artist'),
                lyric: gebc('cp-lyric-text'),
                lyricContainer: gebc('cp-lyric'),
                volumeController: gebc('cp-volume-controller'),
                volumeFill: gebc('cp-volume-fill'),
                volumeControllerButton: gebc('cp-volume-controller-button'),
                volumeControllerContainer: gebc('cp-volume-container'),
                dropDownMenu: gebc('cp-drop-down-menu'),
                playlist: gebc('cp-playlist'),
                playlistItems: this.getPlayListLinks(rootElement)
            };
        }
    }, {
        key: "setPlayIcon",
        value: function setPlayIcon(paused) {
            if (paused) {
                this.elementLinks.icon.play.classList.add('cp-play-icon-paused');
            } else {
                this.elementLinks.icon.play.classList.remove('cp-play-icon-paused');
            }
        }
    }, {
        key: "setProgress",
        value: function setProgress(point) {
            this.elementLinks.progress.style.transform = "translateX(-" + (100 - point * 100) + "%)";
        }
    }, {
        key: "setPoster",
        value: function setPoster(src) {
            this.elementLinks.poster.style.backgroundImage = "url(\"" + src + "\")";
        }
    }, {
        key: "setVolume",
        value: function setVolume(volume) {
            if (this.__OldVolume !== volume) {
                this.elementLinks.volumeFill.style.width = volume * 100 + "%";
                this.elementLinks.volumeControllerButton.style.right = (1 - volume) * 100 + '%';
                this.__OldVolume = volume;
            }
        }
    }, {
        key: "setMode",
        value: function setMode(mode) {
            var modeattr = document.createAttribute('data-mode');
            modeattr.value = mode;
            this.elementLinks.button.mode.attributes.setNamedItem(modeattr);
        }
    }, {
        key: "showInfo",
        value: function showInfo() {
            var dropDownMenu = this.elementLinks.dropDownMenu;
            dropDownMenu.style.height = '';
            dropDownMenu.classList.remove('cp-drop-down-menu-playlist');
            dropDownMenu.classList.add('cp-drop-down-menu-info');
            this.dropDownMenuShowInfo = true;
        }
    }, {
        key: "showPlaylist",
        value: function showPlaylist() {
            var dropDownMenu = this.elementLinks.dropDownMenu;
            dropDownMenu.style.height = this.player.playlist.length * 25 + 'px';
            dropDownMenu.classList.remove('cp-drop-down-menu-info');
            dropDownMenu.classList.add('cp-drop-down-menu-playlist');
            this.dropDownMenuShowInfo = false;
        }
    }, {
        key: "toggleDropDownMenu",
        value: function toggleDropDownMenu() {
            if (this.dropDownMenuShowInfo) {
                this.showPlaylist();
            } else {
                this.showInfo();
            }
        }
    }, {
        key: "setVolumeControllerKeepShow",
        value: function setVolumeControllerKeepShow() {
            this.elementLinks.volumeControllerContainer.classList.add('cp-volume-container-show');
        }
    }, {
        key: "toggleVolumeControllerKeepShow",
        value: function toggleVolumeControllerKeepShow() {
            this.elementLinks.volumeControllerContainer.classList.toggle('cp-volume-container-show');
        }
    }, {
        key: "removeVolumeControllerKeepShow",
        value: function removeVolumeControllerKeepShow() {
            this.elementLinks.volumeControllerContainer.classList.remove('cp-volume-container-show');
        }
    }, {
        key: "setLyric",
        value: function setLyric(lyric) {
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var totalTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (this.__OldLyric !== lyric || this.__OldTotalTime !== totalTime) {
                this.elementLinks.lyric.innerHTML = lyric;
                this.elementLinks.lyric.style.transition = '';
                this.elementLinks.lyric.style.transform = '';
                if (totalTime !== 0) {
                    var lyricWidth = this.elementLinks.lyric.clientWidth;
                    var lyricContainerWidth = this.elementLinks.lyricContainer.clientWidth;
                    if (lyricWidth > lyricContainerWidth) {
                        var duration = totalTime - time;
                        var targetOffset = lyricWidth - lyricContainerWidth;
                        var timepage = lyricContainerWidth / lyricWidth * duration;
                        var startTime = Math.min(timepage * 0.6, duration);
                        var moveTime = duration - timepage;
                        this.elementLinks.lyric.style.transition = "transform " + moveTime + "ms linear " + startTime + "ms";
                        this.elementLinks.lyric.style.transform = "translateX(-" + targetOffset + "px)";
                    }
                }
                this.__OldLyric = lyric;
                this.__OldTotalTime = totalTime;
            }
        }
    }, {
        key: "updatePlaylist",
        value: function updatePlaylist() {
            var _this2 = this;

            var lis = this.player.playlist.map(function (audio, index) {
                var element = document.createElement('li');
                element.innerHTML = "\n        " + (index === _this2.player.nowplaypoint ? playIcon : '<span class="cp-play-icon"></span>') + "\n        <span>" + audio.name + "</span><span class='cp-playlist-artist'>" + (audio.artist ? ' - ' + audio.artist : '') + "</span>\n      ";
                return element;
            });
            this.elementLinks.playlist.innerHTML = '';
            lis.forEach(function (li) {
                _this2.elementLinks.playlist.appendChild(li);
            });
            this.elementLinks.playlistItems = this.getPlayListLinks();
            this.injectPlayListEventListener();
            if (!this.dropDownMenuShowInfo) {
                this.elementLinks.dropDownMenu.style.height = this.player.playlist.length * 25 + 'px';
            }
        }
    }, {
        key: "injectPlayListEventListener",
        value: function injectPlayListEventListener() {
            var _this3 = this;

            Array.prototype.forEach.call(this.elementLinks.playlistItems, function (i, index) {
                i.addEventListener('click', function (event) {
                    _this3.handleClickPlayList(index, event);
                });
            });
        }
    }, {
        key: "injectEventListener",
        value: function injectEventListener() {
            this.elementLinks.button.play.addEventListener('click', this.handleClickPlayButton);
            this.elementLinks.button.prev.addEventListener('click', this.handleClickPrevButton);
            this.elementLinks.button.next.addEventListener('click', this.handleClickNextButton);
            this.elementLinks.button.volume.addEventListener('click', this.handleClickVolumeButton);
            this.elementLinks.button.list.addEventListener('click', this.handleClickListButton);
            this.elementLinks.button.mode.addEventListener('click', this.handleClickModeButton);
            this.elementLinks.volumeController.addEventListener('mousemove', this.handleMouseVolumeController);
            this.elementLinks.volumeController.addEventListener('mousedown', this.handleMouseVolumeController);
            this.elementLinks.volumeController.addEventListener('touchmove', this.handleTouchVolumeController);
            this.player.addListener('playstatechange', this.handlePlayStateChange);
            this.player.addListener('timeupdate', this.handleTimeUpdate);
            this.player.addListener('openaudio', this.handleOpenAudio);
            this.player.addListener('volumechange', this.handleVolumeChange);
            this.player.addListener('playmodechange', this.handleModeChange);
            this.player.addListener('playlistchange', this.handlePlaylistchange);
            this.injectPlayListEventListener();
        }
    }, {
        key: "updateLyric",
        value: function updateLyric() {
            var playedTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (this.player.nowplay.lyric && typeof this.player.nowplay.lyric !== 'string' && this.player.played) {
                var lyric = this.player.nowplay.lyric.getLyric(playedTime * 1000);
                var nextLyric = this.player.nowplay.lyric.getNextLyric(playedTime * 1000);
                if (lyric) {
                    var sublyric = void 0;
                    if (this.player.nowplay.sublyric && typeof this.player.nowplay.sublyric !== 'string') {
                        sublyric = this.player.nowplay.sublyric.getLyric(playedTime * 1000);
                    }
                    if (nextLyric) {
                        var duration = nextLyric.time - lyric.time;
                        var currentTime = playedTime * 1000 - lyric.time;
                        this.setLyric(buildLyric(lyric.word, sublyric ? sublyric.word : undefined, this.options.zoomOutKana), currentTime, duration);
                    } else {
                        var _duration = this.player.audioElement.duration - lyric.time;
                        var _currentTime = playedTime * 1000 - lyric.time;
                        this.setLyric(buildLyric(lyric.word, sublyric ? sublyric.word : undefined, this.options.zoomOutKana), _currentTime, _duration);
                    }
                } else {
                    this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist, false), playedTime * 1000, nextLyric.time);
                }
            } else {
                this.setLyric(buildLyric(this.player.nowplay.name, this.player.nowplay.artist, false));
            }
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.rootElement.parentElement.removeChild(this.rootElement);
        }
    }]);

    return cplayerView;
}(events_1.EventEmitter);

exports.default = cplayerView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function returntypeof(expression) {
    return {};
}
exports.default = returntypeof;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function parseHTML(elem) {
    var fragment = document.createDocumentFragment();
    var newelement = document.createElement('div');
    fragment.appendChild(newelement);
    newelement.innerHTML = elem;
    fragment.removeChild(fragment.firstChild);
    fragment.appendChild(newelement.firstChild);
    return fragment;
}
exports.default = parseHTML;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAiACIDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAcDBAUG/8QALhAAAgEDAwIFAwMFAAAAAAAAAQIDAAQRBRIhE0EGIjFRkRQzYTI1cXOBocHR/8QAGAEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQACAQMCBwAAAAAAAAAAAAAAAQIDETESFAQhIkFRYWL/2gAMAwEAAhEDEQA/AGBo7mOKMEBjgc4rqLaRWXG1fgUttA1qNbnpPdGV5mIRRhkiKgeTjkE5J5/1W9pniH6jVbuPdiO2gJwHG13B5wcc44+a5tPpNM4N3OwlC45RfgVlXMA2t5E/nFVZ/EEaWVlcmJmjuDHnDAdIP6MR3GSBx71Fe37LbSSKylVIyNwyM002IotGc2N7cr6+1FYTXu5iepKcnP66KzF9AoBfQ2LmzgWWJp3L72A8rNt2kY5x/wBrtfD+oSXkQ6k8iQSRuJVjwr78DcATx6YyfYehNcbsttTkayGoiGcPuh3REo2FG0bt2R6e3fvVW2vulYSSMPND9vk46jcA/Ab/ABXTlBSXsCnpvfAydb8TR3eg7bMrGrStB1c8r0wTsP4PDKe/OeRUXiPxFLBojump6fFcTtGFeCTDHaoJyMe5A70uYte+n097Z7eK6EjA4mJCptXAK7SOcE1S1a9jvbqNoYzFCkSIiFtxGBzk9znvQXD81cV1kkMSAWDQRt9bMuVB272OOPTOKKVu4+5+aKO2+gbleC5bfusf9U1ctlB1RYiAYy/Kn0P9qKKtLIkMGfeKBdkAADjgVFcffYdgcD8UUU6JPuR0UUURT//Z"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<c-player loaded> <div class=cp-mainbody> <div class=cp-poster> </div> <div class=cp-center-container> <div class=cp-controls> <a class=cp-prev-button> <svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink class=cp-prev-icon viewBox=\"0 0 1024 1024\" version=1.1> <path d=\"M943.705 11.8c10.321 5.183 17.325 15.601 17.534 27.675l-0.004 938.318c-0.167 12.186-7.229 22.684-17.457 27.782-4.857 2.548-10.527 4.026-16.543 4.026a35.75 35.75 0 0 1-18.217-4.955l-716.617-469c-9.689-5.299-16.151-15.421-16.151-27.053 0-11.63 6.462-21.753 15.991-26.972L909.186 12.666c5.177-3.048 11.404-4.848 18.052-4.848a35.878 35.878 0 0 1 16.665 4.077z\"/> <path d=\"M228.435 77.809v868.712c-3.889 42.573-39.416 75.664-82.673 75.664s-78.784-33.091-82.649-75.34l-0.024-869.036C65.9 34.259 101.911 0 145.924 0s80.024 34.259 82.822 77.564z\"/> </svg> </a> <a class=cp-play-button> <span class=\"cp-play-icon cp-play-icon-paused\"> <div class=cp-play-icon-left></div> <div class=cp-play-icon-right></div> <div class=cp-play-icon-triangle-1></div> <div class=cp-play-icon-triangle-2></div> </span> </a> <a class=cp-next-button> <svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink class=cp-next-icon viewBox=\"0 0 1024 1024\" version=1.1> <path d=\"M943.705 11.8c10.321 5.183 17.325 15.601 17.534 27.675l-0.004 938.318c-0.167 12.186-7.229 22.684-17.457 27.782-4.857 2.548-10.527 4.026-16.543 4.026a35.75 35.75 0 0 1-18.217-4.955l-716.617-469c-9.689-5.299-16.151-15.421-16.151-27.053 0-11.63 6.462-21.753 15.991-26.972L909.186 12.666c5.177-3.048 11.404-4.848 18.052-4.848a35.878 35.878 0 0 1 16.665 4.077z\"/> <path d=\"M228.435 77.809v868.712c-3.889 42.573-39.416 75.664-82.673 75.664s-78.784-33.091-82.649-75.34l-0.024-869.036C65.9 34.259 101.911 0 145.924 0s80.024 34.259 82.822 77.564z\"/> </svg> </a> </div> <div class=cp-lyric> <span class=cp-lyric-text></span> </div> </div> <a class=cp-volume-button> <svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink class=\"cp-volume-icon cp-icon-dark\" viewBox=\"0 200 1024 650\" version=1.1> <path d=\"M607.869008 364.026176l-49.340512 49.340528c25.412064 25.160448 41.150352 60.055392 41.150352 98.637648 0 38.573568-15.738288 73.477184-41.150352 98.62896l49.340512 49.340512c37.836112-37.888176 61.244-90.195872 61.244-147.969488 0-57.782272-23.407888-110.081328-61.244-147.978176z\"/> <path d=\"M807.937968 512c0-96.086912-39.050752-183.055296-102.134064-245.904368L656.95792 314.9416c50.398992 50.45104 81.563248 120.1108 81.563248 197.0584 0 76.938912-31.172944 146.598672-81.563248 197.0584l48.845984 48.845968C768.887216 695.055296 807.937968 608.086896 807.937968 512z\"/> <path d=\"M946.780288 512.004336c0-134.434896-54.598176-256.107376-142.807248-344.082192l-49.088912 49.088896c75.65488 75.411952 122.470672 179.732384 122.470672 294.993296 0 115.252224-46.815792 219.581328-122.470672 294.984608l49.088912 49.088912c88.209072-87.966144 142.807248-209.647312 142.807248-344.07352z\"/> <path d=\"M247.605111 659.304938 458.566804 854.551527 458.566804 169.448479 251.58222 364.704275 53.490893 364.704275 53.490893 659.304938Z\"/> </svg> <div class=cp-volume-container> <div> <span class=cp-volume-controller> <span class=cp-volume-fill></span> <span class=cp-volume-controller-button></span> </span> </div> </div> </a> <a class=cp-list-button> <svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink class=\"cp-list-icon cp-icon-dark\" viewBox=\"0 0 1024 1024\" version=1.1> <path d=\"M168.57 820.6c0 14.34-9.56 23.89-23.89 23.89H96.89c-14.34 0-23.89-9.55-23.89-23.89v-47.79c0-14.34 9.56-23.89 23.89-23.89h47.79c14.34 0 23.89 9.56 23.89 23.89z m0-284.33c0 14.34-9.56 23.89-23.89 23.89H96.89c-14.34 0-23.89-9.56-23.89-23.89v-47.79c0-14.34 9.56-23.89 23.89-23.89h47.79c14.34 0 23.89 9.56 23.89 23.89z m0-286.72c0 14.34-9.56 23.89-23.89 23.89H96.89c-14.34 0-23.89-9.56-23.89-23.89v-47.79c0-14.34 9.56-23.89 23.89-23.89h47.79c14.34 0 23.89 9.56 23.89 23.89zM969 820.6c0 14.34-7.17 23.89-21.5 23.89H314.32c-14.34 0-23.89-9.56-23.89-23.89v-47.79c0-14.34 9.56-23.89 23.89-23.89H945.1c14.34 0 23.89 9.56 23.89 23.89z m0-284.33c0 14.34-7.17 23.89-21.5 23.89H314.32c-14.34 0-23.89-9.56-23.89-23.89v-47.79c0-14.34 9.56-23.89 23.89-23.89H945.1c14.34 0 23.89 9.56 23.89 23.89z m0-286.72c0 14.34-7.17 23.89-21.5 23.89H314.32c-14.34 0-23.89-9.56-23.89-23.89v-47.79c0-14.34 9.56-23.89 23.89-23.89H945.1c14.34 0 23.89 9.56 23.89 23.89z\"/> </svg> </a> <a class=cp-mode-button data-mode=listloop> <svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink class=\"cp-loop-icon cp-icon-dark\" viewBox=\"0 0 1024 1024\" version=1.1> <path d=\"M157 624c17.3-4.8 27.4-22.7 22.6-40-5.4-19.4-8.1-39.5-8.1-59.9 0-123.1 100.1-223.2 223.2-223.2h302.4v57.6c0 18.5 12.9 25.6 28.6 15.9l138.6-85.8c15.7-9.7 15.9-25.9 0.3-35.9l-139.2-89.9c-15.5-10-28.2-3.1-28.2 15.4V236H394.7c-77 0-149.3 30-203.8 84.4-54.4 54.4-84.4 126.8-84.4 203.8 0 26.2 3.5 52.2 10.5 77.3 4 14.4 17.1 23.8 31.3 23.8 2.9-0.1 5.8-0.4 8.7-1.3z m748.7-202.1c-4-14.4-17.1-23.8-31.3-23.8-2.9 0-5.8 0.4-8.7 1.2-17.3 4.8-27.4 22.7-22.6 40 5.4 19.4 8.1 39.5 8.1 59.9 0 123.1-100.1 223.2-223.2 223.2H325.5v-57.6c0-18.5-12.9-25.6-28.6-15.9l-138.6 85.8c-15.7 9.7-15.9 25.9-0.3 35.9l139.2 89.9c15.5 10 28.2 3.1 28.2-15.4v-57.9h302.4c77 0 149.3-30 203.8-84.4C886 648.4 916 576 916 499c0.1-26-3.4-52-10.3-77.1z\"/> </svg> <svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink class=\"cp-single-icon cp-icon-dark\" viewBox=\"0 0 1024 1024\" version=1.1> <path d=\"M102.5 653.9c17.3-4.8 27.4-22.7 22.6-40-5.4-19.4-8.1-43.4-8.1-63.8C117 427 217.1 323 340.2 323h132.3c1.4-20 5.4-40 11.7-60h-144c-77 0-149.4 31.4-203.8 85.8C82 403.2 52 476.3 52 553.3c0 26.2 3.5 52.6 10.5 77.6 4 14.4 17.1 24 31.3 24 2.9 0 5.8-0.2 8.7-1z m471 109.1H272v-68.3c0-18.5-13.3-25.6-29-15.9l-138.8 85.8c-15.7 9.7-16 25.9-0.5 35.9l139.7 89.9c15.5 10 28.7 3.1 28.7-15.4v-52h301.5c77 0 149.4-32.9 203.8-87.3 34.7-34.7 59.5-78.2 72.9-124-24 9-49.6 19.4-76.2 21.5-36.5 74-112.7 129.8-200.6 129.8zM752 127.9c-121.5 0-220 98.5-220 220s98.5 220 220 220 220-98.5 220-220-98.5-220-220-220zM792 463h-40V298.7c-20 14-36.2 24.5-60 31.3v-41.8c11.5-2.9 23.8-10.4 36.7-17.6 13-7.9 23.8-7.7 32.4-27.7H792V463z\"/> </svg> <svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink class=\"cp-random-icon cp-icon-dark\" viewBox=\"0 0 1024 1024\" version=1.1> <path d=\"M112 405.2h218.2c7.1 0 21 5.8 26 10.8l38 38.6c13.6 13.8 35.7 13.9 49.5 0.4 13.8-13.6 13.9-35.7 0.4-49.5l-38-38.6c-18.1-18.4-50-31.7-75.8-31.7H112c-19.3 0-35 15.7-35 35 0 19.4 15.7 35 35 35z m623.2 0h62.4v42.6c0 10.9 7.5 15 16.7 8.8l125.8-83.9c9.3-6.2 9.2-16.2 0-22.4l-125.8-83.9c-9.3-6.2-16.7-2.2-16.7 8.8v60h-62.4c-53.5 0-123.5 29.3-161 67.4L393.9 585.7c-24.3 24.7-76.4 46.5-111.1 46.5H112c-19.3 0-35 15.7-35 35s15.7 35 35 35h170.7c53.5 0 123.5-29.3 161-67.4L624 451.7c24.4-24.7 76.4-46.5 111.2-46.5z m79.1 161.2c-9.3-6.2-16.7-2.2-16.7 8.8v57H681.9c-6.9 0-20.2-5.6-25-10.4l-37.3-37.9c-13.6-13.8-35.7-13.9-49.5-0.4-13.8 13.6-13.9 35.7-0.4 49.5l37.3 37.9c18 18.2 49.3 31.3 74.9 31.3h115.6v45.6c0 10.9 7.5 15 16.7 8.8L940 672.7c9.3-6.2 9.2-16.2 0-22.4l-125.7-83.9z\"/> </svg> </a> <div class=cp-progress> <div class=cp-progress-fill></div> </div> </div> <div class=\"cp-drop-down-menu cp-drop-down-menu-info\"> <div class=cp-audio-info> <span class=cp-audio-title></span> - <span class=cp-audio-artist></span> </div> <ul class=cp-playlist> </ul> </div> </c-player> ";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<svg class=cp-play-icon viewBox=\"0 0 1024 1024\" version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink width=200 height=200> <path d=\"M64.279417 58.009844c0-21.327148 10.62092-39.540533 29.218194-50.118799a56.858178 56.858178 0 0 1 58.265769 0.255926l779.336659 453.969682c18.341348 10.706229 28.748996 28.748996 28.748996 49.905527 0 21.113877-10.407648 39.156645-28.748996 49.820219L151.76338 1015.854735a56.943486 56.943486 0 0 1-58.265769 0.255926 56.303672 56.303672 0 0 1-29.218194-50.161453V58.009844z\"> </path> </svg>";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js??ref--1-3!./cplayer.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js??ref--1-3!./cplayer.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(true);
// imports


// module
exports.push([module.i, "c-player {\n  width: 300px;\n  display: inline-block;\n  position: relative; }\n  c-player .cp-mainbody {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    min-height: 50px;\n    min-width: 300px;\n    height: 50px;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    background-color: #fff;\n    position: relative;\n    z-index: 1;\n    -webkit-box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\n            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; }\n    c-player .cp-mainbody > * {\n      margin-right: 7px; }\n    c-player .cp-mainbody:hover {\n      height: 52px;\n      -webkit-transition: height ease 0.5s;\n      transition: height ease 0.5s; }\n      c-player .cp-mainbody:hover + .cp-drop-down-menu.cp-drop-down-menu-info {\n        height: 25px; }\n      c-player .cp-mainbody:hover .cp-progress {\n        display: block;\n        opacity: 1;\n        height: 2px; }\n  c-player .cp-drop-down-menu {\n    margin: 0px 2px;\n    display: block;\n    text-align: center;\n    font-size: 12px;\n    line-height: 25px;\n    background-color: rgba(255, 255, 255, 0.6);\n    position: relative;\n    z-index: 0;\n    height: 0px;\n    overflow: hidden;\n    -webkit-box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\n            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\n    -webkit-transition: height 0.25s ease 0.1s, -webkit-transform 0.25s ease 0.1s;\n    transition: height 0.25s ease 0.1s, -webkit-transform 0.25s ease 0.1s;\n    transition: transform 0.25s ease 0.1s, height 0.25s ease 0.1s;\n    transition: transform 0.25s ease 0.1s, height 0.25s ease 0.1s, -webkit-transform 0.25s ease 0.1s; }\n    c-player .cp-drop-down-menu span.cp-audio-title {\n      max-width: 170px;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n    c-player .cp-drop-down-menu span.cp-audio-artist {\n      opacity: 0.6;\n      max-width: 100px;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n    c-player .cp-drop-down-menu.cp-drop-down-menu-info .cp-playlist {\n      display: none; }\n    c-player .cp-drop-down-menu.cp-drop-down-menu-info:hover {\n      height: 25px; }\n    c-player .cp-drop-down-menu.cp-drop-down-menu-playlist .cp-audio-info {\n      display: none; }\n    c-player .cp-drop-down-menu.cp-drop-down-menu-playlist {\n      height: auto; }\n  c-player .cp-playlist {\n    margin: 0px;\n    padding: 0px;\n    list-style: none;\n    text-align: left; }\n    c-player .cp-playlist li:nth-of-type(even) {\n      background: rgba(255, 255, 255, 0.2); }\n    c-player .cp-playlist li {\n      padding: 0px 10px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      cursor: pointer; }\n      c-player .cp-playlist li .cp-play-icon {\n        display: inline-block;\n        width: 12px;\n        height: 12px;\n        vertical-align: text-top;\n        margin: 0px 5px 0 0;\n        fill: rgba(183, 28, 28, 0.8); }\n  c-player .cp-playlist-artist {\n    color: #000;\n    opacity: 0.46; }\n  c-player .cp-center-container {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    position: relative;\n    height: calc(100% - 2px); }\n    c-player .cp-center-container .cp-controls {\n      opacity: 0; }\n    c-player .cp-center-container:hover .cp-controls {\n      opacity: 1; }\n    c-player .cp-center-container:hover .cp-lyric {\n      opacity: 0; }\n  c-player .cp-controls {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    -webkit-transition: opacity 0.25s ease;\n    transition: opacity 0.25s ease; }\n    c-player .cp-controls > * {\n      margin-right: 15px; }\n  c-player .cp-lyric {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: absolute;\n    width: calc(100% - 20px);\n    height: calc(100% - 10px);\n    overflow: hidden;\n    margin: 5px 10px;\n    font-size: 14px;\n    -webkit-transition: opacity 0.25s ease;\n    transition: opacity 0.25s ease; }\n  c-player .cp-lyric-text {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    white-space: nowrap;\n    text-align: center;\n    color: #424242; }\n    c-player .cp-lyric-text .cp-lyric-text-sub {\n      display: block;\n      color: #757575;\n      font-size: 12px; }\n    c-player .cp-lyric-text .cp-lyric-text-zoomout {\n      font-size: 12px;\n      -webkit-transform: translateY(1px);\n              transform: translateY(1px);\n      display: inline-block;\n      margin: 0px 2px; }\n  c-player .cp-progress {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    margin: 0px;\n    height: 0px;\n    display: none;\n    opacity: 0.8;\n    overflow: hidden;\n    -webkit-transition: opacity 0.5s ease, height 0.5s ease;\n    transition: opacity 0.5s ease, height 0.5s ease; }\n    c-player .cp-progress .cp-progress-fill {\n      display: block;\n      height: 2px;\n      -webkit-transform: translateX(-100%);\n              transform: translateX(-100%);\n      background: #F44336; }\n  c-player .cp-poster {\n    width: 50px;\n    height: 50px;\n    background-repeat: repeat;\n    background-position: 50% 50%;\n    background-size: cover;\n    background-origin: padding-box;\n    background-attachment: scroll;\n    border-right: 1px solid #eee;\n    background-image: url(\"http://p1.music.126.net/xXXsTafARePvyQUDb6q9HQ==/3386495814644488.jpg?param=200y200\"); }\n  c-player .cp-play-icon {\n    width: 12.5px;\n    height: 12.5px;\n    display: block;\n    overflow: hidden;\n    position: relative; }\n    c-player .cp-play-icon .cp-play-icon-left {\n      height: 100%;\n      float: left;\n      background-color: #F44336;\n      width: 36%;\n      -webkit-transition: width 0.25s ease;\n      transition: width 0.25s ease;\n      overflow: hidden; }\n    c-player .cp-play-icon .cp-play-icon-right {\n      height: 100%;\n      float: right;\n      background-color: #F44336;\n      width: 36%;\n      -webkit-transition: width 0.25s ease;\n      transition: width 0.25s ease;\n      overflow: hidden; }\n    c-player .cp-play-icon .cp-play-icon-triangle-1 {\n      -webkit-transform: translate(0, -100%);\n              transform: translate(0, -100%); }\n    c-player .cp-play-icon .cp-play-icon-triangle-2 {\n      -webkit-transform: translate(0, 100%);\n              transform: translate(0, 100%); }\n    c-player .cp-play-icon .cp-play-icon-triangle-1,\n    c-player .cp-play-icon .cp-play-icon-triangle-2 {\n      position: absolute;\n      top: 0;\n      right: 0;\n      background-color: transparent;\n      width: 0;\n      height: 0;\n      border-right: 12.5px solid #fff;\n      border-top: 6.25px solid transparent;\n      border-bottom: 6.25px solid transparent;\n      -webkit-transition: -webkit-transform 0.25s ease;\n      transition: -webkit-transform 0.25s ease;\n      transition: transform 0.25s ease;\n      transition: transform 0.25s ease, -webkit-transform 0.25s ease; }\n    c-player .cp-play-icon.cp-play-icon-paused .cp-play-icon-left {\n      width: 50%; }\n    c-player .cp-play-icon.cp-play-icon-paused .cp-play-icon-right {\n      width: 50%; }\n    c-player .cp-play-icon.cp-play-icon-paused .cp-play-icon-triangle-1 {\n      -webkit-transform: translate(0, -50%);\n              transform: translate(0, -50%); }\n    c-player .cp-play-icon.cp-play-icon-paused .cp-play-icon-triangle-2 {\n      -webkit-transform: translate(0, 50%);\n              transform: translate(0, 50%); }\n    c-player .cp-play-icon.cp-play-icon-hover .cp-play-icon-left, c-player .cp-play-button:hover .cp-play-icon-left {\n      background-color: #B71C1C; }\n    c-player .cp-play-icon.cp-play-icon-hover .cp-play-icon-right, c-player .cp-play-button:hover .cp-play-icon-right {\n      background-color: #B71C1C; }\n  c-player .cp-play-button,\n  c-player .cp-volume-button,\n  c-player .cp-prev-button,\n  c-player .cp-list-button,\n  c-player .cp-mode-button,\n  c-player .cp-next-button {\n    display: inline-block;\n    width: 12.5px;\n    height: 12.5px;\n    cursor: pointer; }\n  c-player .cp-volume-button {\n    width: 20px;\n    position: relative; }\n  c-player .cp-list-button {\n    width: 17.5px;\n    height: 17.5px; }\n  c-player .cp-mode-button {\n    width: 19px;\n    height: 19px; }\n  c-player .cp-play-button {\n    height: 30px;\n    width: 30px;\n    border: #F44336 solid 1px;\n    border-radius: 50%; }\n    c-player .cp-play-button .cp-play-icon.cp-play-icon-paused {\n      margin: 8px; }\n    c-player .cp-play-button .cp-play-icon {\n      margin: 8px 7.5px; }\n    c-player .cp-play-button:hover {\n      border-color: #B71C1C; }\n  c-player .cp-icon, c-player .cp-prev-icon, c-player .cp-next-icon, c-player .cp-volume-icon, c-player .cp-random-icon, c-player .cp-single-icon, c-player .cp-loop-icon, c-player .cp-list-icon {\n    height: 12.5px;\n    width: 12.5px; }\n    c-player .cp-icon path, c-player .cp-prev-icon path, c-player .cp-next-icon path, c-player .cp-volume-icon path, c-player .cp-random-icon path, c-player .cp-single-icon path, c-player .cp-loop-icon path, c-player .cp-list-icon path {\n      fill: #F44336; }\n    c-player .cp-icon:hover path, c-player .cp-prev-icon:hover path, c-player .cp-next-icon:hover path, c-player .cp-volume-icon:hover path, c-player .cp-random-icon:hover path, c-player .cp-single-icon:hover path, c-player .cp-loop-icon:hover path, c-player .cp-list-icon:hover path {\n      fill: #B71C1C; }\n    c-player .cp-icon.cp-icon-dark path, c-player .cp-icon-dark.cp-prev-icon path, c-player .cp-icon-dark.cp-next-icon path, c-player .cp-icon-dark.cp-volume-icon path, c-player .cp-icon-dark.cp-random-icon path, c-player .cp-icon-dark.cp-single-icon path, c-player .cp-icon-dark.cp-loop-icon path, c-player .cp-icon-dark.cp-list-icon path {\n      fill: #757575; }\n    c-player .cp-icon.cp-icon-dark:hover path, c-player .cp-icon-dark.cp-prev-icon:hover path, c-player .cp-icon-dark.cp-next-icon:hover path, c-player .cp-icon-dark.cp-volume-icon:hover path, c-player .cp-icon-dark.cp-random-icon:hover path, c-player .cp-icon-dark.cp-single-icon:hover path, c-player .cp-icon-dark.cp-loop-icon:hover path, c-player .cp-icon-dark.cp-list-icon:hover path {\n      fill: #616161; }\n  c-player .cp-next-icon {\n    -webkit-transform: rotateZ(180deg);\n            transform: rotateZ(180deg); }\n  c-player .cp-volume-icon {\n    width: 20px; }\n  c-player .cp-random-icon,\n  c-player .cp-single-icon,\n  c-player .cp-loop-icon {\n    width: 19px;\n    height: 19px;\n    display: none; }\n  c-player .cp-mode-button[data-mode=listloop] .cp-loop-icon,\n  c-player .cp-mode-button[data-mode=singlecycle] .cp-single-icon,\n  c-player .cp-mode-button[data-mode=listrandom] .cp-random-icon {\n    display: block; }\n  c-player .cp-list-icon {\n    width: 17.5px;\n    height: 17.5px; }\n  c-player .cp-volume-container {\n    position: absolute;\n    left: 50%;\n    top: -7px;\n    height: 25px;\n    width: 120px;\n    -webkit-transform: translateX(-50%) translateY(-120%);\n            transform: translateX(-50%) translateY(-120%);\n    z-index: 1;\n    visibility: hidden;\n    -webkit-box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\n            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; }\n    c-player .cp-volume-container.cp-volume-container-show {\n      visibility: visible; }\n    c-player .cp-volume-container:hover {\n      visibility: visible; }\n    c-player .cp-volume-container:before {\n      content: '';\n      width: 0px;\n      height: 0px;\n      display: inline-block;\n      border-top: 10px solid #fff;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      position: absolute;\n      bottom: 0px;\n      left: 50%;\n      -webkit-transform: translate(-50%, 100%);\n              transform: translate(-50%, 100%); }\n    c-player .cp-volume-container:after {\n      content: '';\n      width: 14.14214px;\n      height: 14.14214px;\n      display: inline-block;\n      position: absolute;\n      bottom: 0px;\n      left: 50%;\n      -webkit-transform: translate(-50%, 50%) rotate(45deg);\n              transform: translate(-50%, 50%) rotate(45deg);\n      -webkit-box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\n              box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; }\n    c-player .cp-volume-container > div {\n      width: 100%;\n      height: 100%;\n      background: #fff;\n      position: relative;\n      z-index: 1;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n  c-player .cp-volume-controller {\n    display: inline-block;\n    height: 10px;\n    width: 100px;\n    border-radius: 50px;\n    background: #BDBDBD;\n    line-height: 10px;\n    position: relative; }\n    c-player .cp-volume-controller .cp-volume-fill {\n      display: inline-block;\n      height: 100%;\n      width: 100%;\n      border-radius: 50px;\n      background: #616161; }\n    c-player .cp-volume-controller .cp-volume-controller-button {\n      height: 15px;\n      width: 15px;\n      position: absolute;\n      right: 0px;\n      top: -2.5px;\n      display: inline-block;\n      border-radius: 50%;\n      border: 2px solid #fff;\n      background: #757575;\n      -webkit-transform: translateX(50%);\n              transform: translateX(50%);\n      -webkit-box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\n              box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; }\n      c-player .cp-volume-controller .cp-volume-controller-button:hover {\n        background: #616161; }\n  c-player svg {\n    vertical-align: top; }\n  c-player *,\n  c-player *::before,\n  c-player *::after {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n", "", {"version":3,"sources":["/home/corps/cPlayer/src/scss/cplayer.scss"],"names":[],"mappings":"AAkCA;EACI,aAjCkB;EAkClB,sBAAqB;EACrB,mBAAkB,EAybrB;EA5bD;IAKQ,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,0BAAmB;QAAnB,uBAAmB;YAAnB,oBAAmB;IACnB,+BAAmB;IAAnB,8BAAmB;QAAnB,wBAAmB;YAAnB,oBAAmB;IACzB,iBAzCoB;IA0Cd,iBAzCc;IA0Cd,aA3Cc;IA4Cd,oBAAe;QAAf,gBAAe;IACf,uBApCc;IAqCd,mBAAkB;IAClB,WAAU;IA1BV,6FAAoF;YAApF,qFAAoF,EA2CvF;IA/BL;MAiBY,kBACJ,EAAE;IAlBV;MAoBY,aAA4B;MAtCpC,qCAuC4C;MAvC5C,6BAuC4C,EASvC;MA9BT;QAuBgB,aAAY,EACf;MAxBb;QA0BgB,eAAa;QACb,WAAU;QACV,YAAW,EACd;EA7Bb;IAmCQ,gBADY;IAEZ,eAAc;IACd,mBAAkB;IAClB,gBAAe;IACf,kBANiB;IAOjB,2CAhEc;IAiEd,mBAAkB;IAClB,WAAU;IACV,YAAW;IACX,iBAAgB;IAxDhB,6FAAoF;YAApF,qFAAoF;IANxF,8EAgEyE;IAhEzE,sEAgEyE;IAhEzE,8DAgEyE;IAhEzE,iGAgEyE,EAwBxE;IAtEL;MAgDY,iBAAgB;MAChB,iBAAgB;MAChB,wBAAuB,EAC1B;IAnDT;MAqDY,aAAY;MACZ,iBAAgB;MAChB,iBAAgB;MAChB,wBAAuB,EAC1B;IAzDT;MA2DY,cAAa,EAChB;IA5DT;MA8DY,aAAY,EACf;IA/DT;MAiEY,cAAa,EAChB;IAlET;MAoEY,aAAY,EACf;EArET;IAwEQ,YAAW;IACX,aAAY;IACZ,iBAAgB;IAChB,iBAAgB,EAmBnB;IA9FL;MA6EY,qCAAoC,EACvC;IA9ET;MAgFY,kBAAiB;MACjB,iBAAgB;MAChB,wBAAuB;MACvB,oBAAmB;MASnB,gBAAe,EAClB;MA7FT;QAqFgB,sBAAqB;QACrB,YAAW;QACX,aAAY;QACZ,yBAAwB;QACxB,oBAAmB;QACnB,6BAvHU,EAwHb;EA3Fb;IAgGQ,YAAW;IACX,cAAa,EAChB;EAlGL;IAoGQ,oBAAY;QAAZ,qBAAY;YAAZ,aAAY;IACZ,mBAAkB;IAClB,yBAAwB,EAY3B;IAlHL;MAwGY,WAAU,EACb;IAzGT;MA4GgB,WAAU,EACb;IA7Gb;MA+GgB,WAAU,EACb;EAhHb;IAoHQ,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,yBAAuB;QAAvB,sBAAuB;YAAvB,wBAAuB;IACvB,0BAAmB;QAAnB,uBAAmB;YAAnB,oBAAmB;IACnB,mBAAkB;IAClB,YAAW;IACX,aAAY;IACZ,WAAU;IA5Id,uCA6I0C;IA7I1C,+BA6I0C,EAIzC;IA/HL;MA6HY,mBAAkB,EACrB;EA9HT;IAmIQ,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,0BAAmB;QAAnB,uBAAmB;YAAnB,oBAAmB;IACnB,mBAAkB;IAClB,yBAAuC;IACvC,0BAAuC;IACvC,iBAAgB;IAChB,iBARkB;IASlB,gBAAe;IA5JnB,uCA6J0C;IA7J1C,+BA6J0C,EACzC;EA5IL;IA8IQ,oBAAY;QAAZ,qBAAY;YAAZ,aAAY;IACZ,oBAAmB;IACnB,mBAAkB;IAClB,eA1KW,EAsLd;IA7JL;MAmJY,eAAc;MACd,eA/KS;MAgLT,gBAAe,EAClB;IAtJT;MAwJY,gBAAe;MACf,mCAA0B;cAA1B,2BAA0B;MAC1B,sBAAqB;MACrB,gBAAe,EAClB;EA5JT;IA+JQ,8BAAgB;QAAhB,iBAAgB;IAChB,YAAW;IACX,YAAW;IACX,cAAa;IACb,aAAY;IACZ,iBAAgB;IAtLpB,wDAuL2D;IAvL3D,gDAuL2D,EAO1D;IA5KL;MAuKY,eAAc;MACd,YAAW;MACX,qCAA4B;cAA5B,6BAA4B;MAC5B,oBAxMU,EAyMb;EA3KT;IA8KQ,YA/Mc;IAgNd,aAhNc;IAiNd,0BAAyB;IACzB,6BAA4B;IAC5B,uBAAsB;IACtB,+BAA8B;IAC9B,8BAA6B;IAC7B,6BAA4B;IAC5B,6GAA4G,EAC/G;EAvLL;IA0LQ,cADa;IAEb,eAFa;IAGb,eAAc;IACd,iBAAgB;IAChB,mBAAkB,EA0DrB;IAxPL;MAgMY,aAAY;MACZ,YAAW;MACX,0BAhOU;MAiOV,WAAU;MArNlB,qCAsN4C;MAtN5C,6BAsN4C;MACpC,iBAAgB,EACnB;IAtMT;MAwMY,aAAY;MACZ,aAAY;MACZ,0BAxOU;MAyOV,WAAU;MA7NlB,qCA8N4C;MA9N5C,6BA8N4C;MACpC,iBAAgB,EACnB;IA9MT;MAgNY,uCAA8B;cAA9B,+BAA8B,EACjC;IAjNT;MAmNY,sCAA6B;cAA7B,8BAA6B,EAChC;IApNT;;MAuNY,mBAAkB;MAClB,OAAM;MACN,SAAQ;MACR,8BAA6B;MAC7B,SAAQ;MACR,UAAS;MACT,gCArPU;MAsPV,qCAAuC;MACvC,wCAA0C;MAjPlD,iDAkPgD;MAlPhD,yCAkPgD;MAlPhD,iCAkPgD;MAlPhD,+DAkPgD,EAC3C;IAjOT;MAoOgB,WAAU,EACb;IArOb;MAuOgB,WAAU,EACb;IAxOb;MA0OgB,sCAA6B;cAA7B,8BAA6B,EAChC;IA3Ob;MA6OgB,qCAA4B;cAA5B,6BAA4B,EAC/B;IA9Ob;MAkPgB,0BA/QU,EAgRb;IAnPb;MAqPgB,0BAlRU,EAmRb;EAtPb;;;;;;IA+PQ,sBAAqB;IAErB,cADa;IAEb,eAFa;IAGb,gBAAe,EAClB;EApQL;IAsQQ,YAAW;IACX,mBAAkB,EACrB;EAxQL;IA2QQ,cADa;IAEb,eAFa,EAGhB;EA7QL;IAgRQ,YADW;IAEX,aAFW,EAGd;EAlRL;IAqRQ,aADW;IAEX,YAFW;IAGX,0BAA+B;IAC/B,mBAAkB,EAWrB;IAnSL;MA0RY,YAAW,EACd;IA3RT;MA6RY,kBAAiB,EACpB;IA9RT;MAgSY,sBA7Tc,EA+TjB;EAlST;IAsSQ,eADa;IAEb,cAFa,EAqBhB;IA1TL;MAySY,cAvUU,EAwUb;IA1ST;MA6SgB,cA1UU,EA2Ub;IA9Sb;MAkTgB,cA7UK,EA8UR;IAnTb;MAsToB,cAhVK,EAiVR;EAvTjB;IAgUQ,mCAA0B;YAA1B,2BAA0B,EAC7B;EAjUL;IAoUQ,YAAW,EACd;EArUL;;;IA2UQ,YADW;IAEX,aAFW;IAGX,cAAa,EAChB;EA9UL;;;IAkVQ,eAAc,EACjB;EAnVL;IAuVQ,cADa;IAEb,eAFa,EAGhB;EAzVL;IA6VQ,mBAAkB;IAClB,UAAS;IACT,UAAS;IACT,aALa;IAMb,aALa;IAMb,sDAA6C;YAA7C,8CAA6C;IAC7C,WAAU;IACV,mBAAkB;IAhXlB,6FAAoF;YAApF,qFAAoF,EA4ZvF;IAhZL;MAuWY,oBAAmB,EACtB;IAxWT;MA0WY,oBAAmB,EACtB;IA3WT;MA8WY,YAAW;MACX,WAAU;MACV,YAAW;MACX,sBAAqB;MACrB,4BA1YU;MA2YV,oCAAoC;MACpC,qCAAqC;MACrC,mBAAkB;MAClB,YAAW;MACX,UAAS;MACT,yCAA+B;cAA/B,iCAA+B,EAClC;IAzXT;MA4XY,YAAW;MACX,kBAFqB;MAGrB,mBAHqB;MAIrB,sBAAqB;MACrB,mBAAkB;MAClB,YAAW;MACX,UAAS;MACT,sDAA4C;cAA5C,8CAA4C;MA/YhD,6FAAoF;cAApF,qFAAoF,EAiZnF;IArYT;MAuYY,YAAW;MACX,aAAY;MACZ,iBAjaU;MAkaV,mBAAkB;MAClB,WAAU;MACV,qBAAa;MAAb,qBAAa;MAAb,cAAa;MACb,yBAAuB;UAAvB,sBAAuB;cAAvB,wBAAuB;MACvB,0BAAmB;UAAnB,uBAAmB;cAAnB,oBAAmB,EACtB;EA/YT;IAkZQ,sBAAqB;IAGrB,aAFa;IAGb,aAFa;IAGb,oBAAyB;IACzB,oBApbkB;IAqblB,kBANa;IAOb,mBAAkB,EAyBrB;IAnbL;MA4ZY,sBAAqB;MACrB,aAAY;MACZ,YAAW;MACX,oBAAyB;MACzB,oBA1ba,EA2bhB;IAjaT;MAoaY,aADW;MAEX,YAFW;MAGX,mBAAkB;MAClB,WAAU;MACV,YAAW;MACX,sBAAqB;MACrB,mBAAkB;MAClB,uBAncU;MAocV,oBAvcS;MAwcT,mCAA0B;cAA1B,2BAA0B;MAzb9B,6FAAoF;cAApF,qFAAoF,EA8bnF;MAlbT;QAgbgB,oBA1cS,EA2cZ;EAjbb;IAqbQ,oBAAmB,EACtB;EAtbL;;;IA0bE,+BAAsB;YAAtB,uBAAsB,EACtB","file":"cplayer.scss","sourcesContent":["$name-prefix: \"cp-\";\r\n$mainbody-height: 50px;\r\n$mainbody-width: 300px;\r\n\r\n$primaryColor: #F44336;\r\n$primaryDarkColor: #B71C1C;\r\n$accentLightColor: #BDBDBD;\r\n$accentColor: #757575;\r\n$accentDarkColor: #616161;\r\n$TextColor: #424242;\r\n$backgroundColor: #fff;\r\n\r\n$enable-transitions: true;\r\n\r\n@mixin transition($transition...) {\r\n  @if $enable-transitions {\r\n    transition: $transition;\r\n  }\r\n}\r\n\r\n@mixin box_shadow ($level) {\r\n    @if $level == 1 {\r\n        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;\r\n    } @else if $level == 2 {\r\n        box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px;\r\n    } @else if $level == 3 {\r\n        box-shadow: rgba(0, 0, 0, 0.188235) 0px 10px 30px, rgba(0, 0, 0, 0.227451) 0px 6px 10px;\r\n    } @else if $level == 4 {\r\n        box-shadow: rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px;\r\n    } @else if $level == 5 {\r\n        box-shadow: rgba(0, 0, 0, 0.298039) 0px 19px 60px, rgba(0, 0, 0, 0.219608) 0px 15px 20px;\r\n    }\r\n}\r\n\r\nc-player {\r\n    width: $mainbody-width;\r\n    display: inline-block;\r\n    position: relative;\r\n\t.#{$name-prefix}mainbody {\r\n        display: flex;\r\n        align-items: center;\r\n        flex-direction: row;\r\n\t\tmin-height: $mainbody-height;\r\n        min-width: $mainbody-width;\r\n        height: $mainbody-height;\r\n        flex-wrap: wrap;\r\n        background-color: $backgroundColor;\r\n        position: relative;\r\n        z-index: 1;\r\n        @include box_shadow(1);\r\n        > * {\r\n            margin-right: 7px\r\n        }\r\n        &:hover{\r\n            height: $mainbody-height+2px;\r\n            @include transition(height ease 0.5s);\r\n            & + .#{$name-prefix}drop-down-menu.#{$name-prefix}drop-down-menu-info {\r\n                height: 25px;\r\n            }\r\n            .#{$name-prefix}progress {\r\n                display:block;\r\n                opacity: 1;\r\n                height: 2px;\r\n            }\r\n        }\r\n    }\r\n    .#{$name-prefix}drop-down-menu {\r\n        $lineheight: 25px;\r\n        $margin: 2px;\r\n        margin: 0px $margin;\r\n        display: block;\r\n        text-align: center;\r\n        font-size: 12px;\r\n        line-height: $lineheight;\r\n        background-color: rgba($backgroundColor, 0.6);\r\n        position: relative;\r\n        z-index: 0;\r\n        height: 0px;\r\n        overflow: hidden;\r\n        @include box_shadow(1);\r\n        @include transition(transform 0.25s ease 0.1s, height 0.25s ease 0.1s);\r\n        span.#{$name-prefix}audio-title {\r\n            max-width: 170px;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n        }\r\n        span.#{$name-prefix}audio-artist {\r\n            opacity: 0.6;\r\n            max-width: 100px;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n        }\r\n        &.#{$name-prefix}drop-down-menu-info .#{$name-prefix}playlist {\r\n            display: none;\r\n        }\r\n        &.#{$name-prefix}drop-down-menu-info:hover {\r\n            height: 25px;\r\n        }\r\n        &.#{$name-prefix}drop-down-menu-playlist .#{$name-prefix}audio-info {\r\n            display: none;\r\n        }\r\n        &.#{$name-prefix}drop-down-menu-playlist {\r\n            height: auto;\r\n        }\r\n    }\r\n    .#{$name-prefix}playlist {\r\n        margin: 0px;\r\n        padding: 0px;\r\n        list-style: none;\r\n        text-align: left;\r\n        li:nth-of-type(even){\r\n            background: rgba(255, 255, 255, 0.2);\r\n        }\r\n        li {\r\n            padding: 0px 10px;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n            white-space: nowrap;\r\n            .#{$name-prefix}play-icon {\r\n                display: inline-block;\r\n                width: 12px;\r\n                height: 12px;\r\n                vertical-align: text-top;\r\n                margin: 0px 5px 0 0;\r\n                fill: rgba($primaryDarkColor, 0.8);\r\n            }\r\n            cursor: pointer;\r\n        }\r\n    }\r\n    .#{$name-prefix}playlist-artist {\r\n        color: #000;\r\n        opacity: 0.46;\r\n    }\r\n    .#{$name-prefix}center-container {\r\n        flex-grow: 1;\r\n        position: relative;\r\n        height: calc(100% - 2px);\r\n        .#{$name-prefix}controls {\r\n            opacity: 0;\r\n        }\r\n        &:hover {\r\n            .#{$name-prefix}controls {\r\n                opacity: 1;\r\n            }\r\n            .#{$name-prefix}lyric {\r\n                opacity: 0;\r\n            }\r\n        }\r\n    }\r\n    .#{$name-prefix}controls {\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n        z-index: 1;\r\n        @include transition(opacity 0.25s ease);\r\n        > * {\r\n            margin-right: 15px;\r\n        }\r\n    }\r\n    .#{$name-prefix}lyric {\r\n        $margin-left: 10px;\r\n        $margin-top: 5px;\r\n        display: flex;\r\n        align-items: center;\r\n        position: absolute;\r\n        width: calc(100% - #{$margin-left * 2});\r\n        height: calc(100% - #{$margin-top * 2});\r\n        overflow: hidden;\r\n        margin: $margin-top $margin-left;\r\n        font-size: 14px;\r\n        @include transition(opacity 0.25s ease);\r\n    }\r\n    .#{$name-prefix}lyric-text {\r\n        flex-grow: 1;\r\n        white-space: nowrap;\r\n        text-align: center;\r\n        color: $TextColor;\r\n        .#{$name-prefix}lyric-text-sub {\r\n            display: block;\r\n            color: $accentColor;\r\n            font-size: 12px;\r\n        }\r\n        .#{$name-prefix}lyric-text-zoomout {\r\n            font-size: 12px;\r\n            transform: translateY(1px);\r\n            display: inline-block;\r\n            margin: 0px 2px;\r\n        }\r\n    }\r\n    .#{$name-prefix}progress {\r\n        flex-basis: 100%;\r\n        margin: 0px;\r\n        height: 0px;\r\n        display: none;\r\n        opacity: 0.8;\r\n        overflow: hidden;\r\n        @include transition(opacity 0.5s ease, height 0.5s ease);\r\n        .#{$name-prefix}progress-fill {\r\n            display: block;\r\n            height: 2px;\r\n            transform: translateX(-100%);\r\n            background: $primaryColor;\r\n        }\r\n    }\r\n    .#{$name-prefix}poster {\r\n        width: $mainbody-height;\r\n        height: $mainbody-height;\r\n        background-repeat: repeat;\r\n        background-position: 50% 50%;\r\n        background-size: cover;\r\n        background-origin: padding-box;\r\n        background-attachment: scroll;\r\n        border-right: 1px solid #eee;\r\n        background-image: url(\"http://p1.music.126.net/xXXsTafARePvyQUDb6q9HQ==/3386495814644488.jpg?param=200y200\")\r\n    }\r\n    .#{$name-prefix}play-icon {\r\n        $size: 12.5px;\r\n        width:$size;\r\n        height:$size;\r\n        display: block;\r\n        overflow: hidden;\r\n        position: relative;\r\n        .#{$name-prefix}play-icon-left {\r\n            height: 100%;\r\n            float: left;\r\n            background-color: $primaryColor;\r\n            width: 36%;\r\n            @include transition(width 0.25s ease);\r\n            overflow: hidden;\r\n        }\r\n        .#{$name-prefix}play-icon-right {\r\n            height: 100%;\r\n            float: right;\r\n            background-color: $primaryColor;\r\n            width: 36%;\r\n            @include transition(width 0.25s ease);\r\n            overflow: hidden;\r\n        }\r\n        .#{$name-prefix}play-icon-triangle-1 {\r\n            transform: translate(0, -100%)\r\n        }\r\n        .#{$name-prefix}play-icon-triangle-2 {\r\n            transform: translate(0, 100%)\r\n        }\r\n        .#{$name-prefix}play-icon-triangle-1,\r\n        .#{$name-prefix}play-icon-triangle-2 {\r\n            position: absolute;\r\n            top: 0;\r\n            right: 0;\r\n            background-color: transparent;\r\n            width: 0;\r\n            height: 0;\r\n            border-right: $size solid $backgroundColor;\r\n            border-top: $size / 2 solid transparent;\r\n            border-bottom: $size / 2 solid transparent;\r\n            @include transition(transform 0.25s ease);\r\n        }\r\n        &.#{$name-prefix}play-icon-paused {\r\n            .#{$name-prefix}play-icon-left {\r\n                width: 50%;\r\n            }\r\n            .#{$name-prefix}play-icon-right {\r\n                width: 50%;\r\n            }\r\n            .#{$name-prefix}play-icon-triangle-1 {\r\n                transform: translate(0, -50%);\r\n            }\r\n            .#{$name-prefix}play-icon-triangle-2 {\r\n                transform: translate(0, 50%);\r\n            }\r\n        }\r\n        &.#{$name-prefix}play-icon-hover {\r\n            .#{$name-prefix}play-icon-left {\r\n                background-color: $primaryDarkColor;\r\n            }\r\n            .#{$name-prefix}play-icon-right {\r\n                background-color: $primaryDarkColor;\r\n            }\r\n        }\r\n    }\r\n    .#{$name-prefix}play-button,\r\n    .#{$name-prefix}volume-button,\r\n    .#{$name-prefix}prev-button,\r\n    .#{$name-prefix}list-button,\r\n    .#{$name-prefix}mode-button,\r\n    .#{$name-prefix}next-button {\r\n        display: inline-block;\r\n        $size: 12.5px;\r\n        width: $size;\r\n        height: $size;\r\n        cursor: pointer;\r\n    }\r\n    .#{$name-prefix}volume-button {\r\n        width: 20px;\r\n        position: relative;\r\n    }\r\n    .#{$name-prefix}list-button {\r\n        $size: 17.5px;\r\n        width: $size;\r\n        height: $size;\r\n    }\r\n    .#{$name-prefix}mode-button {\r\n        $size: 19px;\r\n        width: $size;\r\n        height: $size;\r\n    }\r\n    .#{$name-prefix}play-button {\r\n        $size: 30px;\r\n        height: $size;\r\n        width: $size;\r\n        border: $primaryColor solid 1px;\r\n        border-radius: 50%;\r\n        .#{$name-prefix}play-icon.#{$name-prefix}play-icon-paused {\r\n            margin: 8px;\r\n        }\r\n        .#{$name-prefix}play-icon {\r\n            margin: 8px 7.5px;\r\n        }\r\n        &:hover {\r\n            border-color: $primaryDarkColor;\r\n            @extend .#{$name-prefix}play-icon.#{$name-prefix}play-icon-hover;\r\n        }\r\n    }\r\n    .#{$name-prefix}icon {\r\n        $size: 12.5px;\r\n        height: $size;\r\n        width: $size;\r\n        path {\r\n            fill: $primaryColor;\r\n        }\r\n        &:hover {\r\n            path {\r\n                fill: $primaryDarkColor;\r\n            }\r\n        }\r\n        &.#{$name-prefix}icon-dark {\r\n            path {\r\n                fill: $accentColor;\r\n            }\r\n            &:hover {\r\n                path {\r\n                    fill: $accentDarkColor;\r\n                }\r\n            }\r\n        }\r\n    }\r\n    .#{$name-prefix}prev-icon {\r\n        @extend .#{$name-prefix}icon;\r\n    }\r\n    .#{$name-prefix}next-icon {\r\n        @extend .#{$name-prefix}icon;\r\n        transform: rotateZ(180deg);\r\n    }\r\n    .#{$name-prefix}volume-icon {\r\n        @extend .#{$name-prefix}icon;\r\n        width: 20px;\r\n    }\r\n    .#{$name-prefix}random-icon,\r\n    .#{$name-prefix}single-icon,\r\n    .#{$name-prefix}loop-icon {\r\n        @extend .#{$name-prefix}icon;\r\n        $size: 19px;\r\n        width: $size;\r\n        height: $size;\r\n        display: none;\r\n    }\r\n    .#{$name-prefix}mode-button[data-mode=listloop] .#{$name-prefix}loop-icon,\r\n    .#{$name-prefix}mode-button[data-mode=singlecycle] .#{$name-prefix}single-icon,\r\n    .#{$name-prefix}mode-button[data-mode=listrandom] .#{$name-prefix}random-icon {\r\n        display: block;\r\n    }\r\n    .#{$name-prefix}list-icon {\r\n        @extend .#{$name-prefix}icon;\r\n        $size: 17.5px;\r\n        width: $size;\r\n        height: $size;\r\n    }\r\n    .#{$name-prefix}volume-container {\r\n        $height: 25px;\r\n        $width: 120px;\r\n        position: absolute;\r\n        left: 50%;\r\n        top: -7px;\r\n        height: $height;\r\n        width: $width;\r\n        transform: translateX(-50%) translateY(-120%);\r\n        z-index: 1;\r\n        visibility: hidden;\r\n        @include box_shadow(1);\r\n        &.#{$name-prefix}volume-container-show {\r\n            visibility: visible;\r\n        }\r\n        &:hover {\r\n            visibility: visible;\r\n        }\r\n        &:before {\r\n            $size: 10px;\r\n            content: '';\r\n            width: 0px;\r\n            height: 0px;\r\n            display: inline-block;\r\n            border-top: $size solid $backgroundColor;\r\n            border-left: $size solid transparent;\r\n            border-right: $size solid transparent;\r\n            position: absolute;\r\n            bottom: 0px;\r\n            left: 50%;\r\n            transform: translate(-50%,100%);\r\n        }\r\n        &:after {\r\n            $size: 14.142135624px;\r\n            content: '';\r\n            width: $size;\r\n            height: $size;\r\n            display: inline-block;\r\n            position: absolute;\r\n            bottom: 0px;\r\n            left: 50%;\r\n            transform: translate(-50%,50%) rotate(45deg);\r\n            @include box_shadow(1);\r\n        }\r\n        > div {\r\n            width: 100%;\r\n            height: 100%;\r\n            background: $backgroundColor;\r\n            position: relative;\r\n            z-index: 1;\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n        }\r\n    }\r\n    .#{$name-prefix}volume-controller {\r\n        display: inline-block;\r\n        $height: 10px;\r\n        $width: 100px;\r\n        height: $height;\r\n        width: $width;\r\n        border-radius: $width / 2;\r\n        background: $accentLightColor;\r\n        line-height: $height;\r\n        position: relative;\r\n        .#{$name-prefix}volume-fill {\r\n            display: inline-block;\r\n            height: 100%;\r\n            width: 100%;\r\n            border-radius: $width / 2;\r\n            background: $accentDarkColor;\r\n        }\r\n        .#{$name-prefix}volume-controller-button {\r\n            $size: 15px;\r\n            height: $size;\r\n            width: $size;\r\n            position: absolute;\r\n            right: 0px;\r\n            top: -2.5px;\r\n            display: inline-block;\r\n            border-radius: 50%;\r\n            border: 2px solid $backgroundColor;\r\n            background: $accentColor;\r\n            transform: translateX(50%);\r\n            @include box_shadow(1);\r\n            &:hover {\r\n                background: $accentDarkColor;\r\n            }\r\n        }\r\n    }\r\n    svg {\r\n        vertical-align: top;\r\n    }\r\n\t*,\r\n\t*::before,\r\n\t*::after {\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Lyric = function () {
    function Lyric(items, raw) {
        _classCallCheck(this, Lyric);

        this.items = [];
        this.items = items;
        this.raw = raw;
    }

    _createClass(Lyric, [{
        key: "getLyric",
        value: function getLyric(time) {
            return this.items.reduce(function (p, c) {
                if (c.time < time && (!p || p.time < c.time)) {
                    return c;
                }
                return p;
            }, undefined);
        }
    }, {
        key: "getNextLyric",
        value: function getNextLyric(time) {
            return this.items.reduce(function (p, c) {
                if (c.time > time && (!p || p.time > c.time)) {
                    return c;
                }
                return p;
            }, undefined);
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.raw;
        }
    }]);

    return Lyric;
}();

exports.Lyric = Lyric;
function decodeLyricStr(lyricStr, options) {
    if (typeof lyricStr !== 'string') return lyricStr;
    var lyric = [];
    lyricStr.replace(/\n+/gi, "\n").trim().split("\n").forEach(function (lyricStrItem) {
        lyric.push.apply(lyric, _toConsumableArray(decodeLyricStrItem(lyricStrItem)));
    });
    return new Lyric(lyric, lyricStr);
}
exports.decodeLyricStr = decodeLyricStr;
function decodeLyricStrItem(lyricItemStr) {
    var res = [];
    var timestr = lyricItemStr.match(/\[\d+\:[\.\d]+\]/gi);
    var word = /(?:\[\d+\:[\.\d]+\])*(.*)/gi.exec(lyricItemStr)[1].trim();
    if (timestr && word) {
        timestr.forEach(function (timestr) {
            var z = /\[(\d+)\:([\.\d]+)\]/gi.exec(timestr.trim());
            var time = parseInt(z[1]) * 60 * 1000 + parseFloat(z[2]) * 1000;
            res.push({
                time: time,
                word: word
            });
        });
    }
    return res;
}
exports.decodeLyricStrItem = decodeLyricStrItem;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var listloop_1 = __webpack_require__(0);

var singlecyclePlaymode = function () {
    function singlecyclePlaymode() {
        var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, singlecyclePlaymode);

        this.__playlist = [];
        this.__playlist = playlist;
        this.to(point);
    }

    _createClass(singlecyclePlaymode, [{
        key: "next",
        value: function next() {
            return this.__playlist[this.point];
        }
    }, {
        key: "prev",
        value: function prev() {
            return this.__playlist[this.point];
        }
    }, {
        key: "now",
        value: function now() {
            return this.__playlist[this.point];
        }
    }, {
        key: "nowpoint",
        value: function nowpoint() {
            return this.point;
        }
    }, {
        key: "to",
        value: function to(point) {
            this.point = Math.max(0, Math.min(point, this.__playlist.length - 1));
        }
    }, {
        key: "addMusic",
        value: function addMusic(item) {
            this.__playlist.push(item);
        }
    }, {
        key: "removeMusic",
        value: function removeMusic(item) {
            var _this = this;

            var _listloop_1$baseRemov = listloop_1.baseRemoveMusic(item, this.__playlist, this.point, function (point) {
                return Math.max(0, Math.min(point, _this.__playlist.length - 1));
            }),
                playlist = _listloop_1$baseRemov.playlist,
                nowpoint = _listloop_1$baseRemov.nowpoint,
                needupdate = _listloop_1$baseRemov.needupdate;

            this.__playlist = playlist;
            this.point = nowpoint;
            return needupdate;
        }
    }, {
        key: "playlist",
        get: function get() {
            return this.__playlist;
        }
    }]);

    return singlecyclePlaymode;
}();

exports.singlecyclePlaymode = singlecyclePlaymode;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var listloop_1 = __webpack_require__(0);

var listrandomPlaymode = function () {
    function listrandomPlaymode() {
        var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, listrandomPlaymode);

        this.__playlist = [];
        this.point = 0;
        this.__playlist = playlist;
        this.to(point);
    }

    _createClass(listrandomPlaymode, [{
        key: "next",
        value: function next() {
            this.point = this.randomPoint();
            return this.__playlist[this.point];
        }
    }, {
        key: "prev",
        value: function prev() {
            this.point = this.randomPoint();
            return this.__playlist[this.point];
        }
    }, {
        key: "now",
        value: function now() {
            return this.__playlist[this.point];
        }
    }, {
        key: "nowpoint",
        value: function nowpoint() {
            return this.point;
        }
    }, {
        key: "to",
        value: function to(point) {
            this.point = Math.max(0, Math.min(point, this.__playlist.length - 1));
        }
    }, {
        key: "addMusic",
        value: function addMusic(item) {
            this.__playlist.push(item);
        }
    }, {
        key: "randomPoint",
        value: function randomPoint() {
            if (this.__playlist.length > 1) {
                var random = Math.floor(this.__playlist.length * Math.random());
                if (random === this.point) {
                    return this.randomPoint();
                } else {
                    return random;
                }
            } else return 0;
        }
    }, {
        key: "removeMusic",
        value: function removeMusic(item) {
            var _this = this;

            var _listloop_1$baseRemov = listloop_1.baseRemoveMusic(item, this.__playlist, this.point, function (point) {
                return _this.randomPoint();
            }),
                playlist = _listloop_1$baseRemov.playlist,
                nowpoint = _listloop_1$baseRemov.nowpoint,
                needupdate = _listloop_1$baseRemov.needupdate;

            this.__playlist = playlist;
            this.point = nowpoint;
            return needupdate;
        }
    }, {
        key: "playlist",
        get: function get() {
            return this.__playlist;
        }
    }]);

    return listrandomPlaymode;
}();

exports.listrandomPlaymode = listrandomPlaymode;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bf7a712d59762d46839e35e5358bf29b.mp3";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "801422833716a4f0f96ff6dff1f77dfe.jpg";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8af423669c27d265bb129d04a927044f.mp3";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "63830807b2600b05fb2b41e6b4f58606.png";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0a15e6d713e188edfa6f16810f531985.mp3";

/***/ })
/******/ ]);
//# sourceMappingURL=cplayerexample.js.map