import React, {Component} from "react";
import { Redirect } from 'react-router'
import ReCAPTCHA from "react-google-recaptcha";
import globals from "../../globals";
const http = require('http');

let captcha;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
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
            'g-recaptcha-response': value
        };

        let formBody = [];
        for (let property in payload) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(globals.endPoint + `/auth/register`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then(result => result.json())
            .then(returnData => {
                if (returnData.status == 200) {
                    let storageSystem = window.sessionStorage;
                    if (this.state.checkbox) {
                        storageSystem = localStorage;
                    }
                    storageSystem.setItem('token', returnData.data.token);
                    storageSystem.setItem('tokenExpire', returnData.data.tokenExpire);
                    storageSystem.setItem('refreshToken', returnData.data.refreshToken);
                    storageSystem.setItem('refreshExpire', returnData.data.refreshExpire);
                    this.setState({redirect: true})
                } else {
                    this.setState({data: returnData});
                }
            });
        captcha.reset();
        event.preventDefault();
    }

    render() {
        document.title = "Register - Diluv";
        const isError = this.state.data.errorMessage;
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Register</li>
                </ol>
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card"
                         src="/favicon/favicon.ico"/>
                    <p id="profile-name" className="profile-name-card"/>
                    {
                        isError ? (
                                <div className="alert alert-danger">
                                    <h4>{http.STATUS_CODES[this.state.data.status]}</h4>
                                    <p>{this.state.data.errorMessage}</p>
                                </div>
                            ) : ""
                    }
                    <div id="example"></div>

                    <form className="form-signin">
                        <ReCAPTCHA
                            onChange={this.onChange}
                            sitekey="6LffRx8UAAAAADs1OBLuIFDMvpOMBIoenAG6WU9B"
                            size="invisible"
                            ref={(component) => {
                                captcha = component;
                            }}
                        />
                        <span id="reauth-email" className="reauth-email"/>
                        <input name="email" onChange={this.handleInputChange} type="email" id="inputEmail"
                               className="form-control"
                               placeholder="Email address"
                               required autoFocus/>
                        <input name="username" onChange={this.handleInputChange} type="text" id="inputUsername"
                               className="form-control"
                               placeholder="Username"
                               required/>
                        <input name="password" onChange={this.handleInputChange} type="password" id="inputPassword"
                               className="form-control"
                               placeholder="Password"
                               required/>
                        <input name="passwordConfirm" onChange={this.handleInputChange} type="password"
                               id="inputPasswordConfirm"
                               className="form-control"
                               placeholder="Retype Password"
                               required/>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.handleSubmit}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;