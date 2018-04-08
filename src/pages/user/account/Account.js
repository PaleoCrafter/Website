import React, { Component } from 'react';
import AccountNav from '../../../components/elements/account/AccountNav';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            gameData: [],
            projects: [],
            projectType: [],
            error: [],
        };
    }

    render() {
        document.title = 'Account - Diluv';
        return (
            <div className="container">
                <h2 className="title is-2"><i className="fa fa-cog"/> Account</h2>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <AccountNav url="profile"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
