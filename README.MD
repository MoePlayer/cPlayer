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
new cPlayer(必须的音乐URL字符串,可选的LRC歌词字符串,可选的自定义CLASS如white字符串);
```

如此生成一个DOM Element元素,可以用`appendChild`将其载入文档.

## 博客 插件

### Typecho

Look at Here: [https://github.com/journey-ad/cPlayer-Typecho-Plugin](https://github.com/journey-ad/cPlayer-Typecho-Plugin)
感谢journey AD的支持~
