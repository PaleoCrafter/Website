import React, { PureComponent } from 'react';
import globals from '../utils/globals';
import requestUtils from '../utils/requestUtils';
import userUtils from '../utils/userUtils';

const env = process.env.BUILD_ENV || 'dev';

class DiluvNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            game: '',
            items: [],
            user: [],
            error: '',
            loggedIn: false,
        };
    }

    componentDidMount() {
        const location = this.props.location.pathname;
        const game = location.split('/')[1];

        this.getUserData();

        userUtils.isUserLoggedIn()
            .then(() => {
                this.setState({ loggedIn: true });
            })
            .catch(() => {
                this.setState({ loggedIn: false });
            });

    }

    getUserData() {
        userUtils.isUserLoggedIn()
            .then(() => {

                requestUtils.fetchGet(new URL(`${globals.endPoint()}/users/me`))
                    .then((res) => {
                        this.setState({ user: res.data });
                    })
                    .catch((err) => {
                        console.log(`err${err}`);
                    });
            })
            .catch(() => {
            });

    }

    renderLoggedIn() {
        return (
            <div className="field is-grouped">
                <div className="navbar-item has-dropdown is-hoverable is-right">
                    <a className="navbar-link">
                        {this.state.user.username}
                        {
                            this.state.user.avatar &&
                            (
                                <figure className="image is-48x48">
                                    <img src={`${globals.cdnURL()}/avatar/${this.state.user.avatar}`}/>
                                </figure>
                            )
                        }
                    </a>

                    <div className="navbar-dropdown is-right">
                        <a className="navbar-item" href="/account">
                            <span className="icon">
                                <i className="fa fa-cog"/>
                            </span>
                            <span>
                                Account
                            </span>
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item" href="/logout">
                            <span className="icon">
                                <i className="fa fa-sign-out-alt"/>
                            </span>
                            <span>
                                Logout
                            </span>
                        </a>
                    </div>
                </div>
                <div className="nav-item dropdown ">
                    <a className="nav-link dropdown-toggle text-white"
                       href="#"
                       id="navbarDropdown"
                       role="button"
                       data-toggle="dropdown"
                       aria-haspopup="true"
                       aria-expanded="false"
                    />
                </div>
            </div>

        );
    }

    renderNotLoggedIn() {
        return (
            <div className="field is-grouped">
                <p className="control">
                    <a className="bd-tw-button button"
                       href={`/login?return=${this.props.location.pathname}`}>
                         <span>
                            Login
                        </span>
                        <span className="icon">
                            <i className="fa fa-envelope"/>
                        </span>
                    </a>
                </p>
                {
                    env !== 'staging' &&
                    (
                        <p className="control">
                            <a className="bd-tw-button button"
                               href={`/register?return=${this.props.location.pathname}`}>
                                <span>
                                    Register
                                </span>
                                <span className="icon">
                                    <i className="fa fa-bell"/>
                                </span>
                            </a>
                        </p>
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <nav className="navbar is-fixed-top is-dark">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <figure className="image is-64x64">
                            <img src={`${globals.publicURL()}/favicon/favicon.ico`}/>
                        </figure>
                    </a>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Home
                        </a>
                        <a className="navbar-item" href="/minecraft">
                            Minecraft
                        </a>
                    </div>


                    <div className="navbar-end">
                        <div className="navbar-item">
                            {
                                this.state.loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn()
                            }
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default DiluvNav;
