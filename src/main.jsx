import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";

import Index from "./components/pages/Index";

import Logout from "./components/pages/user/Logout";
import Login from "./components/pages/user/Login";
import Register from "./components/pages/user/Register";

import E404 from "./components/pages/E404";
import Minecraft from "./components/pages/minecraft/Minecraft";
import Project from "./components/pages/minecraft/project/Project";
import ProjectFiles from "./components/pages/minecraft/project/ProjectFiles";
import ProjectUploadFile from "./components/pages/minecraft/project/ProjectUploadFile";
import ProjectSettings from "./components/pages/minecraft/project/ProjectSettings";

import Projects from "./components/pages/minecraft/projectList/Projects";

import Account from "./components/pages/user/account/Account";
import AccountProjects from "./components/pages/user/account/AccountProjects";
import AccountSettings from "./components/pages/user/account/AccountSettings";
import AccountSecurity from "./components/pages/user/account/AccountSecurity";

import MMDNav from "./components/MMDNav";
import MMDFooter from "./components/MMDFooter";
import ProjectsCreate from "./components/pages/minecraft/projectList/ProjectsCreate";

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
render(
    <BrowserRouter>
        <div>
            <Route render={(props) => {
                return <MMDNav location={props.location}/>
            }}/>

            <Switch>
                <Route exact path="/" component={Index}/>

                <Route exact path="/minecraft/" component={Minecraft}/>

                <Route exact path="/minecraft/project/:slug/settings" component={ProjectSettings}/>
                <Route exact path="/minecraft/project/:slug/uploadfile" component={ProjectUploadFile}/>
                <Route exact path="/minecraft/project/:slug/files" component={ProjectFiles}/>
                <Route exact path="/minecraft/project/:slug/" component={Project}/>

                <Route exact path="/minecraft/projects/:slug/create/" component={ProjectsCreate}/>
                <Route exact path="/minecraft/projects/:slug" component={Projects}/>

                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/register" component={Register}/>

                <Route exact path="/account/projects" component={AccountProjects}/>
                <Route exact path="/account/settings" component={AccountSettings}/>
                <Route exact path="/account/security" component={AccountSecurity}/>
                <Route exact path="/account" component={Account}/>

                <Route component={E404}/>
            </Switch>
            <MMDFooter/>
        </div>
    </BrowserRouter>
    , document.querySelector('#react-app')
);