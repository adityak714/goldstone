import React, { Component } from 'react';
import $ from 'jquery';
require('dotenv').config();

class MusicPlayer extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            nowPlaying: '',
            previous: ''
        }
    }

    componentDidMount = () =>{
        $.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            part: "snippet",
            maxResults: 10,
            playlistId: "PLx65qkgCWNJIs3FPaj8JZhduXSpQ_ZfvL",
            key: process.env.REACT_APP_API_KEY
          },
          data => {
           const refined =  data.items.map(item => {
                              return {
                                title: item.snippet.title,
                                thumbnail: item.snippet.thumbnails.high.url,
                                videoId: item.snippet.resourceId.videoId
                              }
                            });
            this.setState({ data: refined });
            const random = Math.floor(Math.random() * this.state.data.length);
            this.setState({nowPlaying: refined[random]});
            console.log(refined);
          }
        );
    }

    render(){
        return(
          <div>
            <p>Now Playing: {this.state.nowPlaying.title}</p>
            <img src={this.state.nowPlaying.thumbnail} width={200}/>
          </div>
        )
    }
}

export default MusicPlayer;