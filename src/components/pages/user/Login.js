import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '~/utils/globals';
import userUtils from '~/utils/userUtils';

const http = require('http');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const formData = new FormData();
        formData.append('usernameEmail', this.state.email);
        formData.append('password', this.state.password);

        fetch(globals.endPoint() + '/auth/login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userUtils.getToken()}`,
                },
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.statusCode === 200) {
                    if (res.data.mfa) {
                        let storageSystem = window.sessionStorage;
                        storageSystem.setItem('mfa', true);
                        storageSystem.setItem('mfaToken', res.data.token);
                        storageSystem.setItem('mfaTokenExpires', res.data.tokenExpires);
                        storageSystem.setItem('rememberMe', this.state.checkbox ? this.state.checkbox : false);
                        this.props.history.push('/mfa');
                    } else {
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
                } else {
                    this.setState({ data: res });
                }
            })
            .catch(err => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error('The request /auth/login to the api had an error. ' + err);
            });

        event.preventDefault();
    }

    render() {
        if (userUtils.isUserLoggedIn()) {
            return (<Redirect to={'/'}/>);
        }

        document.title = 'Login - Diluv';
        const isError = this.state.data.message;
        return (
            <div>
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card"
                         src="/favicon/favicon.ico"/>
                    <p id="profile-name" className="profile-name-card"/>

                    {
                        isError ? (
                            <div className="alert alert-danger">
                                <h4>{http.STATUS_CODES[this.state.data.status]}</h4>
                                <p>{isError}</p>
                            </div>
                        ) : ''
                    }
                    <form method="POST" onSubmit={this.handleSubmit} className="form-signin">
                        <input name="email" onChange={this.handleInputChange} type="text"
                               id="inputEmail"
                               className="form-control"
                               placeholder="Username/Email"
                               required autoFocus/>
                        <input name="password" onChange={this.handleInputChange} type="password"
                               id="inputPassword"
                               className="form-control"
                               placeholder="Password"
                               required/>
                        <div id="remember" className="checkbox">
                            <label>
                                <input name="checkbox" onChange={this.handleInputChange}
                                       type="checkbox"
                                       value="remember-me"/> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-signin"
                                type="submit">Sign in
                        </button>
                    </form>
                    <a href="#" className="forgot-password">
                        Forgot your password?
                    </a>
                </div>
            </div>
        );
    }
}

export default Login;
