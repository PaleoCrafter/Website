import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '../../../utils/globals';
import userUtils from '../../../utils/userUtilities';
import requestUtils from '../../../utils/requestUtilities';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loggedIn: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        userUtils.isUserLoggedIn()
            .then(() => {
                this.setState({ loggedIn: true });
            })
            .catch(() => {
                this.setState({ loggedIn: false });
            });
    }

    handleSubmit(event) {
        if (!this.refs.email.value) {
            this.setState({ errors: 'Email is needed.' });
            console.log('Email is missing');
            return;
        }

        if (!this.refs.password.value) {
            this.setState({ errors: 'Password is needed.' });
            console.log('Password is missing');
            return;
        }

        //TODO Move away from refs
        const formData = new FormData();
        formData.append('usernameEmail', this.refs.email.value);
        formData.append('password', this.refs.password.value);

        requestUtils.fetchPost(new URL(`${globals.endPoint()}/auth/login`), formData)
            .then((res) => {
                if (res.data.mfa) {
                    const storageSystem = window.sessionStorage;
                    storageSystem.setItem('mfa', true);
                    storageSystem.setItem('mfaToken', res.data.token);
                    storageSystem.setItem('mfaTokenExpires', res.data.tokenExpires);
                    storageSystem.setItem('rememberMe', this.state.checkbox ? this.state.checkbox : false);
                    this.props.history.push('/mfa');
                } else {
                    console.log(res);
                    let storageSystem = window.sessionStorage;
                    if (this.state.checkbox) {
                        storageSystem = localStorage;
                    }
                    storageSystem.setItem('token', res.data.token);
                    storageSystem.setItem('tokenExpires', res.data.tokenExpires);
                    storageSystem.setItem('refreshToken', res.data.refreshToken);
                    storageSystem.setItem('refreshExpires', res.data.refreshExpires);
                }
                window.location.reload();
            })
            .catch((err) => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error(`The request /auth/login to the api had an error. ${err}`);
            });

        event.preventDefault();
    }

    render() {
        if (this.state.loggedIn) {
            const params = new URLSearchParams(this.props.location.search);
            const tags = params.get('return');

            if (tags) {
                return (<Redirect to={tags}/>);
            } else {
                return (<Redirect to={'/'}/>);
            }
        }

        document.title = 'Login - Diluv';
        return (
            <div className="container">
                <div className="columns">
                    <div className="column"/>
                    <div className="column is-one-third">
                        <div className="card has-background-white-ter">

                            <div className="card-content">
                                <div className="columns">
                                    <div className="column"/>
                                    <div className="column">
                                        <figure className="image is-128x128">
                                            {/*TODO move to logo image*/}
                                            <img
                                                id="profile-img"
                                                className="profile-img-card"
                                                alt="logo"
                                                src={`${globals.publicURL()}/favicon/favicon.ico`}
                                            />
                                        </figure>
                                    </div>
                                    <div className="column"/>
                                </div>
                                <div className="field">
                                    <label className="label">Username/Email</label>
                                    <div className="control has-icons-left">
                                        <input
                                            id="username"
                                            ref="email"
                                            className="input"
                                            type="text"
                                            placeholder="Username/Email"
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"/>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            id="password"
                                            ref="password"
                                            className="input"
                                            type="password"
                                            placeholder="Password"
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"/>
                                        </span>
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <label className="checkbox">
                                            <input type="checkbox"/> Remember me
                                        </label>
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <button onClick={this.handleSubmit}
                                                className="button is-success">
                                            Login
                                        </button>
                                    </div>
                                </div>
                                <a href="/todo" className="forgot-password">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="column"/>
                </div>
            </div>
        );
    }
}

export default Login;
