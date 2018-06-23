import React, { Component } from 'react';
import requestUtils from '../../../utils/requestUtilities';
import userUtils from '../../../utils/userUtilities';
import globals from '../../../utils/globals';
import { Redirect } from 'react-router';

class AccountNav extends Component {

    constructor() {
        super();
        this.state = {
            error: [],
            user: [],
            loggedIn: false
        };
    }
    componentDidMount() {
        userUtils.isUserLoggedIn()
            .then(() => {
                this.setState({ loggedIn: true });
                this.getUserData();
            })
            .catch(() => {
                this.setState({ loggedIn: false });
                this.setState({ redirect: "/login" });
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
        if (this.state.redirect) {
            return (<Redirect to={`${this.state.redirect}`} />);
        }
        console.log(this.props.url);
        document.title = 'Account Settings - Diluv';
        return (
            <aside className="menu">
                <ul className="menu-list">
                    <li>
                        <a className={this.props.url === 'profile' ? 'is-active' : ''}
                           href="/account">
                            Profile
                        </a>
                    </li>
                    <li>
                        <a className={this.props.url === 'security' ? 'is-active' : ''}
                           href="/account/security">
                            Security
                        </a>
                    </li>
                    <li>
                        <a className={this.props.url === 'settings' ? 'is-active' : ''}
                           href="/account/settings">
                            Settings
                        </a>
                    </li>
                </ul>
            </aside>
        );
    }
}

export default AccountNav;
