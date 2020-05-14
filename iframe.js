'use strict';

var videos = document.getElementsByTagName("video");
for (var video of videos) {
    video.classList.add("video-js");
    var player = videojs(video,{
        controls: true,
        autoplay: false,
        preload: 'metadata',
        playbackRates: [0.5, 1, 1.5, 2],
        sources:[
            {
                src: video.src,
                type: video.type
            }
        ],
        userActions: {
            hotkeys: function(event) {
              // `spacebar` key
              if (event.which === 32) {
                  if (this.paused()) {
                    this.play();
                  }
                  else
                  {
                    this.pause();
                  }
              }
              // `rightarrow` key
              if (event.which === 39) {
                this.currentTime(this.currentTime() + 5);
              }
              // `leftarrow` key
              if (event.which === 37) {
                this.currentTime(this.currentTime() - 5);
              }
            }
        }
    });
}
