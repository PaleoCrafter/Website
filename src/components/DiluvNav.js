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
        if (game === 'minecraft') {
            this.setState({ game: 'minecraft' });
            // requestUtils.getFetchJSON(globals.endPoint()  + '/games/minecraft/projectTypes')
            //     .then(res => {
            //         if (res.statusCode === 200) {
            //             this.setState({ items: res.data });
            //         } else {
            //             this.setState({ error: { message: res.data.message } });
            //         }
            //     })
            //     .catch(err => {
            //         this.setState({ error: { message: 'An unknown error occurred' } });
            //         console.error('The request /games/minecraft/projectTypes in DiluvNav to the api had an error. ' + err);
            //     });
        }
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
                requestUtils.getFetchJSON(`${globals.endPoint()}/users/me`)
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
                            this.state.user.avatar ? <img
                                    className="avatar avatar-small"
                                    src={`${globals.cdnURL()}/avatar/${this.state.user.avatar}`}
                                />
                                : ''
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
                    <a className="bd-tw-button button" href="/login">
                         <span>
                            Login
                        </span>
                        <span className="icon">
                            <i className="fa fa-envelope"></i>
                        </span>
                    </a>
                </p>
                {
                    env !== 'staging' ? <p className="control">
                        <a className="bd-tw-button button" href="/register">
                         <span>
                            Register
                        </span>
                            <span className="icon">
                            <i className="fa fa-bell"></i>
                        </span>
                        </a>
                    </p> : ''
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
                            <img
                                className="image is-64x64"
                                src={`${globals.publicURL()}/favicon/favicon.ico`}
                            />
                        </figure>
                    </a>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Home
                        </a>
                        {
                            this.state.game ? (
                                <a className="navbar-item" href={`/${this.state.game}`}>
                                    {this.state.game.charAt(0)
                                        .toUpperCase() + this.state.game.slice(1)}
                                </a>
                            ) : ''
                        }
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
