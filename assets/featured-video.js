class FeaturedVideo extends HTMLElement{constructor(){super()}connectedCallback(){this.play_buttons=this.querySelectorAll(".featured-video--play svg, .featured-video--play-mobile svg"),this.section_id=this.getAttribute("data-section-id"),this.thumbnail="true"===this.getAttribute("data-thumbnail"),this.video_type=this.getAttribute("data-video-type"),this.video_id=this.getAttribute("data-video-id"),this.vimeo_vars={id:this.video_id,autopause:0,playsinline:0,title:0},this.youtube_vars={enablejsapi:1,origin:window.location.href,playsinline:1,fs:0},this.thumbnail?this.playButtonListener():this.load()}load(){"vimeo"===this.video_type?theme.utils.libraryLoader("vimeo","https://player.vimeo.com/api/player.js",()=>this.insertVimeoPlayer()):(window.on("theme:youtube:apiReady",()=>this.insertYoutubePlayer()),theme.utils.libraryLoader("youtube","https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady))}insertYoutubePlayer(){void 0!==YT.Player&&(this.player=new YT.Player("player-"+this.section_id,{videoId:this.video_id,playerVars:this.youtube_vars,events:{onReady:e=>this.youtubeReady(e.target),onStateChange:e=>this.youtubeEvents(e)}}))}youtubeReady(e){this.thumbnail||(e.mute(),this.disablePlayerFocus()),e.playVideo()}youtubeEvents(e){const t=e.target;this.thumbnail&&0===e.data?(t.seekTo(0),t.pauseVideo()):this.thumbnail||1!==e.data||(e=t.getDuration()-t.getCurrentTime(),this.rewindTO&&clearTimeout(this.rewindTO),this.rewindTO=setTimeout(()=>{t.seekTo(0)},1e3*(e-.01)))}insertVimeoPlayer(){this.thumbnail||(this.vimeo_vars.playsinline=1,this.vimeo_vars.muted=1,this.vimeo_vars.background=1,this.vimeo_vars.loop=1),this.player=new Vimeo.Player("player-"+this.section_id,this.vimeo_vars),this.thumbnail?this.vimeoEvents():this.player.ready().then(()=>this.disablePlayerFocus()),this.player.play()}vimeoEvents(){this.player.getDuration().then(e=>{this.player.addCuePoint(e-.3,{})}),this.player.on("cuepoint",()=>{this.player.setCurrentTime(0),this.player.pause()})}disablePlayerFocus(){this.querySelector("iframe").setAttribute("tabindex","-1")}playButtonListener(){this.play_buttons.forEach(e=>{e.setAttribute("tabindex","0"),e.on("click keydown",e=>{"keydown"===e.type&&"Enter"!==e.key||(this.load(),this.hideThumbnail())})})}hideThumbnail(){setTimeout(()=>{const e=this.querySelectorAll(".featured-video--header, .featured-video--thumbnail, .featured-video--play-mobile");e.forEach(e=>e.style.display="none")},400)}}customElements.define("featured-video-root",FeaturedVideo),window.onYouTubeIframeAPIReady=window.onYouTubeIframeAPIReady||function(){window.trigger("theme:youtube:apiReady")};