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
    event.target.cuePlaylist({
      listType: 'playlist',
      list: localStorage.getItem("preferences") ? `${JSON.parse(localStorage.getItem('preferences')).playlistId}` : "PLx65qkgCWNJIs3FPaj8JZhduXSpQ_ZfvL",
      index: JSON.parse(localStorage.getItem('preferences')).shuffle ? Math.round(Math.random() * (10-1) + 1) : 0
    });
    event.target.setPlaybackQuality('low');

    const setVolume = (vol) => {
      event.target.setVolume(vol);
    }
    setVolume(this.state.volume);

    const setShuffle = () =>{ 
      event.target.setShuffle(JSON.parse(localStorage.getItem('preferences')).shuffle);
      event.target.setLoop(true);
    }

    const playtoggle = document.getElementById("playpause");
    playtoggle.addEventListener("click", () => {
      !this.props.playingStatus
        ? event.target.playVideo()
        : event.target.pauseVideo();
      setTimeout(setShuffle, 1000);
    });

    const spinner = document.querySelector(".spinner");
    spinner.addEventListener("click", () => {
      !this.props.playingStatus
        ? event.target.playVideo()
        : event.target.pauseVideo();
      setTimeout(setShuffle, 1000);
    });

    spinner.addEventListener("timerStatus", (e) => {
      e.detail.value
        ? event.target.playVideo()
        : event.target.pauseVideo();
      setTimeout(setShuffle, 1000);
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
    });
    this.props.playerReady(true);
  };
}
export default ThePlayer;