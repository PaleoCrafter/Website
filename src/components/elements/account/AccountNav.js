import React, { Component } from 'react';

class AccountNav extends Component {

    render() {
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
