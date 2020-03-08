import React, {Component} from "react";
import '../css/Timer.css';

let countdown;

class Timer extends Component{
    constructor(){
        super();
        this.state = {
            sessionLength: 1500,
            started: false,
            time: "25:00",
            thug: ''
        }
    }

    timer = () => {
        const seconds = this.state.sessionLength;
        const now = Date.now();
        const then = now + seconds * 1000;
        countdown = setInterval(()=>{
            const secondsLeft = Math.round((then - Date.now())/1000);
            //check if timer should stop
            if(secondsLeft <= 0){
                this.sessionEnded();
            }
            this.displayCountdown(secondsLeft);
        },1000)
    }

    displayCountdown = (seconds) =>{
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const displayedTime = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        this.setState({time: displayedTime, started: true})
    }   

    clearTimer = () => {
        clearInterval(countdown);
        this.setState({started: false, time: '25:00' })
    }

    sessionEnded = () => {
        clearInterval(countdown);
        if (localStorage.getItem('focusedTime')) {
            localStorage.setItem('focusedTime', Number(localStorage.getItem('focusedTime')) + 25)
        }
        else {
            localStorage.setItem('focusedTime', 25)
        }
        this.setState({ started: false, time: "25:00", timeFocused: localStorage.getItem("focusedTime")});
        this.props.sendFocusedTime(this.localStorage.getItem("focusedTime"));
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