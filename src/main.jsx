import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import MMDNav from "./components/MMDNav";
import Index from "./components/pages/games/Index";
import Login from "./components/pages/Login";
import Project from "./components/pages/Project";
import Projects from "./components/pages/Projects";
import PrivateMessages from "./components/pages/user/Messages";
import PrivateMessage from "./components/pages/user/PrivateMessage";
import Notifications from "./components/pages/user/Notifications";
import Account from "./components/pages/user/Account";
import Members from "./components/pages/user/Members";
import Inventory from "./components/pages/user/account/Inventory";
import Search from "./components/pages/Search";
import MMDFooter from "./components/MMDFooter";

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
render(
    <BrowserRouter>
        <div>
            <MMDNav/>
            <div className="container">
                <Route exact path="/" component={Index}/>
                <Route path="/project/*" component={Project}/>
                <Route path="/projects/*" component={Projects}/>
                <Route path="/members/" component={Members}/>
                <Route path="/login" component={Login}/>
                <Route exact path="/private-messages" component={PrivateMessages}/>
                <Route path="/private-messages/*" component={PrivateMessage}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/account" component={Account}/>
                <Route path="/inventory" component={Inventory}/>
                <Route path="/search" component={Search}/>
            </div>
            <MMDFooter/>
        </div>
    </BrowserRouter>
    , document.querySelector('#react-app')
);