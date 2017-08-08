/*
 	cPlayer
    Author	Corps

	I am the super Corps!
 */
///
import { cEmitter } from "modules/cEmitter.class";
import { cLyric } from "modules/cLyric.function";
import { SVG } from "modules/SVG.object";
import { AddEventListener, cOption, cList, __LYRIC__ } from "modules/c.interface";
import { cBase } from "modules/cBase.class";
import { cContext } from "modules/cContext.class";
import "../scss/cplayer.scss";

//To prefix 
declare var __CPLAYER_VERSION__: string;

class cPlayer extends cEmitter {
	static version: string;
	protected dragging: {
		contain: boolean;
		target: HTMLElement | undefined;
	};
	protected now: number;
	CBASE: cBase;
	protected options: cOption;
	protected transLock: boolean;
	music: HTMLAudioElement;
	protected __LIST__: {
		[propName: string]: HTMLElement;
		img: HTMLImageElement;
	}
	protected __LYRIC__: __LYRIC__;
	constructor(options: cOption) {
		const EVENTS: { [propName: string]: ((e?: any) => void)[] } = {
			"play": [], //When Music be played, Emit.
			"pause": [], //When Music be paused, Emit.
			"volumechange": [],
			"timeupdate": [],
			"canplaythrough": [],
			"ended": [],
			//All the above are binded on AUDIO Elements,
			//The following items are Function's callback function.
			"toggle": [],
			"previous": [],
			"next": [],
			"changeList": [],
			"changeLyric": [],
			"slideList": [],
			"slideLyric": [],
			"clickLyricPower": [],
			"clickListPower": [],
			"clickVolumePower": [],
		};
		super(EVENTS);
		this.transLock = false;
		//this = new cEmitter(EVENTS);
		//this.on = (eventName,func)=>this.on(eventName,func);
		/*
		 *  參數处理,合并默认参数与定义參數
		 */
		const DEFAULTS = {
			"element": document.getElementById("cplayer"),
			"list": []
		};
		this.options = <cOption>{ ...DEFAULTS, ...options };


		this.CBASE = new cBase;
		this.now = 0;
		this.dragging = { contain: false, target: document.body };
		//现在开始填DOM
		this.options.element.innerHTML += '<c-player><div class="lyric invisible"><lyric-body></lyric-body></div><div class="controls"><div class="c-left"><div class="music-description"><div class="image"><img class="meta-bak"></div><div class="music-meta"><div><span class="music-name"></span><span class="music-artist"></span></div></div></div><a class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M16 10v28l22-14z"></path></svg></a></div><div class="c-center"><div class="time"><div class="time-body"><div class="time-line"><div class="time-point"></div></div></div></div></div><div class="c-right"><div class="volume"><div class="volume-button"><a class="volume-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z"></path></svg></a></div><div class="volume-body"><div class="volume-line"><div class="volume-point"></div></div></div></div><div class="list-button"><a class="list-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z"></path></svg></a></div><div class="lyric-button"><a class="lyric-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z"></path></svg></a></div></div></div><div class="list invisible"><list-body></list-body></div></c-player>';
		(() => {
			const res = this.options.element.getElementsByTagName("c-player");
			this.CBASE.root = res[res.length - 1];
		})();
		//然后为DOMList填充一下吧
		this.__LIST__ = {
			"lyric": this.CBASE.getByClass("lyric"),
			"lyricBody": this.CBASE.getByTagName("lyric-body"),
			"toggle": this.CBASE.getByClass("play-icon"),
			"img": <HTMLImageElement>this.CBASE.getByClass("meta-bak"),
			"name": this.CBASE.getByClass("music-name"),
			"artist": this.CBASE.getByClass("music-artist"),
			"time": this.CBASE.getByClass("time"),
			"timeBody": this.CBASE.getByClass("time-body"),
			"timeLine": this.CBASE.getByClass("time-line"),
			"timePoint": this.CBASE.getByClass("time-point"),
			"lyricPower": this.CBASE.getByClass("lyric-power"),
			"volumePower": this.CBASE.getByClass("volume-power"),
			"volumeBody": this.CBASE.getByClass("volume-body"),
			"volumeLine": this.CBASE.getByClass("volume-line"),
			"volumePoint": this.CBASE.getByClass("volume-point"),
			"volume": this.CBASE.getByClass("volume"),
			"listPower": this.CBASE.getByClass("list-power"),
			"list": this.CBASE.getByClass("list"),
			"listBody": this.CBASE.getByTagName("list-body")
		};
		this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg", this.__LIST__.toggle);
		this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg", this.__LIST__.volumePower);

		let that = this; function dragPercentage(options: MouseEvent) {
			/*
				While anything...
				rightTarget(if.it.possible)[
					0 -> sth.point
					1 -> sth.line
					2 -> sth.point & sth.line & sth.body
				]
			*/
			let rightTarget: boolean[] = [];
			Object.defineProperties(rightTarget, {
				0: {
					get: () => {
						return options.target === that.__LIST__.timePoint
							|| options.target === that.__LIST__.volumePoint
					}
				},
				1: {
					get: () => {
						return options.target === that.__LIST__.timeLine
							|| options.target === that.__LIST__.volumeLine
					}
				},
				2: {
					get: () => {
						return options.target === that.__LIST__.timeBody
							|| options.target === that.__LIST__.volumeBody
					}
				}
			});
			if (!(rightTarget[2] || rightTarget[1] || rightTarget[0])) return;//Warning!!! rightTarget[2] checks if mouse focus on the percentage.
			that.dragging.contain = true;
			that.dragging.target = <HTMLElement>options.target;
			let mover = function (options: MouseEvent) {
				if (that.dragging.contain === false) return;
				if (!rightTarget[0]) return;
				let parent = <HTMLElement>((that.dragging.target as HTMLElement).parentNode as Node).parentNode;
				if (parent.classList && parent.classList.contains("volume-body")) {
					that.__LIST__.volumeLine.style.width = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth * 100 + "%";
				} else if (parent.classList && parent.classList.contains("time-body")) {
					that.__LIST__.timeLine.style.width = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth * 100 + "%";
				}
				//实时修正VOLUME
				if (parent.classList.contains("volume-body")) {
					let vol = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth;
					vol = vol > 1 ? 1 : vol;
					vol = vol < 0 ? 0 : vol;
					that.music.volume = vol;
				} (<AddEventListener>window.addEventListener)("mouseup", upper, { "once": true });
			}; let upper = function (options: MouseEvent) {
				window.removeEventListener("mousemove", mover);
				let parent;
				if (that.dragging.contain === false) return;
				/*
					While anything...
					sth.body -> self
					sth.line -> parent
					sth.point-> parent.parent
				*/
				if (false) { }
				else if (rightTarget[0]) { parent = ((that.dragging.target as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement }
				else if (rightTarget[1]) { parent = (that.dragging.target as HTMLElement).parentNode as HTMLElement }
				else if (rightTarget[2]) { parent = that.dragging.target as HTMLElement }
				else throw new Error(JSON.stringify([that.dragging.target, rightTarget]));
				if (parent.classList.contains("volume-body")) {
					let vol = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth;
					vol = vol > 1 ? 1 : vol;
					vol = vol < 0 ? 0 : vol;
					that.music.volume = vol;
				} else if (parent.classList.contains("time-body")) {
					let time = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth;
					time = time > 1 ? 1 : time;
					time = time < 0 ? 0 : time;
					that.updateTime(time * that.music.duration);
				}
				that.dragging.contain = false;
				that.dragging.target = undefined;
			};
			window.addEventListener("mousemove", mover);
			(<AddEventListener>window.addEventListener)("click", upper, { "once": true });
		}

		this.music = document.createElement("audio");
		this.music.autoplay = !!this.options.autoplay;
		this.music.preload = "metadata";
		//绑定事件开始:

		this.on("toggle", () => {
			if (this.isPaused()) {
				this.play();
			} else {
				this.pause();
			}
		}).on("clickLyricPower", () => {
			if (this.hasLyric(this.now) && this.__LIST__.lyric.classList.contains("invisible")) {
				this.showLyric();
			} else if (this.hasLyric(this.now) && !this.__LIST__.lyric.classList.contains("invisible")) {
				this.hideLyric();
			}
		}).on("clickListPower", () => {
			if (this.hasList() && this.__LIST__.list.classList.contains("invisible")) {
				this.showList();
			} else if (this.hasList() && !this.__LIST__.list.classList.contains("invisible")) {
				this.hideList();
			}
		}).on("clickVolumePower", () => {
			if (window.innerWidth < 600) {
				(<HTMLElement>this.__LIST__.volume.parentElement).classList.toggle("hover");
				return;
			}
			if (this.isMuted()) {
				this.music.muted = false;
			} else {
				this.volume(0);
			}
		}).on("timeupdate", () => {
			this.updateTime();
			if (this.hasLyric(this.now))
				this._slideLyric(this.music.currentTime);
		}).on("volumechange", () => {
			this.volume(); //做更新界面用.
		}).on("pause", () => {
			this.CBASE.replaceInner(this.__LIST__.toggle, SVG.playArrow);
		}).on("play", () => {
			this.CBASE.replaceInner(this.__LIST__.toggle, SVG.pause);
			this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg", this.__LIST__.toggle);
		}).on("ended", () => {
			this.CBASE.style(this.__LIST__.lyricBody, "transform", "");
			if ((this.options.list as cList[])[this.now].loop === true) {
				this.updateTime(0);
				this.play();
			} else if (this.hasList() && this.now !== (this.options.list as cList[]).length - 1) {
				this.next();
			}
		});

		//结束

		new cContext({
			element: this.options.element, items: [
				{ "name": "上一曲", "action": () => this.previous() },
				{ "name": "下一曲", "action": () => this.next() },
				{ "name": "翻译", "action": () => this.translate() }
			]
		})

		if ((this.options.list as cList[])[0]) this._toggle();
		this.__LIST__.toggle.addEventListener("click", () => this.emit("toggle"));
		this.__LIST__.lyricPower.addEventListener("click", () => this.emit("clickLyricPower"));
		this.__LIST__.listPower.addEventListener("click", () => this.emit("clickListPower"));
		this.__LIST__.volumePower.addEventListener("click", () => this.emit("clickVolumePower"));
		this.music.addEventListener("volumechange", (ev) => this.emit("volumechange", ev));
		this.music.addEventListener("timeupdate", (ev) => this.emit("timeupdate", ev));
		this.music.addEventListener("canplaythrough", () => this.emit("canplaythrough"));
		this.music.addEventListener("pause", () => this.emit("pause"));
		this.music.addEventListener("play", () => this.emit("play"));
		this.music.addEventListener("ended", () => this.emit("ended"));
		this.options.element.addEventListener("mousedown", (a) => dragPercentage(a));

		this.volume();
		this._refreshList();
	};

	volume(vl: number | void = undefined) {
		let checkLevel = () => {
			if (this.music.volume === 0 || this.isMuted()) {
				this.CBASE.replaceInner(this.__LIST__.volumePower, SVG.volumeOff);
			} else if (this.music.volume > 0 && this.music.volume <= 0.5) {
				this.CBASE.replaceInner(this.__LIST__.volumePower, SVG.volumeDown);
			} else if (this.music.volume > 0.5 && this.music.volume <= 1) {
				this.CBASE.replaceInner(this.__LIST__.volumePower, SVG.volumeUp);
			} else {
				console.log("Unexcepted Volume: " + this.music.volume);
			}
		}
		if (vl === undefined) {
			this.__LIST__.volumeLine.style.width = (this.music.volume * 100) + "%";
			checkLevel();
			return this.isMuted() ? 0 : this.music.volume;
		} else {
			if (vl === 0) {
				this.music.muted = true;
				checkLevel();
			} else {
				this.music.volume = vl as number;
				checkLevel();
			}
		}
	}

	isMuted() {
		return this.music.muted;
	}

	play() {
		if (this.music.seeking === true) return this;
		this.music.play();
		return this;
	}

	pause() {
		if (this.music.seeking === true) return;
		this.music.pause();
		return this;
	}

	previous() {
		this.emit("previous");
		if (this.now === 0) return;
		this.now--;
		this._toggle().play();
		return this;
	}

	next() {
		this.emit("next");
		if (this.now === (this.options.list as cList[]).length - 1) return;
		this.now++;
		this._toggle().play();
		return this;
	}

	to(now: number) {
		this.now = now;
		this._toggle();
		this.play();
		return this;
	}

	private _toggle(now = this.now) {
		let list = (this.options.list as cList[])[now], dom = this.__LIST__;
		this.music.pause();
		[dom.img.src, dom.name.innerHTML, dom.artist.innerHTML, this.music.src] = [list.image, list.name, list.artist, list.url === undefined ? "" : list.url];
		this.transLock = false;
		this.refreshLyric();
		if (!this.hasLyric(this.now)) this.hideLyric();
		this.CBASE.style(this.__LIST__.lyricBody, "transform", "");
		return this;
	}

	isPaused() {
		return this.music.paused;
	}

	hasLyric(id = 0) {
		return ((this.options.list as cList[])[id].lyric != undefined);
	}

	showLyric() {
		this.emit("slideLyric", true);
		if (this.hasLyric(this.now)) this.__LIST__.lyric.classList.remove("invisible");
		if (!this.__LIST__.list.classList.contains("invisible")) this.hideList();
		return this;
	}

	hideLyric() {
		this.emit("slideLyric", false);
		this.__LIST__.lyric.classList.add("invisible");
		return this;
	}

	hasList() {
		return ((this.options.list as cList[]).length > 1);
	}

	showList() {
		this.emit("slideList", true);
		this.__LIST__.list.classList.remove("invisible");
		if (!this.__LIST__.lyric.classList.contains("invisible")) this.hideLyric();
		return this;
	}

	hideList() {
		this.emit("slideList", false);
		this.__LIST__.list.classList.add("invisible");
		return this;
	}

	private _refreshList() {
		this.emit("changeList");
		let list = (this.options.list as cList[]), lb = this.__LIST__.listBody;
		lb.innerHTML = ``;
		for (let i = 0; i <= list.length - 1; i++) {
			let div = document.createElement("div");
			div.innerHTML = '<span class="music-name">' + list[i].name + '</span><span class="music-artist">' + list[i].artist + '</span>';
			div = lb.appendChild(div);
			div.addEventListener("click", () => {
				this.to(i);
			});
		}
	}

	add(u: cList) {
		let ln = (this.options.list as cList[]).push(u);
		let div = document.createElement("div");
		div.innerHTML = '<span class="music-name">' + u.name + '</span><span class="music-artist">' + u.artist + '</span>';
		div = this.__LIST__.listBody.appendChild(div);
		div.addEventListener("click", () => {
			this.to(ln - 1);
		});
		if (ln === 1) this._toggle(); //刷新元素.
		return this;
	}

	remove(id: number) {
		(this.options.list as cList[]).splice(id, 1);
		this._refreshList();
		return this;
	}

	lyric(content = undefined) {
		if (content === undefined) {
			if (this.hasLyric(this.now)) return (this.options.list as cList[])[this.now].lyric;
		} else {
			(this.options.list as cList[])[this.now].lyric = content;
			this.refreshLyric();
		}
		return this;
	}

	refreshLyric(isTrans = false) {
		//REQUIRE LYRIC...
		this.__LIST__.lyricBody.innerHTML = ``;
		if (!this.hasLyric(this.now)) return;
		let lr = isTrans !== false ?
			(this.options.list as cList[])[this.now].transLyric as string
			: (this.options.list as cList[])[this.now].lyric as string;
		let lyric = cLyric(lr) as __LYRIC__;
		lyric["now"] = 0;
		this.__LYRIC__ = lyric;
		for (let i = 0; i <= lyric.length - 1; i++) {
			let div = document.createElement("lrc");
			div.innerHTML = lyric[i].content;
			this.__LIST__.lyricBody.appendChild(div);
		}
		this.emit("changeLyric");
	}

	updateTime(time: number | void = undefined, func?: (time: number) => void) {
		if (time !== undefined) this.music.currentTime = time;
		if (this.dragging.contain === false) this.__LIST__.timeLine.style.width = (this.music.currentTime / this.music.duration) * 100 + "%";
		if (func !== undefined) func(this.music.currentTime);
	}

	private _slideLyric(time: number) {
		if (this.__LIST__.lyric.classList.contains("invisible")) return;

		let lyricToTop,
			halfBody,
			translateY,
			lyricBody = this.__LIST__.lyricBody,
			lrc = this.__LIST__.lyricBody.getElementsByTagName("lrc");
		let clear = (list: NodeListOf<Element>) => {
			for (let n = list.length - 1; n >= 0; n--)
				if (list[n] !== lrc[i])
					list[n].classList.remove("now");
		};
		//遍历Lyric,寻找当前时间的歌词
		//注意:[].find & [].findIndex 仅返回符合要求元素组成的数组第一项,符合要求元素组成的数组的顺序参考原数组不变
		//现在的写法需要__LYRIC__属性具有time从小到大排列的顺序,详见refreshLyric()方法
		let lyric = this.CBASE.find(this.__LYRIC__, (element) => element.time < time).reverse()[0];
		let i = [].indexOf.call(this.__LYRIC__, lyric);
		if (i < 0) {
			this.CBASE.style(lyricBody, "transform", "");
			let list = this.__LIST__.lyricBody.getElementsByClassName("now");
			clear(list);
			return;
		}

		if (this.__LYRIC__["now"] !== i)
			this.__LYRIC__["now"] = i;
		lrc[i].classList.add("now");
		lyricToTop = (<HTMLElement>lyricBody.childNodes[i]).offsetTop - (<HTMLElement>lyricBody.childNodes[0]).offsetTop - 0.5 * (<HTMLElement>lyricBody.childNodes[i]).clientHeight;
		halfBody = 0.5 * this.__LIST__.lyric.clientHeight - (<HTMLElement>lyricBody.childNodes[i]).clientHeight;
		translateY = -(lyricToTop - halfBody);
		this.CBASE.style(lyricBody, "transform", "translateY(" + translateY + "px)");
		let list = this.__LIST__.lyricBody.getElementsByClassName("now");
		if (list.length > 1)
			clear(list);
	}
	translate() {
		if (!(this.options.list as cList[])[this.now].transLyric || !this.hasLyric(this.now)) return false;
		this.transLock = !this.transLock;
		this.refreshLyric(this.transLock);
	}
	get length() {
		return (this.options.list as cList[]).length;
	}
	set length(length) {
		throw new SyntaxError("Read-only Property.");
	}
}

console.log("\n%ccPlayer%cv" + (cPlayer.version = __CPLAYER_VERSION__) + "%c\n\n", "padding:7px;background:#cd3e45;font-family:'Sitka Heading';font-weight:bold;font-size:large;color:white", "padding:7px;background:#ff5450;font-family:'Sitka Text';font-size:large;color:#eee", "");
export { cPlayer };