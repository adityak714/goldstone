import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import '../css/Settings.css';

const Settings = () => {

    const [pref, setPref] =  useState({
        playlistId: "",
        continue: false
    })

    useEffect(()=>{
        setPref(JSON.parse(localStorage.getItem("preferences")));
    }, [])

    const inputChange = (e) => {
        setPref(({...pref, [e.target.name]: e.target.value}));
    }

    const submit = (e) => {
        e.preventDefault();
        var link = pref.playlistId.split("=");
        const playlistId = link.pop();
        setPref(({...pref, playlistId: playlistId}));
        var local = JSON.parse(localStorage.getItem("preferences"));
        local.playlistId = playlistId;
        local.continue = pref.continue;
        localStorage.setItem("preferences", JSON.stringify(local));
    }

    const restore = (e) => {
        e.preventDefault();
        localStorage.removeItem("preferences");
    }


    return (
        <div>
            <div className="settings-header">
                <h1><a style={{"color": "var(--primary)"}} href="/"><i className="backbutton material-icons-round">arrow_back</i></a>Settings.</h1>
            </div>
            <div className="settings-display">
                <form className="settings-form" onSubmit={submit}>
                    <div className="settings-item">
                        <p>Youtube Playlist URL</p>
                        <input className="playlistLink" name="playlistId" type="text" placeholder="URL" value={pref.playlistId} onChange={inputChange} />
                    </div>
                    <div className="settings-item">
                        <p>Continue playing after timer</p>
                        <div class="toggle-container">
                            <input id="switch" className="continueCheck" name="continue" type="checkbox" checked={pref.continue} onChange={(e) => setPref(({...pref, [e.currentTarget.name]: e.currentTarget.checked}))} />
                            <label for="switch">Toggle</label>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="btn" onClick={restore}>Restore Defaults</button>
                        <button className="btn btn-primary" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
            <div className="footer">
                <a href="mailto:iamsh4r10@gmail.com" target="_blank"><i className="material-icons-round">email</i></a>
                <p>Copyright {new Date().getFullYear()}, <span><a rel="noopener noreferrer" href="https://github.com/sh4r10" target="_blank">SH4R10</a></span>, All Rights Reserved.</p>
                <a id="paypal" target="_blank" href="https://paypal.me/sh4r10"><i class="fab fa-paypal"></i></a>
            </div>
        </div>
    )
}

export default Settings