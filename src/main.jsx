import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import App from "./components/App";
import Index from "./components/pages/games/Index";
import Login from "./components/pages/Login";
import Project from "./components/pages/Project";

render(
    <BrowserRouter>
        <div>
            <App/>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <Route exact path="/" component={Index}/>
            <Route path="/project/*" component={Project}/>
            <Route path="/login" component={Login}/>
        </div>
    </BrowserRouter>
    , document.querySelector('#react-app')
);
