import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '../../../utils/globals';
import userUtils from '../../../utils/userUtilities';

const http = require('http');

class MFA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loggedIn: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        const formData = new FormData();
        formData.append('mfaCode', this.state.mfaCode);

        //TODO Fix
        fetch(
            `${globals.endPoint()}/auth/mfa`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${window.sessionStorage.getItem('mfaToken')}`,
                },
                body: formData,
            },
        )
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    let storageSystem = window.sessionStorage;
                    if (storageSystem.getItem('rememberMe')) {
                        storageSystem = localStorage;
                    }
                    storageSystem.setItem('token', res.data.token);
                    storageSystem.setItem('tokenExpire', res.data.tokenExpire);
                    storageSystem.setItem('refreshToken', res.data.refreshToken);
                    storageSystem.setItem('refreshExpire', res.data.refreshExpire);
                    window.location.reload();
                } else {
                    // TODO Wrong token or expired
                    this.setState({ data: res });
                }
            })
            .catch((err) => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error(`The request /auth/mfa to the api had an error. ${err}`);
            });

        event.preventDefault();
    }

    render() {
        if (this.state.loggedIn) {
            return (<Redirect to="/"/>);
        }
        document.title = 'Two Factor - Diluv';
        const isError = this.state.data.message;
        return (
            <div>
                <div className="card card-container">
                    {/*TODO Change to logo file*/}
                    <img
                        id="profile-img"
                        className="profile-img-card"
                        alt="logo"
                        src={`${globals.publicURL()}/favicon/favicon.ico`}
                    />
                    <p id="profile-name" className="profile-name-card"/>
                    {
                        isError && (
                            <div className="alert alert-danger">
                                <h4>{http.STATUS_CODES[this.state.data.status]}</h4>
                                <p>{isError}</p>
                            </div>
                        )
                    }
                    <form method="POST" onSubmit={this.handleSubmit} className="form-signin">
                        <input
                            name="mfaCode"
                            onChange={this.handleInputChange}
                            type="text"
                            id="inputCode"
                            className="form-control"
                            placeholder="2FA Code"
                            required
                            autoFocus
                        />
                        <button
                            className="btn btn-lg btn-primary btn-block btn-signin"
                            type="submit"
                        >Sign in
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default MFA;
