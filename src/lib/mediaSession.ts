import cplayer from './';
import { IAudioItem } from '../lib/interfaces';

const defaultPoster = require('../defaultposter.jpg')

export function cplayerMediaSessionPlugin(player: cplayer)
{
  if ('mediaSession' in navigator) {
    if (player.nowplay) navigator.mediaSession.metadata = mediaMetadata(player.nowplay);
    navigator.mediaSession.setActionHandler('play', () => player.play());
    navigator.mediaSession.setActionHandler('pause', () => player.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => player.prev());
    navigator.mediaSession.setActionHandler('nexttrack', () => player.next());
    player.on('openaudio', () => {
      navigator.mediaSession.metadata = mediaMetadata(player.nowplay);
    })
  }
}

export function mediaMetadata(audio: IAudioItem) {
  return new MediaMetadata({
    title: audio.name,
    artist: audio.artist,
    album: audio.album,
    artwork: [
      {
        sizes: '720x720',
        src: audio.poster || defaultPoster
      }
    ]
  });
}
