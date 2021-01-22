import React, {useEffect} from 'react';
import '../css/Alert.css';

const Alert = (props) => {
    useEffect(() => {
        quitHandler(props.showAlert);
    }, [props.showAlert])
    return <div id="alert-container" className="alert">
        <div className="alert-content">
            <button className="exit" id="alert-quitter"><i className="material-icons-round">close</i></button>
            <h1>What would you like to do?</h1>
            <div className="alert-button-container">
                <button className="alert-button primary">5 Minute Break?</button>
                <button className="alert-button secondary">Continue Studying!</button>
            </div>
        </div>
    </div>;
}

const quitHandler = (bool) => {
    if(bool){
        document.getElementById("alert-container").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }
    else{
        document.getElementById("alert-container").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }
}

export default Alert;