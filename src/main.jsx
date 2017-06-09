import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";

import Index from "./components/pages/Index";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateMessages from "./components/pages/user/Messages";
import PrivateMessage from "./components/pages/user/PrivateMessage";
import Notifications from "./components/pages/user/Notifications";
import Account from "./components/pages/user/Account";
import Members from "./components/pages/user/Members";
import Search from "./components/pages/Search";
import GenericNotFound from "./components/pages/ErrorNotFound";
import Minecraft from "./components/pages/minecraft/Minecraft";
import Project from "./components/pages/minecraft/Project";
import Projects from "./components/pages/minecraft/Projects";

import MMDNav from "./components/MMDNav";
import MMDFooter from "./components/MMDFooter";

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
render(
    <BrowserRouter>
        <div>
            <MMDNav/>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Index}/>

                    <Route exact path="/minecraft/" component={Minecraft}/>
                    <Route path="/minecraft/project/*" component={Project}/>
                    <Route path="/minecraft/projects/*" component={Projects}/>

                    <Route path="/members/" component={Members}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route exact path="/private-messages" component={PrivateMessages}/>
                    <Route path="/private-messages/*" component={PrivateMessage}/>
                    <Route path="/notifications" component={Notifications}/>
                    <Route path="/account" component={Account}/>
                    <Route path="/search" component={Search}/>
                    <Route component={GenericNotFound}/>
                </Switch>
            </div>
            <MMDFooter/>
        </div>
    </BrowserRouter>
    , document.querySelector('#react-app')
);