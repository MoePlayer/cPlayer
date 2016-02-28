**cPlayer Rewriting...**

# cPlayer

这也许是一个界面美观(也许)/功能完善的播放器(也许),并且**无jQuery依赖**!,我希望这个播放器可以帮助到诸位.

本播放器有几种使用方式,如下:
1.配套无歌词音乐使用

![1_1451402680678_withoutlyric.png](http://www.set-fire.com/uploads/files/1451402779957-withoutlyric.png) 

```html
<div class="player" src="http://[...].mp3"></div>
```

2.配套歌词使用

![0_1451402680587_withlyric.jpg](http://www.set-fire.com/uploads/files/1451402779206-withlyric.jpg) 

```html
<div class="player" src="http://[...].mp3">
	[00:00.00]...
	[00:00.00]...
	...
	[02:43.35]...
</div>
```

3.白色背景

![2_1451402680678_withwhiteskin.jpg](http://www.set-fire.com/uploads/files/1451402779865-withwhiteskin.jpg) 

```html
<div class="player white" src="http://[...].mp3">
	[00:00.00]...
	[00:00.00]...
	...
	[02:43.35]...
</div>
```

(白色样式可以配合1. / 2. 使用.)


(当然你需要link引用css,script引用js.)


嗯嗯受刺激了...特此记载一新方法...

```javascript
new cPlayer(JSON);
```

For Example

```javascript
new cPlayer({
	"url":"http://7tsyoo.com1.z0.glb.clouddn.com/monody.mp3",
	"lyric":"[by:阿西巴格达]\n[00:00.00]\n[02:48.50]Summer in the hills\n[02:51.68]Those hazy days I do remember\n[02:55.50]We were running still\n[02:58.06]Had the whole world at our feet\n[03:02.10]Watching seasons change\n[03:04.66]Our roads were lined with adventure\n[03:08.70]Mountains in the way\n[03:11.30]Couldn\'t keep us from the sea\n[03:14.50]Here we stand open arms\n[03:17.91]This is home where we are\n[03:21.65]Ever strong in the world that we made\n[03:28.75]I still hear you in the breeze\n[03:32.15]See your shadows in the trees\n[03:35.85]Holding on, memories never change\n[03:42.96]\n",
	"white":true,
	"video":false
});
```
JSON不能上字符串(加`""`或者`''`)
如此生成一个DOM Element元素,可以用`appendChild`将其载入文档.

### Video Support

```html
<div class="player video" src="http://[...].mp4"></div>
```
同样可以使用构造器生成.

```javascript
new cPlayer({
	"url":"http://7tsyoo.com1.z0.glb.clouddn.com/monody.mp3",
	"video":true
});
```

## TODO
- [x] 手机支持
- [ ] 全屏样式
- [ ] 手机样式
- [x] 视频支持
- [ ] 列表支持
- [ ] 多彩支持
- [ ] 上一首-下一首支持(切歌支持)
- [ ] ...

## 博客 插件

### Typecho

Look at Here: [https://github.com/journey-ad/cPlayer-Typecho-Plugin](https://github.com/journey-ad/cPlayer-Typecho-Plugin)
感谢journey AD的支持~
