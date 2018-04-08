import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Index from './pages/Index';

import Logout from './pages/user/Logout';
import Login from './pages/user/Login';
import MFA from './pages/user/MFA';
import Register from './pages/user/Register';

import E404 from './pages/E404';

import Minecraft from './pages/minecraft/Minecraft';
import Mods from './pages/minecraft/mods/ModOverview';
import ModFiles from './pages/minecraft/mods/ModFiles';
import ModUploadFile from './pages/minecraft/mods/ModUploadFile';
import ModSettings from './pages/minecraft/mods/ModSettings';

import ListMods from './pages/minecraft/ListMods';
import CreateMod from './pages/minecraft/mods/CreateMod';

import Account from './pages/user/account/Account';
import AccountSettings from './pages/user/account/AccountSettings';
import AccountSecurity from './pages/user/account/AccountSecurity';

import DiluvNav from './components/DiluvNav';
import DiluvFooter from './components/DiluvFooter';
import ModTeam from './pages/minecraft/mods/ModTeam';

require('react-select/scss/default.scss');
require('../public/css/main.scss');

render(
    <BrowserRouter>
        <section className="section">
            <Route render={(props) => <DiluvNav location={props.location}/>}/>

            <Switch>
                <Route exact path="/" component={Index}/>

                <Route exact path="/minecraft/" component={Minecraft}/>

                <Route exact path="/minecraft/mods" component={ListMods}/>
                <Route exact path="/minecraft/mods/create/" component={CreateMod}/>

                <Route exact path="/minecraft/mods/:slug/settings" component={ModSettings}/>
                <Route exact path="/minecraft/mods/:slug/upload" component={ModUploadFile}/>
                <Route exact path="/minecraft/mods/:slug/files" component={ModFiles}/>
                <Route exact path="/minecraft/mods/:slug/team" component={ModTeam}/>
                <Route exact path="/minecraft/mods/:slug/" component={Mods}/>

                <Route exact path="/login" component={Login}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/mfa" component={MFA}/>
                <Route exact path="/register" component={Register}/>

                <Route exact path="/account/settings" component={AccountSettings}/>
                <Route exact path="/account/security" component={AccountSecurity}/>
                <Route exact path="/account" component={Account}/>

                <Route component={E404}/>
            </Switch>
            {/*<DiluvFooter/>*/}
        </section>
    </BrowserRouter>
    , document.querySelector('#react-app'),
);
