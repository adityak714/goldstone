import React, { Component } from 'react';
import MusicPlayer from './MusicPlayer';
import Timer from './Timer';   
import {Link} from 'react-router-dom';
import '../css/Main.css';

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            expanded: "",
            focusedTime: 0,
        }
    }

    componentDidMount = () =>{

        this.setState({ 
            expanded: document.querySelector(".bulk-container").classList.contains("active") ? true : false, 
            focusedTime: localStorage.getItem("focusedTime") ? localStorage.getItem("focusedTime") : 0
        });

        const button = document.getElementById("toggle");
        button.addEventListener("click", () => {
            const cont = document.querySelector(".bulk-container");
            cont.classList.toggle("active");
            this.setState({ expanded: document.querySelector(".bulk-container").classList.contains("active") ? true : false, });
        });
    }

    getFocusedTime = (time) =>{
        this.setState({focusedTime: time});
    }

    render() {
        return (
            <div>
                <div className="main-container">
                    <div className="heading">
                        <h1>Goldstone.</h1>
                        <div>
                            <p>Time focused this week</p>
                            <p>{this.state.focusedTime} minutes</p>
                        </div>
                    </div>
                    <div className="bulk-container">
                        <button id="toggle">
                            <i className="material-icons-round">{this.state.expanded ? "chevron_left" : "queue_music"}</i>
                        </button>
                        <Timer sendFocusedTime={this.getFocusedTime} alertStatus={this.setAlertStatus}/>
                        <MusicPlayer />   
                    </div>
                    <div className="footer">
                        <a href="mailto:iamsh4r10@gmail.com" target="_blank"><i className="material-icons-round">email</i></a>
                        <p>Copyright {new Date().getFullYear()}, <span><a rel="noopener noreferrer" href="https://github.com/sh4r10" target="_blank">SH4R10</a></span>, All Rights Reserved.</p>
                        <Link id="settings" to="/settings"><i className="material-icons-round">settings</i></Link>
                    </div>
                </div>
            </div>
        )
    }
}
