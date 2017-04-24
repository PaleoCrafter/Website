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
            <div className="container">
            <Route exact path="/" component={Index}/>
            <Route path="/project/*" compoSnent={Project}/>
            <Route path="/login" component={Login}/>
            </div>
        </div>
    </BrowserRouter>
    , document.querySelector('#react-app')
);
