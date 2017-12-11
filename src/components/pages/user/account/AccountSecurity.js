import React, {Component} from "react";
import globals from "../../../../globals";
import AccountNav from "../../../elements/account/AccountNav";
import {Link} from "react-router-dom";

class AccountSecurity extends Component {

    constructor() {
        super();
        this.state = {user: [], userSettings: []};

        globals.getFetch(globals.endPoint + '/users/me', "GET", globals.getToken())
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({user: res.data});
                    console.log(res.data)

                } else {
                    console.log(res.data)
                }
            });

        globals.getFetch(globals.endPoint + '/users/me/settings', "GET", globals.getToken())
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({userSettings: res.data});
                    console.log(res.data)
                } else {
                    console.log(res.data)
                }
            });

        this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
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

    handleUpdatePassword(event) {
        let payload = {
            'oldPassword': this.state.oldPassword,
            'newPassword': this.state.newPassword,
            'newPasswordConfirm': this.state.newPasswordConfirm
        };

        globals.postForm(globals.endPoint + '/users/me/security', payload, res => {
            if (res.statusCode === 200) {

            } else {
                this.setState({data: res});
            }
        });

        event.preventDefault();
    }

    renderMfaEnabled() {

        return (
            <div>
                Multi-Factor
                <div>
                    <strong> Status: </strong>: Enabled
                </div>
            </div>
        )
    }

    renderMfaDisabled() {

        return (
            <div>
                Multi-Factor
                <div>
                    <Link to="/account/mfa">
                        Enable Multi-factor verification
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        document.title = "Account Security - Diluv";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1><i className="fa fa-cog"/> Account Security</h1>
                    </div>
                </div>

                <div className="row">
                    <AccountNav/>
                    <div className="col-md-8">
                        {
                            //this.state.userSettings.mfaEnabled ? this.renderMfaEnabled() : this.renderMfaDisabled()
                        }

                        <div className="row">
                            <div className="col-md-6">
                                <h4><b>Change Password</b></h4>
                                <form method="POST" className="form-signin" autoComplete="off">
                                    Old password: <input name="oldPassword" onChange={this.handleInputChange}
                                                         type="password"
                                                         id="inputOldPassword"
                                                         className="form-control"
                                                         required autoFocus/>
                                    New password: <input name="newPassword" onChange={this.handleInputChange}
                                                         type="password"
                                                         id="inputNewPassword"
                                                         className="form-control"
                                                         required/>
                                    Confirm new password: <input name="newPasswordConfirm"
                                                                 onChange={this.handleInputChange}
                                                                 type="password"
                                                                 id="inputNewPasswordConfirm"
                                                                 className="form-control"
                                                                 required/>

                                    <button className="btn btn-primary btn-sm"
                                            onClick={this.handleUpdatePassword}>
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSecurity;