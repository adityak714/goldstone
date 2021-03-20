import React,{Component} from "react";
import YouTube from 'react-youtube';

class ThePlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      'volume': 50
    };
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 0,
      }
    };

    return (
      <YouTube
        opts={opts}
        onReady={this.PlayerReady}
        onStateChange={this.PlayerChanged}
        onPlay={this.PlayerPlaying}
        onPause={this.PlayerPaused}
      />
    );
  }

  PlayerPlaying = event => {
    this.props.sendStatus(true);
  };

  PlayerPaused = event => {
    this.props.sendStatus(false);
  };

  PlayerChanged = event => {
    const vidInfo = event.target.getVideoData();
    this.props.sendVideoInfo(vidInfo);
  };

  PlayerReady = event => {
    event.target.cuePlaylist(this.props.playlistArray);

    event.target.setPlaybackQuality('low');

    const setVolume = (vol) => {
      event.target.setVolume(vol);
    }

    setVolume(this.state.volume);

    const playtoggle = document.getElementById("playpause");
    playtoggle.addEventListener("click", () => {
      !this.props.playingStatus
        ? event.target.playVideo()
        : event.target.pauseVideo();
    });

    const spinner = document.querySelector(".spinner");
    spinner.addEventListener("click", () => {
      !this.props.playingStatus
        ? event.target.playVideo()
        : event.target.pauseVideo();
    });

    spinner.addEventListener("timerStatus", (e) => {
      e.detail.value
        ? event.target.playVideo()
        : event.target.pauseVideo();
    });

    const nextbutton = document.getElementById("nextbutton");
    nextbutton.addEventListener("click", () => {
      event.target.nextVideo();
    });

    const prevbutton = document.getElementById("prevbutton");
    prevbutton.addEventListener("click", () => {
      event.target.previousVideo();
    });

    document.addEventListener("keydown", (e)=>{
      switch(e.code){
        case "ArrowUp":
          this.setState(prev => {
            if(prev.volume != 100){
              setVolume(prev.volume +5);
              return ({
                'volume': prev.volume+5
              });
            }
          });
          break;
        case "ArrowDown":
          this.setState(prev => {
            if(prev.volume != 0){
              setVolume(prev.volume-5);
              return ({
                'volume': prev.volume-5
              });
            }
          });
          break;
        default:
          break;
      }
    })

  };
}
export default ThePlayer;