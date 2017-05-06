import React, {Component} from "react";
import {Link} from "react-router-dom";

class Project extends Component {
    constructor() {
        super();
        this.state = {items: []};
    }

    render() {
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Account</li>
                </ol>
                <img className="avatar" src="http://placehold.it/400/50B2D6/ffffff"
                     style={{width: '150px', height: '150px'}}/>
                <h2>Username</h2>
                <span className="badge badge-danger">Staff</span> <span className="badge badge-warning">Premium</span>
                <br/><br/>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="/account">Account</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/account/profile">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/account/preferences">Preferences</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/account/connections">Connections</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Subscriptions</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Rewards</a>
                    </li>
                </ul>
            </div>
        );
    }

}
export default Project;