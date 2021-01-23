import React,{useEffect} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./Main";
import Settings from "./Settings";

const App = () => {

    useEffect(()=>{
        const preferences= {
            playlistId: "PLx65qkgCWNJIs3FPaj8JZhduXSpQ_ZfvL",
            continue: false,
        }
        if(!localStorage.getItem("preferences")){
            localStorage.setItem("preferences", JSON.stringify(preferences));
        }
    })

    return (
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/settings" exact component={Settings} />
        </Router>
    )
}

export default App
