import cplayer from "./lib";
import { IAudioItem } from "./lib/interfaces";
import cplayerView from "./lib/view";

require('./neko.css');
require('file-loader?name=manifest.json!./manifest.json');
require('highlight.js/styles/ocean.css');

const hljs = require('highlight.js/lib/highlight');
const javascript = require('highlight.js/lib/languages/javascript');
const xml = require('highlight.js/lib/languages/xml');
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

hljs.initHighlightingOnLoad();

window.addEventListener("load",
  function () {
    function from163(id: string) {
      if (!id) throw new Error("Unable Property.");
      return fetch("https://music.huaji8.top/?id=" + id).then(function (res: any) { return res.json() }).then((data) => {
        let obj = {
          name: data.info.songs[0].name,
          artist: data.info.songs[0].ar.map(function (ar: any) { return ar.name }).join(','),
          poster: data.pic.url,
          lyric: data.lyric.lyric,
          sublyric: data.lyric.tlyric,
          src: data.url.url,
          album: data.info.songs[0].al.name
        }
        return obj;
      })
    }

    let playlist: IAudioItem[] = [
      {
        src: require('file-loader!./example/ねこぼーろ - ひねくれネジと雨.mp3'),
        poster: require('./example/ねこぼーろ - ひねくれネジと雨.png'),
        name: 'ひねくれネジと雨',
        artist: 'ねこぼーろ',
        lyric: '[by:吃土少女Z]\n[00:00.00] 作曲 : ねこぼーろ\n[00:01.00] 作词 : ねこぼーろ\n[00:35.07]「ねえ 鼓膜 溶ける感覚\n[00:39.73]指の 先で 光る体温\n[00:45.13]僕は 未だ わからないよ」\n[00:50.50]\n[00:51.00]時が経てば 忘れてしまう\n[00:55.50]いつかの君も 色褪せてしまう\n[01:00.96]でも僕は 未だ、「忘れないよ」\n[01:06.78]\n[01:07.44]まわる まわる 世界は\n[01:09.71]僕の事など無視をして\n[01:12.78]何も知らずに そっと\n[01:15.10]僕の心 錆び付かせる\n[01:18.16]もう君を守るなんて言えないな\n[01:22.94]\n[01:23.44]こわれ こわれる 僕は\n[01:25.92]誰も 信じられなくなる\n[01:28.96]「誰も知らずに そっと\n[01:31.30]雨に溶けて 無くなる」とか\n[01:34.33]ああそんなふざけた事 言えないな ああ\n[01:41.10]\n[01:45.19]ああ 鼓膜 突き破る赤\n[01:49.52]頭の裏で 溶けてなくなる\n[01:54.90]そう僕はまだ 聴こえ「ないよ」\n[02:00.99]\n[02:01.35]まわる まわる 世界は\n[02:03.65]僕の事など無視をして\n[02:06.73]何も知らずに そっと\n[02:09.06]僕の鼓動 錆び付かせる\n[02:12.06]もう君を見る事無く消えたいな ああ\n[02:18.19]\n[02:31.74]\n[02:33.74]相対 曖昧な 返答でごまかし\n[02:39.09]大体 反対な 顔を作る\n[02:44.49]後悔 先に立たずだ\n[02:48.55]\n[02:49.98]―nonsense―\n[03:20.32]\n[03:22.32]まわる まわる 世界は\n[03:24.57]僕の事など無視をして\n[03:27.60]何も知らずに そっと\n[03:29.92]僕の心 錆び付かせる\n[03:32.93]「もう君を守るなんて言えないな」\n[03:37.84]\n[03:38.55]こわれ こわれる 僕は\n[03:40.78]誰も 信じられなくなる\n[03:43.77]「誰も知らずに そっと\n[03:46.11]雨に溶けて 無くなる」とか\n[03:49.20]ああそんなふざけた事言えないな\n[03:53.88]\n[03:54.64]ああ\n[03:55.81]まわる\n[03:56.33]まわる\n[03:56.96]まわるまわる\n[03:58.26]まわるまわるまわる\n[04:00.95]これで終わる落ちる目眩だ\n[04:04.67]ああ ああ ああ ああ ああ\n[04:12.14]\n',
        sublyric: '[by:Tsumugi-mio]\n[00:24.23]\n[00:35.07]呐呐 鼓膜 快要融化的感觉\n[00:39.73]指尖 前面 是那光芒的体温\n[00:45.13]现在 的我 还未曾知晓\n[00:51.00]我即将要忘记 那遥远的时光\n[00:55.50]总有一天你也 将会褪去颜色\n[01:00.96]「但是现在的我还 没有 忘记哟」\n[01:07.44]回转的 回转的 这个世界将我全然无视\n[01:09.71]就像什么都不知道一样\n[01:12.78]悄悄地\n[01:15.10]我的心生锈\n[01:18.16]「会守护你的」\n[01:23.44]这句话已经说不出口\n[01:25.92]谁也不会相信\n[01:28.96]悄悄地\n[01:31.30]像雨一样融化掉\n[01:34.33]像这样不可能的事情 我是说不出口的\n[01:45.19]啊啊 扎破 鼓膜的赤红颜色\n[01:49.52]头脑里面 就像要溶化了一样\n[01:54.90]这样的我 再一次变得「听不见了」\n[02:01.35]回转的 回转的 这个世界将我全然无视\n[02:03.65]就像什么都不知道一样\n[02:06.73]悄悄地\n[02:09.06]让我的心最后的跳动生锈\n[02:12.06]你的事情已经像开始就不存在一般消失掉了啊\n[02:33.74]暧昧的回答 那才是谎话\n[02:39.09]你做出的大致都\n[02:44.49]是反对的神情呢\n[02:49.98]- - - - - - - -\n[03:22.32]回转的 回转的 这个世界将我全然无视\n[03:24.57]就像什么都不知道一样\n[03:27.60]悄悄地\n[03:29.92]使我的心生锈\n[03:32.93]「会守护你的」\n[03:38.55]这句话已经说不出口\n[03:40.78]快要坏掉 快要坏掉的\n[03:43.77]谁也不知道 悄悄地\n[03:46.11]像雨一样融化掉 消失不见\n[03:49.20]之类的像这样不可能的事情 说不出口\n[03:54.64]啊啊\n[03:55.81]回转着\n[03:56.33]回转着\n[03:56.96]回转回转着\n[03:58.26]回转着回转着回转着\n[04:00.95]终末时遗留下的头晕\n[04:04.67]啊啊 啊啊 啊啊 啊啊\n',
        album: 'TEXT'
      },
      {
        src: require('file-loader!./example/FELT - In my room.mp3'),
        poster: require('./example/FELT - In my room.jpg'),
        name: 'In my room',
        artist: 'FELT',
        album: 'Grow Color'
      },
      {
        src: require('file-loader!./example/ボーカロイドたちがただﾃｯﾃｰﾃﾚｯﾃｰするだけ.mp4'),
        poster: require('./example/ボーカロイドたちがただﾃｯﾃｰﾃﾚｯﾃｰするだけ.png'),
        name: 'ボーカロイドたちがただﾃｯﾃｰﾃﾚｯﾃｰするだけ',
        type: 'video'
      }
    ];

    const options = {
      zoomOutKana: true,
      volume: 0.75,
      dropDownMenuMode: 'bottom'
    };

    let players = [ new cplayer({
      ...options,
      playlist,
      element: document.getElementById('app1')
    }), new cplayer({
      ...options,
      playlist: playlist.push(playlist.shift()) && playlist,
      element: document.getElementById('app2'),
      dark: true
    }), new cplayer({
      ...options,
      playlist: playlist.push(playlist.shift()) && playlist,
      element: document.getElementById('app3'),
      big: true
    }), new cplayer({
      ...options,
      playlist: playlist.push(playlist.shift()) && playlist,
      element: document.getElementById('app4'),
      big: true,
      dark: true,
      autoplay: true
    })];

    (window as any).cplayerView = cplayerView;

    document.getElementById('add163').addEventListener("click", () => {
      let id163 = prompt('输入音乐的网易云ID:', '').trim();
      if (id163) {
        from163(id163).then(audio => {
          players.forEach(player => {
            player.view.showPlaylist();
            setTimeout(() => {
              player.add(audio);
            }, 500);
          })
        })
      }
    });

    document.getElementById('openplaylist').addEventListener("click", (e) => {
      players.forEach(player => player.view.showPlaylist());
    });

    document.getElementById('closeplaylist').addEventListener("click", (e) => {
      players.forEach(player => player.view.showInfo());
    });

    document.getElementById('remove').addEventListener("click", (e) => {
      players.forEach(player => player.view.showPlaylist());
      setTimeout(() => {
        players.forEach(player => player.remove(player.playlist[player.playlist.length - 1]));
      }, 600)
    });

    players[0].on('ended', () =>{
      console.log('Event: ended');
    }).on('play', () => {
      console.log('Event: play');
    }).on('pause', () => {
      console.log('Event: pause');
    }).on('playmodechange', () => {
      console.log('Event: playmodechange');
    }).on('openaudio', () => {
      console.log('Event: openaudio');
    }).on('playstatechange', () => {
      console.log('Event: playstatechange');
    }).on('started', () => {
      console.log('Event: started');
    });

    (window as any).demoPlayer = players[0];
    (window as any).demoPlayers = players;
    (window as any).playlist = playlist;
  }
)

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
