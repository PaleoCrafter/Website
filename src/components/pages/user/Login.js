import React, {Component} from "react";
import {Redirect} from "react-router";
import globals from "../../../globals";

const http = require('http');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};

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
        let payload = {
            'usernameEmail': this.state.email,
            'password': this.state.password
        };

        globals.postForm(globals.endPoint + '/auth/login', payload, res => {
            if (res.statusCode === 200) {
                let storageSystem = window.sessionStorage;
                if (this.state.checkbox) {
                    storageSystem = localStorage;
                }
                storageSystem.setItem('token', res.data.token);
                storageSystem.setItem('tokenExpires', res.data.tokenExpires);
                storageSystem.setItem('refreshToken', res.data.refreshToken);
                storageSystem.setItem('refreshExpires', res.data.refreshTokenExpires);
                this.props.history.push("/");
            } else {
                this.setState({data: res});
            }
        });

        event.preventDefault();
    }

    render() {
        if (globals.isUserLoggedIn())
            return (<Redirect to={"/"}/>);

        document.title = "Login - Diluv";
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
                        ) : ""
                    }
                    <form method="POST" onSubmit={this.handleSubmit} className="form-signin">
                        <input name="email" onChange={this.handleInputChange} type="text" id="inputEmail"
                               className="form-control"
                               placeholder="Username/Email"
                               required autoFocus/>
                        <input name="password" onChange={this.handleInputChange} type="password" id="inputPassword"
                               className="form-control"
                               placeholder="Password"
                               required/>
                        <div id="remember" className="checkbox">
                            <label>
                                <input name="checkbox" onChange={this.handleInputChange} type="checkbox"
                                       value="remember-me"/> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in
                        </button>
                    </form>
                    <a href="#" className="forgot-password">
                        Forgot your password?
                    </a>
                </div>
            </div>
        )
    }
}

export default Login;