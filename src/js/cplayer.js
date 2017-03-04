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
	                let svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	                    if(keys[i]==="playlistPlay"){
	                        svg.setAttribute("viewBox","-12 -12 48 48");
	                        svg.setAttribute("enable-background","new -12 -12 48 48")
	                    }else{
	                        svg.setAttribute("viewBox","0 0 48 48");
	                    }
	                    svg = keys[i]==="playlistPlay" ?
	                     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="' + this.SVG[keys[i]] + '"/></svg>' :
	                     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="' + this.SVG[keys[i]] + '"/></svg>';
	                this.SVG[keys[i]] = svg;
	            }
	        })();

	        this.CBASE = new cBase;
	        this.now = 0;
	        this.dragging = {contain: false, target: undefined};
	        //现在开始填DOM
	        (()=>{
	            let cPlayer = document.createElement("c-player");
	                let lyric = document.createElement("div");
	                    lyric.classList.add("lyric");
	                    lyric.classList.add("invisible");
	                        let lyricBody = document.createElement("lyric-body");
	                    lyric.appendChild(lyricBody);
	                let controls = document.createElement("div");
	                    controls.classList.add("controls");
	                        let cLeft = document.createElement("div");
	                            cLeft.classList.add("c-left");
	                                let musicDescription = document.createElement("div");
	                                    musicDescription.classList.add("music-description");
	                                        let image = document.createElement("div");
	                                            image.classList.add("image");
	                                                let metaBak = document.createElement("img");
	                                                    metaBak.classList.add("meta-bak");
	                                            image.appendChild(metaBak);
	                                        let musicMeta = document.createElement("div");
	                                            musicMeta.classList.add("music-meta");
	                                                let div = document.createElement("div");
	                                                    let musicName = document.createElement("span");
	                                                        musicName.classList.add("music-name");
	                                                    let musicArtist = document.createElement("span");
	                                                        musicArtist.classList.add("music-artist");
	                                                    div.appendChild(musicName);
	                                                    div.appendChild(musicArtist);
	                                            musicMeta.appendChild(div);
	                                    musicDescription.appendChild(image);
	                                    musicDescription.appendChild(musicMeta);
	                                let playIcon = document.createElement("a");
	                                    playIcon.classList.add("play-icon");
	                                    this.CBASE.replaceInner(playIcon,this.SVG.playArrow);
	                            cLeft.appendChild(musicDescription);
	                            cLeft.appendChild(playIcon);
	                        let cCenter = document.createElement("div");
	                            cCenter.classList.add("c-center");
	                                let time = document.createElement("div");
	                                    time.classList.add("time");
	                                        let timeBody = document.createElement("div");
	                                            timeBody.classList.add("time-body");
	                                                let timeLine = document.createElement("div");
	                                                    timeLine.classList.add("time-line");
		                                                let timePoint = document.createElement("div");
		                                                    timePoint.classList.add("time-point");
	                                            		timeLine.appendChild(timePoint);
	                                            timeBody.appendChild(timeLine);
	                                    time.appendChild(timeBody);
	                            cCenter.appendChild(time);
	                        let cRight = document.createElement("div");
	                            cRight.classList.add("c-right");
	                                let volume = document.createElement("div");
	                                    volume.classList.add("volume");
	                                        let volumeButton = document.createElement("div");
	                                            volumeButton.classList.add("volume-button");
	                                                let volumePower = document.createElement("a");
	                                                    volumePower.classList.add("volume-power");
	                                                    this.CBASE.replaceInner(volumePower,this.SVG.volumeOff);
	                                            volumeButton.appendChild(volumePower);
	                                        let volumeBody = document.createElement("div");
	                                            volumeBody.classList.add("volume-body");
	                                                let volumeLine = document.createElement("div");
	                                                    volumeLine.classList.add("volume-line");
		                                                let volumePoint = document.createElement("div");
		                                                    volumePoint.classList.add("volume-point");
	                                            		volumeLine.appendChild(volumePoint);
	                                            volumeBody.appendChild(volumeLine);
	                                    volume.appendChild(volumeButton);
	                                    volume.appendChild(volumeBody);
	                                let listButton = document.createElement("div");
	                                    listButton.classList.add("list-button");
	                                        let listPower = document.createElement("a");
	                                            listPower.classList.add("list-power");
	                                            this.CBASE.replaceInner(listPower,this.SVG.playlistPlay);
	                                    listButton.appendChild(listPower);
	                                let lyricButton = document.createElement("div");
	                                    lyricButton.classList.add("lyric-button");
	                                        let lyricPower = document.createElement("a");
	                                            lyricPower.classList.add("lyric-power");
	                                            this.CBASE.replaceInner(lyricPower,this.SVG.note);
	                                    lyricButton.appendChild(lyricPower);
	                            cRight.appendChild(volume);
	                            cRight.appendChild(listButton);
	                            cRight.appendChild(lyricButton);
	                    controls.appendChild(cLeft);
	                    controls.appendChild(cCenter);
	                    controls.appendChild(cRight);
	                let list = document.createElement("div");
	                    list.classList.add("list");
	                    list.classList.add("invisible");
	                        let listBody = document.createElement("list-body");
	                    list.appendChild(listBody);
	            cPlayer.appendChild(lyric);
	            cPlayer.appendChild(controls);
	            cPlayer.appendChild(list);
	            this.options.element.appendChild(cPlayer);
	        })();
	        this.CBASE.root = this.options.element.getElementsByTagName("c-player");
	        this.CBASE.root = this.CBASE.root[this.CBASE.root.length-1];
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
					})
		    		/*rightTarget.push(options.target === that.__LIST__.timePoint 
		                	|| options.target === that.__LIST__.volumePoint); //Check if the focus of mouse is the `point circle`
		    		rightTarget.push(options.target === that.__LIST__.timeLine
		                	|| options.target === that.__LIST__.volumeLine);
		    		rightTarget.push((options.target === that.__LIST__.timePoint 
		                	|| options.target === that.__LIST__.volumePoint
		                	|| options.target === that.__LIST__.timeBody
		                	|| options.target === that.__LIST__.volumeBody
		                	|| options.target === that.__LIST__.timeLine
		                	|| options.target === that.__LIST__.volumeLine));*/
		    	if (!rightTarget[2]) return;//Warning!!! rightTarget[2] checks if mouse focus on the percentage.
		        that.dragging.contain = true;
		        that.dragging.target = options.target;
				let mover = function(options){
					if (that.dragging.contain === false) return;
		            if (!rightTarget[0]) return;
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
		            }
		            window.addEventListener("mouseup",upper);
				};let upper=function (options){
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
			            window.removeEventListener("mouseup",upper);
			            window.removeEventListener("mousemove",mover);
		            };let uppers = function(options){
		            	if (that.dragging.contain === false) return;
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
			            window.removeEventListener("mouseup",uppers);
		            };
				if (rightTarget[0])window.addEventListener("mousemove",mover);
				if (!rightTarget[0])window.addEventListener("mouseup",uppers);
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
	            } else if (this.hasLyric() && !this.__LIST__.list.classList.contains("invisible")) {
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
	            if (this.hasLyric(this.now)) {
	                this.slideLyric(this.music.currentTime);
	            }
	        }).on("volumechange",()=>{
	            this.volume(); //做更新界面用.
	        }).on("pause",()=>{
	            this.CBASE.replaceInner(this.__LIST__.toggle,this.SVG.playArrow);
	            //再赋值,更新内容.
	            //this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
	        }).on("play",()=>{
	            this.CBASE.replaceInner(this.__LIST__.toggle,this.SVG.pause);
	            //再赋值,更新内容.
	            this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
	        }).on("ended",()=>{
	            //this.__LIST__.lyricBody.style.transform = ""; 为了兼容性封装一遍
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
	                this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);
	            } else if(this.music.volume>0&&this.music.volume<=0.5){
	                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeDown);
	                this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);
	            } else if(this.music.volume>0.5&&this.music.volume<=1){
	                this.CBASE.replaceInner(this.__LIST__.volumePower,this.SVG.volumeUp);
	                this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg",this.__LIST__.volumePower);
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
	        this.emitter.emit("toggle");
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
	        //START LRC BASEING...
			lr = lr.split("\n").length>1?lr.split("\n"):lr.replace("]","]\n").split("]");
	        let lrcs = [];
	        for (let i = 0,content=lr[i];i<lr.length;i++,content=lr[i]) {
	            if (typeof content !== "string") break;
	            let onelrc = content.split(/\[|\]\[|\]/gi);
	            for (let i = 0; i < onelrc.length - 1; i++) {
	                if (onelrc[i] === "" && i !== onelrc.length - 1 || onelrc[i].match(/\d{1,}\:\d{1,}/gi)===null) {
	                    onelrc.splice(i, 1);
	                    i--;
	                    continue;
	                }

	                if (onelrc[i].match(/\d{1,}\:\d{1,}/gi)) {
	                    let lyricsarray = onelrc[i].split(/\:|\./gi);
	                    switch (lyricsarray.length) {
	                        case 2:
	                            onelrc[i] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]);
	                            break;
	                        case 3:
	                            onelrc[i] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]) + parseFloat("0." + lyricsarray[2]);
	                            break;
	                        default:
	                            throw new Error("Time not be Found!")
	                    }
	                }
	            }

	            lrcs.push(onelrc);
	        }
	        //LRC BASED
	        let lyric = [];
	        for (let i = lrcs.length - 1; i >= 0; i--) {
	            if (lrcs[i].length > 2) {
	                for (let count = lrcs[i].length - 1; count >= 0; count--) {
	                    if (count !== lrcs[i].length - 1 && lrcs[i][lrcs[i].length - 1]!==undefined) {
	                        lyric.push({time: lrcs[i][count], content: lrcs[i][lrcs[i].length - 1]});
	                    }
	                }

	            } else if(lrcs[i][1]!==undefined) {
	                lyric.push({time: lrcs[i][0], content: lrcs[i][1]});
	            }
	        }

	        lyric.sort((a, b)=> {
	            return a.time - b.time;
	        });
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
	        //if(this.isPaused()) this.play();
	        if(func !== undefined) func(this.music.currentTime);
	        //return this.music.currentTime;
	    }

	    slideLyric(time){
	        if(this.__LIST__.lyric.classList.contains("invisible")) return;

	        let lyricToTop,
	        	halfBody,
	        	translateY,
	        	lyricBody=this.__LIST__.lyricBody,
	        	lrc = this.__LIST__.lyricBody.getElementsByTagName("lrc");
	        //遍历Lyric,寻找当前时间的歌词
	        for (let i = this.__LYRIC__.length - 1, lyric = this.__LYRIC__[i]; i >= 0; lyric = this.__LYRIC__[i-1],i--) {
	        	if(lyric.time>time)
	        		if(this.__LYRIC__[i-1])
	        		if(this.__LYRIC__[i-1].time>time) continue;
	        	if(lyric.time<time||!this.__LYRIC__[i-1]) break;
		        	if(this.__LYRIC__["now"]!==i-1)
		        		this.__LYRIC__["now"]=i-1;
		            lrc[i-1].classList.add("now");
			        lyricToTop  = lyricBody.childNodes[i-1].offsetTop - lyricBody.childNodes[0].offsetTop - 0.5 * lyricBody.childNodes[i-1].clientHeight;
			        halfBody    = 0.5 * this.__LIST__.lyric.clientHeight - lyricBody.childNodes[i-1].clientHeight;
			        translateY  = -(lyricToTop - halfBody);
			        this.CBASE.style(lyricBody,"transform","translateY(" + translateY + "px)");
			        let list = this.__LIST__.lyricBody.getElementsByClassName("now");
		            if(list.length>1)
			            for (let n = list.length - 1; n >= 0; n--)
			            	if(list[n]!==lrc[i-1])
			            		list[n].classList.remove("now");
	        }
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
	            if(styleList[i].indexOf("-webkit-")!==-1){
	                this.browser = "webkit";
	                break;
	            }
	            if(styleList[i].indexOf("-moz-")!==-1){
	                this.browser = "moz";
	                break;
	            }
	            if(styleList[i].indexOf("-o-")!==-1){
	                this.browser = "o";
	                break;
	            }
	            if(styleList[i].indexOf("-ms-")!==-1){
	                this.browser = "ms";
	                break;
	            }
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
	        if(start===undefined||end===undefined) return Math.random();
	        if(start>end) throw new RangeError("the EndNumber must be bigger than the StartNumber");
	        return (end-start)*Math.random()+start;
	    }
	    style(dom,property,content){
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
        if(document.body.clientWidth>content.offsetWidth){ //When the body is wide enough
            if(document.body.clientWidth>(content.offsetWidth+pageX))
                content.style.left = pageX + "px"; //Let the ContextMenu be right;
            if(document.body.clientWidth<(content.offsetWidth+pageX)) 
                content.style.left = pageX - content.offsetWidth + "px"; //Let the ContextMenu be left;
        }else{
            content.style.width = document.body.clientWidth + "px";
        }
        //Set the offset-y
        if(document.body.clientHeight>content.offsetHeight){
            if(document.body.clientHeight>(content.offsetHeight+pageY))
                content.style.top = pageY + "px";
            if(document.body.clientHeight<(content.offsetHeight+pageY))
                content.style.top = pageY - content.offsetHeight + "px";
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
if(window)window.cPlayer = cPlayer;
console.log("\n%ccPlayer%cv2.4.5%c\n\n","padding:7px;background:#cd3e45;font-family:'Sitka Heading';font-weight:bold;font-size:large;color:white","padding:7px;background:#ff5450;font-family:'Sitka Text';font-style:italic;font-size:large;color:#eee","");