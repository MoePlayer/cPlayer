"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPoster = require('../defaultposter.jpg');
function cplayerMediaSessionPlugin(player) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = mediaMetadata(player.nowplay);
        navigator.mediaSession.setActionHandler('play', () => player.play());
        navigator.mediaSession.setActionHandler('pause', () => player.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => player.prev());
        navigator.mediaSession.setActionHandler('nexttrack', () => player.next());
        player.on('openaudio', () => {
            navigator.mediaSession.metadata = mediaMetadata(player.nowplay);
        });
    }
}
exports.cplayerMediaSessionPlugin = cplayerMediaSessionPlugin;
function mediaMetadata(audio) {
    return new MediaMetadata({
        title: audio.name,
        artist: audio.artist,
        album: audio.album,
        artwork: [
            { src: audio.poster || defaultPoster }
        ]
    });
}
exports.mediaMetadata = mediaMetadata;
//# sourceMappingURL=mediaSession.js.map