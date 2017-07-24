/*
 	cPlayer
    Author	Corps

	I am the super Corps!
 */

const cPlayer = class cPlayer {
	    constructor(options) {
	    	this.transLock = false;
	        const EVENTS = {
	            "play"              :[], //When Music be played, Emit.
	            "pause"             :[], //When Music be paused, Emit.
	            "volumechange"      :[],
	            "timeupdate"        :[],
	            "canplaythrough"    :[],
	            "ended"             :[],
	            //All the above are binded on AUDIO Elements,
	            //The following items are Function's callback function.
	            "toggle"            :[],
	            "previous"          :[],
	            "next"              :[],
	            "changeList"        :[],
	            "changeLyric"       :[],
	            "slideList"         :[],
	            "slideLyric"        :[],
	            "clickLyricPower"   :[],
	            "clickListPower"    :[],
	            "clickVolumePower"  :[],
	        };
	        this.emitter = new cEmitter(EVENTS);
	        this.on = (eventName,func)=>this.emitter.on(eventName,func);
	        /*
	         *  參數处理,合并默认参数与定义參數
	         */
	        const DEFAULTS = {
	            "element": document.getElementById("cplayer"),
	            "list"   : []
	        };
	        if(Object.assign !== undefined){
	            this.options = Object.assign({}, DEFAULTS, options);
	        }

	        //SVG建立
	        this.SVG = {
	            "playArrow"     :'M16 10v28l22-14z',
	            "pause"         :'M12 38h8V10h-8v28zm16-28v28h8V10h-8z',
	            "playlistPlay"  :'M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z',
	            "note"          :'M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z',
	            "volumeUp"      :'M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z',
	            "volumeMute"    :'M14 18v12h8l10 10V8L22 18h-8z',
	            "volumeOff"     :'M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z',
	            "volumeDown"    :'M37 24c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zm-27-6v12h8l10 10V8L18 18h-8z',
	        };
	        (()=>{
	            for(let i = 0,keys = Object.keys(this.SVG),length = keys.length;i<length;i++){
	                let svg = keys[i]==="playlistPlay" ?
	                     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="' + this.SVG[keys[i]] + '"/></svg>' :
	                     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="' + this.SVG[keys[i]] + '"/></svg>';
	                this.SVG[keys[i]] = svg;
	            }
	        })();

	        this.CBASE = new cBase;
	        this.now = 0;
	        this.dragging = {contain: false, target: undefined};
	        //现在开始填DOM
			this.options.element.innerHTML = '<c-player><div class="lyric invisible"><lyric-body></lyric-body></div><div class="controls"><div class="c-left"><div class="music-description"><div class="image"><img class="meta-bak"></div><div class="music-meta"><div><span class="music-name"></span><span class="music-artist"></span></div></div></div><a class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M16 10v28l22-14z"></path></svg></a></div><div class="c-center"><div class="time"><div class="time-body"><div class="time-line"><div class="time-point"></div></div></div></div></div><div class="c-right"><div class="volume"><div class="volume-button"><a class="volume-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z"></path></svg></a></div><div class="volume-body"><div class="volume-line"><div class="volume-point"></div></div></div></div><div class="list-button"><a class="list-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z"></path></svg></a></div><div class="lyric-button"><a class="lyric-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z"></path></svg></a></div></div></div><div class="list invisible"><list-body></list-body></div></c-player>';
	        this.CBASE.root = this.options.element.getElementsByTagName("c-player");
	        this.CBASE.root = this.CBASE.root[this.CBASE.root.length-1];//???
	        //然后为DOMList填充一下吧
	        this.__LIST__ = {
	            "lyric"      : this.CBASE.getByClass("lyric"),
	            "lyricBody"  : this.CBASE.getByTagName("lyric-body"),
	            "toggle"     : this.CBASE.getByClass("play-icon"),
	            "img"        : this.CBASE.getByClass("meta-bak"),
	            "name"       : this.CBASE.getByClass("music-name"),
	            "artist"     : this.CBASE.getByClass("music-artist"),
	            "time"       : this.CBASE.getByClass("time"),
	            "timeBody"   : this.CBASE.getByClass("time-body"),
	            "timeLine"   : this.CBASE.getByClass("time-line"),
	            "timePoint"  : this.CBASE.getByClass("time-point"),
	            "lyricPower" : this.CBASE.getByClass("lyric-power"),
	            "volumePower": this.CBASE.getByClass("volume-power"),
	            "volumeBody" : this.CBASE.getByClass("volume-body"),
	            "volumeLine" : this.CBASE.getByClass("volume-line"),
	            "volumePoint": this.CBASE.getByClass("volume-point"),
	            "listPower"  : this.CBASE.getByClass("list-power"),
	            "list"       : this.CBASE.getByClass("list"),
	            "listBody"   : this.CBASE.getByTagName("list-body")
	        };
			this.__LIST__.toggle.focus();
	        this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
	        this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);

	        let that=this;function dragPercentage(options) {
		    	/*
		    		While anything...
		    		rightTarget(if.it.possible)[
						0 -> sth.point
						1 -> sth.line
						2 -> sth.point & sth.line & sth.body
		    		]
		    	*/
		    	let rightTarget = [];
					Object.defineProperties(rightTarget,{
						0:{
							get: ()=>{return options.target === that.__LIST__.timePoint 
		                	|| options.target === that.__LIST__.volumePoint}
						},
						1:{
							get: ()=>{return options.target === that.__LIST__.timeLine
		                	|| options.target === that.__LIST__.volumeLine}
						},
						2:{
							get: ()=>{return options.target === that.__LIST__.timePoint 
		                	|| options.target === that.__LIST__.volumePoint
		                	|| options.target === that.__LIST__.timeBody
		                	|| options.target === that.__LIST__.volumeBody
		                	|| options.target === that.__LIST__.timeLine
		                	|| options.target === that.__LIST__.volumeLine}
						}
					});
		    	if (!rightTarget[2]) return;//Warning!!! rightTarget[2] checks if mouse focus on the percentage.
		        that.dragging.contain = true;
		        that.dragging.target = options.target;
				let mover = function(options){
					if (that.dragging.contain === false) return;
		            if (!rightTarget[0])return;
		            parent = that.dragging.target.parentNode.parentNode;
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
		            }window.addEventListener("mouseup",upper,{"once":true});
				};let upper=function (options){
					window.removeEventListener("mousemove",mover);
		            	if (that.dragging.contain === false) return;
			            /*
			            	While anything...
			            	sth.body -> self
			            	sth.line -> parent
			            	sth.point-> parent.parent
			            */
			            if(false){}
			            	else if(rightTarget[0]){parent = that.dragging.target.parentNode.parentNode}
			            	else if(rightTarget[1]){parent = that.dragging.target.parentNode}
			            	else if(rightTarget[2]){parent = that.dragging.target}
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
				window.addEventListener("mousemove",mover);
				window.addEventListener("click",upper,{"once":true});
		    }

	        this.music = document.createElement("audio");
	        this.music.autoplay = !!this.options.autoplay;
	        this.music.preload  = "metadata";
	        //绑定事件开始:

	        this.emitter.on("toggle",()=>{
	            if (this.isPaused()) {
	                this.play();
	            } else {
	                this.pause();
	            }
	        }).on("clickLyricPower",()=>{
	            if (this.hasLyric(this.now) && this.__LIST__.lyric.classList.contains("invisible")) {
	                this.showLyric();
	            } else if (this.hasLyric(this.now) && !this.__LIST__.lyric.classList.contains("invisible")) {
	                this.hideLyric();
	            }
	        }).on("clickListPower",()=>{
	            if (this.hasList() && this.__LIST__.list.classList.contains("invisible")) {
	                this.showList();
	            } else if (this.hasList() && !this.__LIST__.list.classList.contains("invisible")) {
	                this.hideList();
	            }
	        }).on("clickVolumePower",()=>{
	            if (this.isMuted()) {
	                this.music.muted = false;
	            } else {
	                this.volume(0);
	            }
	        }).on("timeupdate",()=>{
	            this.updateTime();
	            if (this.hasLyric(this.now)) 
	            	this.slideLyric(this.music.currentTime);
	        }).on("volumechange",()=>{
	            this.volume(); //做更新界面用.
	        }).on("pause",()=>{
	            this.CBASE.replaceInner(this.__LIST__.toggle,this.SVG.playArrow);
	        }).on("play",()=>{
	            this.CBASE.replaceInner(this.__LIST__.toggle,this.SVG.pause);
	            this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
	        }).on("ended",()=>{
	            this.CBASE.style(this.__LIST__.lyricBody,"transform","");
	            if (this.options.list[this.now].loop === true) {
	                    this.updateTime(0);
	                    this.play();
	            }else if (this.hasList()&&this.now !== this.options.list.length-1) {
	                this.next();
	            }
	        });

	        //结束

	        new cContext({element:this.options.element,items:[
	        		{"name":"上一曲","action":()=>this.previous()},
	        		{"name":"下一曲","action":()=>this.next()},
	        		{"name":"翻译","action":()=>this.translate()}
	        	]})

	        if(this.options.list[0]) this.toggle();
	        this.__LIST__.toggle.addEventListener("click", ()=>this.emitter.emit("toggle"));
	        this.__LIST__.lyricPower.addEventListener("click", ()=>this.emitter.emit("clickLyricPower"));
	        this.__LIST__.listPower.addEventListener("click", ()=>this.emitter.emit("clickListPower"));
	        this.__LIST__.volumePower.addEventListener("click", ()=>this.emitter.emit("clickVolumePower"));
	        this.music.addEventListener("volumechange", (ev)=>this.emitter.emit("volumechange",ev));
	        this.music.addEventListener("timeupdate", (ev)=>this.emitter.emit("timeupdate",ev));
	        this.music.addEventListener("canplaythrough", ()=>this.emitter.emit("canplaythrough"));
	        this.music.addEventListener("pause", ()=>this.emitter.emit("pause"));
	        this.music.addEventListener("play", ()=>this.emitter.emit("play"));
	        this.music.addEventListener("ended", ()=>this.emitter.emit("ended"));
	        this.options.element.addEventListener("mousedown", (a)=>dragPercentage(a));

	        this.volume();
	        this.refreshList();
	    };

	    volume(vl = undefined) {
	        let checkLevel = ()=>{
	            if(this.music.volume===0||this.isMuted()){
	                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeOff);
	            } else if(this.music.volume>0&&this.music.volume<=0.5){
	                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeDown);
	            } else if(this.music.volume>0.5&&this.music.volume<=1){
	                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeUp);
	            } else {
	                console.log("Unexcepted Volume: "+this.music.volume);
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
	                this.music.volume = vl;
	                checkLevel();
	            }
	        }
	    }

	    isMuted() {
	        return this.music.muted;
	    }

	    play() {
	        if(this.music.seeking === true) return this;
	        this.music.play();
	        return this;
	    }

	    pause() {
	        if(this.music.seeking === true) return;
	        this.music.pause();
	        return this;
	    }

	    previous() {
	        this.emitter.emit("previous");
	        if(this.now === 0) return;
	        this.now--;
	        this.toggle().play();
	        return this;
	    }

	    next() {
	        this.emitter.emit("next");
	        if(this.now === this.options.list.length-1) return;
	        this.now++;
	        this.toggle().play();
	        return this;
	    }

	    to(now) {
	        this.now = now;
	        this.toggle();
	        this.play();
	        return this;
	    }

	    toggle(now = this.now) {
	        let list = this.options.list[now], dom = this.__LIST__;
	        this.music.pause();
	        [dom.img.src, dom.name.innerHTML, dom.artist.innerHTML, this.music.src] = [list.image, list.name, list.artist, list.url];
	        this.transLock = false;
	        this.refreshLyric();
	        if (!this.hasLyric(this.now))this.hideLyric();
	        this.CBASE.style(this.__LIST__.lyricBody,"transform","");
	        return this;
	    }

	    isPaused(func) {
	        if(func !== undefined) func();
	        return this.music.paused;
	    }

	    hasLyric(id = 0,func) {
	        if(func !== undefined) func();
	        return (this.options.list[id].lyric != undefined);
	    }

	    showLyric() {
	        this.emitter.emit("slideLyric",true);
	        if (this.hasLyric(this.now))this.__LIST__.lyric.classList.remove("invisible");
	        if (!this.__LIST__.list.classList.contains("invisible")) this.hideList();
	        return this;
	    }

	    hideLyric() {
	        this.emitter.emit("slideLyric",false);
	        this.__LIST__.lyric.classList.add("invisible");
	        return this;
	    }

	    hasList(func) {
	        if(func !== undefined) func();
	        return (this.options.list.length > 1);
	    }

	    showList(func) {
	        this.emitter.emit("slideList",true);
	        this.__LIST__.list.classList.remove("invisible");
	        if (!this.__LIST__.lyric.classList.contains("invisible")) this.hideLyric();
	        if(func !== undefined) func();
	        return this;
	    }

	    hideList(func) {
	        this.emitter.emit("slideList",false);
	        this.__LIST__.list.classList.add("invisible");
	        if(func !== undefined) func();
	        return this;
	    }

	    refreshList(func) {
	        this.emitter.emit("changeList");
	        let list = this.options.list, lb = this.__LIST__.listBody;
	        lb.innerHTML = ``;
	        for (let i = 0; i <= list.length - 1; i++) {
	            let div = document.createElement("div");
	            div.innerHTML = '<span class="music-name">' + list[i].name + '</span><span class="music-artist">' + list[i].artist + '</span>';
	            div = lb.appendChild(div);
	            div.addEventListener("click", ()=> {
	                this.to(i);
	            });
	        }
	        if(func !== undefined) func();
	    }

	    add(u,func) {
	        let ln = this.options.list.push(u);
	        let div = document.createElement("div");
	        div.innerHTML = '<span class="music-name">' + u.name + '</span><span class="music-artist">' + u.artist + '</span>';
	        div = this.__LIST__.listBody.appendChild(div);
	        div.addEventListener("click", ()=> {
	            this.to(ln - 1);
	        });
	        if(ln===1) this.toggle(); //刷新元素.
	        if(func !== undefined) func();
	    }

	    lyric(content = undefined) {
	        if (content === undefined) {
	            if (this.hasLyric(this.now)) return this.options.list[this.now].lyric;
	        } else {
	            this.options.list[this.now].lyric = content;
	            this.refreshLyric();
	        }
	        return this;
	    }

	    refreshLyric(isTrans=false) {
	        //REQUIRE LYRIC...
	        this.__LIST__.lyricBody.innerHTML = ``;
	        if (!this.hasLyric(this.now)) return;
	        let lr = isTrans!==false?this.options.list[this.now].transLyric:this.options.list[this.now].lyric;
	        let lyric = cLyric(lr);
	        lyric["now"] = 0;
	        this.__LYRIC__ = lyric;
	        for (let i = 0; i <= lyric.length - 1; i++) {
	            let div = document.createElement("lrc");
	            div.innerHTML = lyric[i].content;
	            this.__LIST__.lyricBody.appendChild(div);
	        }
	        this.emitter.emit("changeLyric");
	    }

	    updateTime(time = undefined,func) {
	        if (time !== undefined)this.music.currentTime = time;
	        if (this.dragging.contain === false) this.__LIST__.timeLine.style.width = (this.music.currentTime / this.music.duration) * 100 + "%";
	        if(func !== undefined) func(this.music.currentTime);
	    }

	    slideLyric(time){
	        if(this.__LIST__.lyric.classList.contains("invisible")) return;

	        let lyricToTop,
	        	halfBody,
	        	translateY,
	        	lyricBody=this.__LIST__.lyricBody,
	        	lrc = this.__LIST__.lyricBody.getElementsByTagName("lrc");
			let clear = ()=>{
					for (let n = list.length - 1; n >= 0; n--)
						if(list[n]!==lrc[i])
							list[n].classList.remove("now");
				};
	        //遍历Lyric,寻找当前时间的歌词
			//注意:[].find & [].findIndex 仅返回符合要求元素组成的数组第一项,符合要求元素组成的数组的顺序参考原数组不变
			//现在的写法需要__LYRIC__属性具有time从小到大排列的顺序,详见refreshLyric()方法
			let lyric = this.CBASE.find(this.__LYRIC__,(element)=>element.time<time).reverse()[0];
			let i = this.__LYRIC__.indexOf(lyric);
			if(i<0){
				this.CBASE.style(lyricBody,"transform","");
				clear();
			}

        	if(this.__LYRIC__["now"]!==i)
		        this.__LYRIC__["now"]=i;
		    lrc[i].classList.add("now");
			lyricToTop  = lyricBody.childNodes[i].offsetTop - lyricBody.childNodes[0].offsetTop - 0.5 * lyricBody.childNodes[i].clientHeight;
			halfBody    = 0.5 * this.__LIST__.lyric.clientHeight - lyricBody.childNodes[i].clientHeight;
			translateY  = -(lyricToTop - halfBody);
			this.CBASE.style(lyricBody,"transform","translateY(" + translateY + "px)");
			let list = this.__LIST__.lyricBody.getElementsByClassName("now");
		    if(list.length>1)
				clear();
	    }
	    translate(){
	    	if(!this.options.list[this.now].transLyric||!this.hasLyric(this.now)) return false;
	    	this.transLock = !this.transLock;
	    	this.refreshLyric(this.transLock);
	    }
	    get length(){
	        return this.options.list.length;
	    }
	    set length(length){
	        throw new SyntaxError("Read-only Property.");
	    }
}

//Object.assign 解决方案
if (typeof Object.assign != 'function') {
	  Object.assign = function(target) {
	    'use strict';
	    if (target == null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }

	    target = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source != null) {
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target[key] = source[key];
	          }
	        }
	      }
	    }
	    return target;
	  };
}

const cEmitter = class cEmitter{
	    constructor(typeList){
	        if(typeList){
	            this.events = typeList;
	        }else{
	            this.events = [];
	        }
	    }
	    on(eventName,func){
	        if(this.events[eventName]&&this.events[eventName].push !== undefined&&typeof func === "function"){
	            this.events[eventName].push(func);
	        }else if(this.events[eventName]===undefined||this.events[eventName].push===undefined){
	            this.events[eventName] = [];
	        }else{
	            throw new TypeError("Uncaught Unexcepted TypeError.")
	        }
	        return this;
	    }
	    emit(eventName,...args){
	        for(let i = 0;i<this.events[eventName].length;i++){
	            this.events[eventName][i](args);
	        }
	        return this;
	    }
}
const cBase = class cBase{
	    constructor(rootNode=document.documentElement){
	        this.root = rootNode;
	        for(let styleList = document.documentElement.style,i = styleList.length;i>0;i--){
				["-webkit-","-moz-","-o-","-ms-"].forEach(element=>{
					if(styleList[i].indexOf(element)!==-1){
						this.browser = element.replace("-","");
					};
				});
				if(this.browser)break;
			}
	    }
	    replace(oldElement,newElement){
	        //newElement 不存在于oldElement 的父元素中,首先载入.
	        newElement = newElement.cloneNode(true);
	        oldElement.parentNode.appendChild(newElement);
	        oldElement.parentNode.removeChild(oldElement);
	        //顺便如果有值为oldElement的变量,请重新赋值.
	    }
	    replaceInner(element,innerContent){
	        //进行一次简单的封装
	        element.innerHTML = innerContent;
	    }
	    getByClass(className,parentElement){
	        return parentElement!=undefined?parentElement.getElementsByClassName(className)[0]:this.root.getElementsByClassName(className)[0];
	    }
	    getByTagName(tagName,parentElement){
	        return parentElement!=undefined?parentElement.getElementsByTagName(tagName)[0]:this.root.getElementsByTagName(tagName)[0];
	    }
	    rand(start,end){
	        if(!start||!end) return Math.random();
	        if(start>end) throw new RangeError("the EndNumber must be bigger than the StartNumber");
	        return (end-start)*Math.random()+start;
	    }
		find(array,func){
			let ar = [];
			array.forEach(el=>{
				if(!!func(el))ar.push(el);
			});return ar;
		}
	    style(dom,property,content){
			//不管浏览器，暴力加前缀
	        dom.style[this.browser+property.slice(0,1).toUpperCase()+property.slice(1)] = content;
	        dom.style[property] = content;
	    }
}
const cContext = class cContext{
    /*
     * options:{
     *            "element":element,
     *            "items":[
     *                {"name":"XXX","action":func},
     *                {"name":"XXX","action":func},
     *            ]
     *         }
     */
    constructor(options){
        if(!options.element)throw new Error("Need a element to bind.");
        this.options = options;
        this.options.element.oncontextmenu = function(){
            return false;
        }
        this.options.element.addEventListener("contextmenu",a=>{
            this.hide();
            this.show(a);
            return false;
        });
        document.documentElement.addEventListener("click",()=>this.hide());
        return this;
    }
    add({name,action}){
        this.options.items.push({name,action});
        return this;
    }
    show({pageX,pageY}){
        let content = document.createElement("div");
            content.classList.add("c-context");
        for(let items = this.options.items, i=0;i<items.length;i++){
        	content.appendChild(document.createElement("div"));
        	content.children[i].classList.add("c-context--list");
        	content.children[i].innerHTML = items[i].name;
            //content.innerHTML+=`<div class="c-context--list">${items[i].name}</div>`;
            content.children[i].addEventListener("click",items[i].action);
        }
        document.body.appendChild(content);
        //Set the offset-x
        if(document.documentElement.clientWidth>content.offsetWidth){ //When the body is wide enough
			content.style.left = document.documentElement.clientWidth>(content.offsetWidth+pageX)?
								 pageX + "px":pageX - content.offsetWidth + "px";
        }else{
            content.style.width = document.documentElement.clientWidth + "px";
        }
        //Set the offset-y
        if(document.documentElement.clientHeight>content.offsetHeight){
			content.style.top = document.documentElement.clientHeight>(content.offsetHeight+pageY)?
								pageY + "px":pageY - content.offsetHeight + "px";
        }
        content.style.visibility = "visible";
        return this;
    }
    hide(){
        for(let list = document.getElementsByClassName("c-context"),i = list.length-1;i>=0;i--)document.body.removeChild(list[i]);
        return this;
    }
    get items(){
        return this.options.items;
    }
    set items(context){
        this.options.items = context;
        return this.options.items;
    }
}

function cLyric(lrc){
	let offset = 0,
	lyricArray = [];
	lrc.replace(/\n+/gi,"\n").split("\n").forEach(function(content){
		//content is like:
		// [00:12.34]JUUUUUUUUUUUUUUMP!!!!!!
		//get OFFSET
		if(content.indexOf("offset")!==-1) offset = parseInt((/offset\:(\d+)/gi).exec(content)[1]);
		//get Lyric and translate it.
		//ar[] -> [1.24,2.21,36.15,"HEY!"]
		if(/\[\d+:[\d\.]+\]/gi.test(content)){
			let ar = [];
			[].forEach.call(content.match(/\[\d+\:[\.\d]+\]/gi),function(e){
				let number = /\[(\d+)\:([\.\d]+)\]/gi.exec(e);
				ar.push(parseInt(number[1])*60+parseFloat(number[2]-offset*0.001));
			});
			ar.push(/(?:\[\d+\:[\.\d]+\])*(.*)/gi.exec(content)[1]);
			do{
				lyricArray.push({time:ar.shift(),content:ar[ar.length-1]});
			}while(ar.length>=2)
		}
	});
	return lyricArray.sort((a, b)=> {
	    return a.time - b.time;
	});
} ;
if(window)window.cPlayer = cPlayer;
