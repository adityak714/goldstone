import React,{Component} from "react";
import YouTube from 'react-youtube';

class ThePlayer extends Component {
  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 0
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
  };
}
export default ThePlayer;