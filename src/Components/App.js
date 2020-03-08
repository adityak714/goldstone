import React, { Component } from "react";
import MusicPlayer from './MusicPlayer';
import Timer from './Timer';   
import $ from 'jquery'; 
import '../css/App.css';

class App extends Component{
    constructor(){
        super();
        this.state = {
            expanded: "",
            focusedTime: ""
        }
    }

    componentDidMount = () =>{
        this.setState({ expanded: document.querySelector(".bulk-container").classList.contains("active") ? true : false })
        const button = document.getElementById("toggle");
        button.addEventListener("click", () => {
            const cont = document.querySelector(".bulk-container");
            cont.classList.toggle("active");
            this.setState({ expanded: document.querySelector(".bulk-container").classList.contains("active") ? true : false })
        })
    }

    getTimerStatus = (boolean) =>{
        this.setState({timerStatus: boolean});
    }

    getFocusedTime = (time) =>{
        this.setState({focusedTime: time});
    }

    render(){
        return(
            <div className="main-container">
                <div className="heading">
                    <h1>Goldstone.</h1>
                    <div>
                        <p>Time focused this week</p>
                        <p>{localStorage.getItem("focusedTime") ? localStorage.getItem("focusedTime"):0} minutes</p>
                    </div>
                </div>
                <div className="bulk-container">
                    <button id="toggle">
                        <i className="material-icons-round">{this.state.expanded ? "chevron_left" : "queue_music"}</i>
                    </button>
                    <Timer sendTimerStatus={this.getTimerStatus}/>
                    <MusicPlayer sendFocusedTime={this.getFocusedTime}/>   
                </div>
                <div className="footer">
                    <i className="material-icons-round">email</i>
                    <p>Copyright {new Date().getFullYear()}, <span><a href="https://github.com/sh4r10" target="_blank">SH4R10</a></span>, All Rights Reserved.</p>
                    <i className="material-icons-round">info</i>
                </div>
            </div>
        )
    }
}

export default App; 