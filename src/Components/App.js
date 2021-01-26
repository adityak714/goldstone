import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./Main";
import Settings from "./Settings";

const App = () => {
    const [darkMode, setDarkmode] = useState(()=>{
        if(localStorage.getItem("preferences")){
            return JSON.parse(localStorage.getItem("preferences")).darkmode;
        }
        else{
            return true;
        }
    });

    useEffect(()=>{
        const preferences= {
            playlistId: "PLx65qkgCWNJIs3FPaj8JZhduXSpQ_ZfvL",
            continue: false,
            shuffle: true,
            darkmode: darkMode,
        }
        if(!localStorage.getItem("preferences")){
            localStorage.setItem("preferences", JSON.stringify(preferences));
        }
    })

    return (
        <Router>
            <Route path="/" exact component={()=> <Main darkmode={darkMode}/>} />
            <Route path="/settings" exact component={()=><Settings darkmode={darkMode} setDarkmode={setDarkmode}/>} />
        </Router>
    )
}

export default App;