import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Index from './components/pages/Index';

import Logout from './components/pages/user/Logout';
import Login from './components/pages/user/Login';
import Register from './components/pages/user/Register';

import E404 from './components/pages/E404';

import Minecraft from './components/pages/minecraft/Minecraft';
import Mods from './components/pages/minecraft/mods/Mods';
import ModFiles from './components/pages/minecraft/mods/ModFiles';
import ModUploadFile from './components/pages/minecraft/mods/ModUploadFile';
import ModSettings from './components/pages/minecraft/mods/ModSettings';

import ListMods from './components/pages/minecraft/ProjectList';
import CreateMod from './components/pages/minecraft/mods/CreateMod';

import Account from './components/pages/user/account/Account';
import AccountProjects from './components/pages/user/account/AccountProjects';
import AccountSettings from './components/pages/user/account/AccountSettings';
import AccountSecurity from './components/pages/user/account/AccountSecurity';

import DiluvNav from './components/DiluvNav';
import DiluvFooter from './components/DiluvFooter';

import userUtils from './utils/userUtils';

render(
    <BrowserRouter>
        <div>
            <Route render={(props) => <DiluvNav location={props.location}/>}/>

            <Switch>
                <Route exact path="/" component={Index}/>

                <Route exact path="/minecraft/" component={Minecraft}/>

                <Route exact path="/minecraft/project/:slug/settings" component={ModSettings}/>
                <Route exact path="/minecraft/project/:slug/upload" component={ModUploadFile}/>
                <Route exact path="/minecraft/project/:slug/files" component={ModFiles}/>
                <Route exact path="/minecraft/project/:slug/" component={Mods}/>

                <Route exact path="/minecraft/projects/mods/create/" component={CreateMod}/>
                <Route exact path="/minecraft/projects/:slug" component={ListMods}/>

                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/register" component={Register}/>

                <Route exact path="/account/projects" component={AccountProjects}/>
                <Route exact path="/account/settings" component={AccountSettings}/>
                <Route exact path="/account/security" component={AccountSecurity}/>
                <Route exact path="/account" component={Account}/>

                <Route component={E404}/>
            </Switch>
            <DiluvFooter/>
        </div>
    </BrowserRouter>
    , document.querySelector('#react-app'),
);
