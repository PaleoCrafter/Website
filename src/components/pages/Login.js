import React, {Component} from "react";


class Login extends Component {
    render() {
        return (
            document.title = "Login - Project Alt",
                <div>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active">Login</li>
                    </ol>

                    <div className="card card-container">
                    <img id="profile-img" className="profile-img-card"
                         src="/favicon/favicon.ico"/>
                    <p id="profile-name" className="profile-name-card"/>
                    <form className="form-signin">
                        <span id="reauth-email" className="reauth-email"/>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required autofocus/>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required/>
                        <div id="remember" className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
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