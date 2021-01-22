import React, {Component} from "react";
import '../css/Timer.css';
import soundfile from '../assets/session_completed.ogg';

let countdown, statusEvent;

class Timer extends Component{
    constructor(){
        super();
        this.state = {
            sessionLength: 1500,
            started: false,
            time: "25:00",
        }
    }

    componentDidMount = () =>{
        const spinner = document.querySelector(".spinner");
        statusEvent = (val) =>{
            const event = new CustomEvent('timerStatus',{
                detail: {
                    value: val
                }
            })
            spinner.dispatchEvent(event);
        }
    }

    timer = () => {
        this.setState({started: true});    
        statusEvent(true);
        const audioInit = new Audio(soundfile);
        const seconds = this.state.sessionLength;
        const now = Date.now();
        const then = now + seconds * 1000;
        countdown = setInterval(()=>{
            const secondsLeft = Math.round((then - Date.now())/1000);
            //check if timer should stop
            if(secondsLeft <= 0){
                this.sessionEnded(audioInit);
            }
            this.displayCountdown(secondsLeft);
        },1000)
    }

    displayCountdown = (seconds) =>{
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const displayedTime = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        this.setState({time: displayedTime})
    }   

    clearTimer = () => {
        statusEvent(false);
        clearInterval(countdown);
        this.setState({started: false, time: '25:00' })
    }

    sessionEnded = (audio) => {
        this.props.alertStatus(true);
        statusEvent(false);
        audio.play();
        clearInterval(countdown);
        if (localStorage.getItem('focusedTime')) {
            localStorage.setItem('focusedTime', Number(localStorage.getItem('focusedTime')) + 25)
        }
        else {
            localStorage.setItem('focusedTime', 25)
        }
        this.props.sendFocusedTime(localStorage.getItem("focusedTime"));
        // Temp
        setTimeout(()=>{
            this.setState({ started: false, time: "25:00", timeFocused: localStorage.getItem("focusedTime")});
        }, 500);
    }

    render(){
        return (
        <div className="timer">
            <p>Time Remaining</p>
            <h1>{this.state.time}</h1>
            <button id="timerStarter" onClick={this.state.started ? this.clearTimer : this.timer}>{!this.state.started ? 'Start Timer' : 'Quit!'}</button>
        </div>
        );
    }
}

export default Timer;