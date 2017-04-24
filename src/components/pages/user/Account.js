import React, {Component} from "react";

class Account extends Component {

    render() {
        return (
            document.title="My Account - Project Alt",
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Account</li>
                </ol>
                <img className="avatar" src="http://placehold.it/400/50B2D6/ffffff" style={{width: '150px', height: '150px'}}/>
                <h2>Unnamed</h2>
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
        )
    }
}

export default Account;