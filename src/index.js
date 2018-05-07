import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Index from './components/pages/Index';

import Logout from './components/pages/user/Logout';
import Login from './components/pages/user/Login';
import MFA from './components/pages/user/MFA';
import Register from './components/pages/user/Register';

import Error404 from './components/pages/error/Error404';

import Minecraft from './components/pages/minecraft/Minecraft';
import Mods from './components/pages/minecraft/mods/ModOverview';
import ModFiles from './components/pages/minecraft/mods/ModFiles';
import ModUploadFile from './components/pages/minecraft/mods/ModUploadFile';
import ModSettings from './components/pages/minecraft/mods/ModSettings';
import ModMembers from './components/pages/minecraft/mods/ModMembers';

import ListMods from './components/pages/minecraft/ListMods';
import CreateMod from './components/pages/minecraft/mods/CreateMod';

import Account from './components/pages/user/account/Account';
import AccountSettings from './components/pages/user/account/AccountSettings';
import AccountSecurity from './components/pages/user/account/AccountSecurity';

import MinecraftUserProfile from './components/pages/minecraft/user/MinecraftUserProfile';

import DiluvNav from './components/elements/DiluvNav';
import DiluvFooter from './components/elements/DiluvFooter';

import './main.css';

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
                <Route exact path="/minecraft/mods/:slug/members" component={ModMembers}/>
                <Route exact path="/minecraft/mods/:slug/" component={Mods}/>

                <Route exact path="/minecraft/user/:username" component={MinecraftUserProfile}/>

                <Route exact path="/login" component={Login}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/mfa" component={MFA}/>
                <Route exact path="/register" component={Register}/>

                <Route exact path="/account/settings" component={AccountSettings}/>
                <Route exact path="/account/security" component={AccountSecurity}/>
                <Route exact path="/account" component={Account}/>


                <Route component={Error404}/>
            </Switch>
            <DiluvFooter/>
        </section>
    </BrowserRouter>
    , document.querySelector('#react-app'),
);
