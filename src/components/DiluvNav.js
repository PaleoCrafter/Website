import React, { PureComponent } from 'react';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';
import userUtils from '~/utils/userUtils';

class DiluvNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            game: '',
            items: [],
            user: [],
            error: ''
        };
    }

    componentDidMount() {
        const location = this.props.location.pathname;
        let game = location.split('/')[1];
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
    }

    getUserData() {
        if (userUtils.isUserLoggedIn()) {
            requestUtils.getFetchJSON(globals.endPoint() + '/users/me')
                .then(res => {
                    this.setState({ user: res.data });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    renderLoggedIn() {
        return (
            <div className="field is-grouped">
                <div className="navbar-item has-dropdown is-hoverable is-right">
                    <a className="navbar-link">
                        <img className="avatar avatar-small"
                             src={globals.publicFolder() + '/avatar/' + this.state.user.avatar}/> {this.state.user.username}
                    </a>

                    <div className="navbar-dropdown is-right">
                        <a className="navbar-item" href="/account">
                            <span className="icon">
                                <i className="fa fa-cog"></i>
                            </span>
                            <span>
                             Account
                            </span>
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item" href="/logout">
                            <span className="icon">
                                <i className="fa fa-sign-out-alt"></i>
                            </span>
                            <span>
                             Logout
                            </span>
                        </a>
                    </div>
                </div>
                <div className="nav-item dropdown ">
                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown"
                       role="button" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">

                    </a>
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
                <p className="control">
                    <a className="bd-tw-button button" href="/register">
                         <span>
                            Register
                        </span>
                        <span className="icon">
                            <i className="fa fa-bell"></i>
                        </span>
                    </a>
                </p>
            </div>
        );
    }

    render() {
        return (
            <nav className="navbar is-fixed-top is-dark">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <figure className="image is-64x64">
                            <img className="image is-64x64" src={globals.publicFolder() + "/public/favicon/favicon.ico"}/>
                        </figure>
                    </a>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href={`/${this.state.game}`}>
                            Home
                        </a>
                    </div>


                    <div className="navbar-end">
                        <div className="navbar-item">
                            {
                                userUtils.isUserLoggedIn() ? this.renderLoggedIn() : this.renderNotLoggedIn()
                            }
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default DiluvNav;
