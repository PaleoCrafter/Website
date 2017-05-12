import React, {Component} from "react";
import globals from "../../globals";
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
            'username': this.state.email,
            'password': this.state.password
        };

        let formBody = [];
        for (let property in payload) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(globals.endPoint + `/auth/login`,
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
        event.preventDefault();
    }

    render() {
        document.title = "Login - Diluv";
        const isError = this.state.data.errorMessage;
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
        }
        return (
                <div>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active">Login</li>
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
                    <form onSubmit={this.handleSubmit} className="form-signin">
                        <span id="reauth-email" className="reauth-email"/>
                        <input name="email" onChange={this.handleInputChange} type="email" id="inputEmail"
                               className="form-control"
                               placeholder="Email address"
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