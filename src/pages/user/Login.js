import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '../../utils/globals';
import userUtils from '../../utils/userUtils';

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

        const formData = new FormData();
        formData.append('usernameEmail', this.refs.email.value);
        formData.append('password', this.refs.password.value);

        fetch(
            `${globals.endPoint()}/auth/login`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userUtils.getToken()}`,
                },
                body: formData,
            },
        )
            .then(res => res.json()
                .then((json) => {
                    if (res.ok) return json;

                    throw json;
                }))
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
            return (<Redirect to="/"/>);
        }

        document.title = 'Login - Diluv';
        return (
            <div className="container">
                <div className="card card-container">
                    <figure className="avatar">
                        <img
                            id="profile-img"
                            className="profile-img-card"
                            src={`${globals.publicURL()}/favicon/favicon.ico`}
                        />
                    </figure>
                    <div className="field">
                        <div className="control">
                            <input
                                id="username"
                                ref="email"
                                className="input"
                                type="text"
                                placeholder="Username/Email"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                id="password"
                                ref="password"
                                className="input"
                                type="password"
                                placeholder="Password"
                            />
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
                            <button onClick={this.handleSubmit} className="button is-link">
                                Login
                            </button>
                        </div>
                    </div>
                    <a href="#" className="forgot-password">
                        Forgot your password?
                    </a>
                </div>
            </div>
        );
    }
}

export default Login;
