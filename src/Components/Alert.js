import React from 'react';
import '../css/Alert.css';

function Alert(props){
    return <div className="alert">
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

export default Alert;