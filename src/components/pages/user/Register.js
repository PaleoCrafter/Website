import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ReCAPTCHA from 'react-google-recaptcha';
import globals from '../../../utils/globals';

const http = require('http');

let captcha;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.onChange = this.onChange.bind(this);
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
        captcha.execute();
        event.preventDefault();
    }

    onChange(value) {
        let payload = {
            'email': this.state.email,
            'username': this.state.username,
            'password': this.state.password,
            'passwordConfirm': this.state.passwordConfirm,
            'g-recaptcha-response': value,
        };

        globals.postForm(globals.endPoint() + '/auth/register', payload)
            .then(res => {
                if (res.statusCode === 200) {
                    let storageSystem = window.sessionStorage;
                    storageSystem.setItem('token', res.data.token);
                    storageSystem.setItem('tokenExpires', res.data.tokenExpires);
                    storageSystem.setItem('refreshToken', res.data.refreshToken);
                    storageSystem.setItem('refreshExpires', res.data.refreshExpires);
                    this.props.history.push('/');
                } else {
                    //TODO Handle Error
                    this.setState({ data: res });
                }
            })
            .catch(err => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error('The request /auth/register to the api had an error. ' + err);
            });

        captcha.reset();
    }

    render() {
        document.title = 'Register - Diluv';
        const isError = this.state.data.errorMessage;
        //TODO Handle Error

        if (globals.isUserLoggedIn()) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card" src="/favicon/favicon.ico"/>
                    <p id="profile-name" className="profile-name-card"/>
                    {
                        isError ? (
                            <div className="alert alert-danger">
                                {/*TODO Handle Error*/}
                                <h4>{http.STATUS_CODES[this.state.data.status]}</h4>
                                {/*New line per error*/}
                                <p>{this.state.data.errorMessage}</p>
                            </div>
                        ) : ''
                    }
                    <form method="POST" className="form-signin">
                        <ReCAPTCHA
                            onChange={this.onChange}
                            sitekey="6LfbUCIUAAAAAM1Vgc3qsz5xomYnTrdvMnXVED8v"
                            size="invisible"
                            ref={(component) => {
                                captcha = component;
                            }}
                        />
                        <input name="email" onChange={this.handleInputChange} type="email"
                               id="inputEmail"
                               className="form-control"
                               placeholder="Email address"
                               required autoFocus/>
                        <input name="username" onChange={this.handleInputChange} type="text"
                               id="inputUsername"
                               className="form-control"
                               placeholder="Username"
                               required/>
                        <input name="password" onChange={this.handleInputChange} type="password"
                               id="inputPassword"
                               className="form-control"
                               placeholder="Password"
                               required/>
                        <input name="passwordConfirm" onChange={this.handleInputChange}
                               type="password"
                               id="inputPasswordConfirm"
                               className="form-control"
                               placeholder="Retype Password"
                               required/>
                        <button className="btn btn-lg btn-primary btn-block btn-signin"
                                onClick={this.handleSubmit}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
