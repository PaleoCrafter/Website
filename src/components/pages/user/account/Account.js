import React, { Component } from 'react';
import AccountNav from '../../../elements/account/AccountNav';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtilities';
import userUtils from '../../../../utils/userUtilities';
import { Redirect } from 'react-router';

class Account extends Component {
    constructor() {
        super();
        this.state = {

            error: [],
            user: [],
            loggedIn: true
        };
    }
    componentDidMount() {
        console.log("mounted");
        userUtils.isUserLoggedIn()
            .then(() => {
                this.setState({ loggedIn: true });
                this.getUserData();
            })
            .catch(() => {
                this.setState({ loggedIn: false });
            });

    }
    getUserData() {
        requestUtils.fetchGet(new URL(`${globals.endPoint()}/users/me`))
            .then((res) => {
                this.setState({ user: res.data });
            })
            .catch((err) => {
                console.log(`err${err}`);
            });
    }

    render() {
        document.title = 'Account - Diluv';
        if (!this.state.loggedIn) {
            return (<Redirect to={`/register`} />);
        }
        return (
            <div className="container">
                <h2 className="title is-2"><i className="fa fa-cog" /> Account</h2>
                <div className="columns">
                    <div className="colum is-one-fifth">
                        <figure className="image is-48x48">
                            <img alt="avatar" src={`${globals.publicURL()}/avatar/${this.state.user.avatar}`} />
                        </figure>
                    </div>
                    <div className="column is-one-fifth">
                        <AccountNav url="profile" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
