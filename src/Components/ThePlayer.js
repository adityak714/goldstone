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
    var playtoggle = document.getElementById("playpause");
    playtoggle.addEventListener("click", () => {
      !this.props.playingStatus
        ? event.target.playVideo()
        : event.target.pauseVideo();
    });

    var spinner = document.querySelector(".spinner");
    spinner.addEventListener("click", () => {
      !this.props.playingStatus
        ? event.target.playVideo()
        : event.target.pauseVideo();
    });

    var timerButton = document.getElementById("timerStarter");
    timerButton.addEventListener("click", () => {
      !this.props.playingStatus
        ? event.target.playVideo()
        : event.target.pauseVideo();
    });

    var nextbutton = document.getElementById("nextbutton");
    nextbutton.addEventListener("click", () => {
      event.target.nextVideo();
    });

    var prevbutton = document.getElementById("prevbutton");
    prevbutton.addEventListener("click", () => {
      event.target.previousVideo();
    });
  };
}
export default ThePlayer;