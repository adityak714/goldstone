import React, { Component } from 'react';
import ThePlayer from './ThePlayer'
import $ from 'jquery';
import '../css/MusicPlayer.css';
require('dotenv').config();

class MusicPlayer extends Component {
  constructor() {
    super();
    this.state = {
      playingStatus: false,
      nowPlaying: "",
      vidIdArray: [],
      spinning: false
    };
  }

  componentDidMount = () => {
    $.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        part: "snippet",
        maxResults: 10,
        playlistId: "PLx65qkgCWNJIs3FPaj8JZhduXSpQ_ZfvL",
        key: process.env.REACT_APP_API_KEY
      },
      data => {
        const refined = data.items.map(item => {
          return {
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url,
            videoId: item.snippet.resourceId.videoId
          };
        });

        const finalData = this.shuffle(refined);
        const vidIdArray = finalData.map(vid => vid.videoId);
        this.setState({vidIdArray: vidIdArray });
      }
    );
  };

  shuffle = array => {
    var i = array.length, j = 0, temp;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  handleVideoInfo = (videoData) => {
    this.setState({ nowPlaying: videoData, thumbnail: `http://img.youtube.com/vi/${videoData.video_id}/0.jpg`})
  }

  getPlayingStatus = status => {
    this.setState({playingStatus:status});
  }

  render() {
    const thumbnailBG = {
      background: 'url('+this.state.thumbnail+') no-repeat center'
    }
    return (
      <div className="music">
        <p>Now Playing</p>
        <h3>{this.state.nowPlaying.title}</h3>
        <div className="spinner" id="spinner" onClick={this.spinHandler} style={thumbnailBG}>
          <div className="hole">
            <div className="secondhole"></div>
          </div>
        </div>
        <div id="player"></div>
        <div className="button-container">
          <button id="prevbutton" className="buttons">
            <i className="material-icons-round">skip_previous</i>
        </button>
          <button id="playpause" className="buttons">
            <i className="material-icons-round">{this.state.playingStatus ? "pause_circle_filled" : "play_circle_filled"}</i>
          </button>
          <button id="nextbutton" className="buttons">
            <i className="material-icons-round">skip_next</i>
          </button>
        </div>
        <ThePlayer
          videoId={this.state.nowPlaying.videoId}
          playlistArray={this.state.vidIdArray}
          playingStatus={this.state.playingStatus}
          sendVideoInfo={this.handleVideoInfo}
          sendStatus = {this.getPlayingStatus}
        />
      </div>
    );
  }
}

export default MusicPlayer;