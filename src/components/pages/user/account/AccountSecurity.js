import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import AccountNav from '../../../elements/account/AccountNav';
import { Link } from 'react-router-dom';
import requestUtils from '../../../../utils/requestUtils';
import userUtils from '../../../../utils/userUtils';

class AccountSecurity extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            userSettings: []
        };

        requestUtils.getFetchJSON(globals.endPoint() + '/users/me')
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({ user: res.data });
                    console.log(res.data);

                } else {
                    console.log(res.data);
                }
            })
            .catch(err => {
                //TODO
            });

        requestUtils.getFetchJSON(globals.endPoint() + '/users/me/settings')
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({ userSettings: res.data });
                    console.log(res.data);
                } else {
                    console.log(res.data);
                }
            })
            .catch(err => {
                //TODO
            });

        this.submitChangePassword = this.submitChangePassword.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submitChangePassword(event) {

        //TODO CHeck this.state.newPassword and this.state.newPasswordConfirm
        if (this.state.newPassword === this.state.newPasswordConfirm) {
            const formData = new FormData();
            formData.append('oldPassword', this.state.oldPassword);
            formData.append('newPassword', this.state.newPassword);

            fetch(`${globals.endPoint()}/users/me/security`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Authorization': `Bearer ${userUtils.getToken()}`,
                    },
                    body: formData
                },
            )
                .then(res => res.json())
                .then((res) => {
                    if (res.statusCode === 200) {
                        console.log(res.data);
                    }

                })
                .catch(() => {
                    console.log('error');
                });
        } else {
            console.error('Passwords not equal');
        }

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
        );
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
        );
    }

    render() {
        document.title = 'Account Security - Diluv';
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
                                    Old password: <input name="oldPassword"
                                                         onChange={this.handleInputChange}
                                                         type="password"
                                                         id="inputOldPassword"
                                                         className="form-control"
                                                         required autoFocus/>
                                    New password: <input name="newPassword"
                                                         onChange={this.handleInputChange}
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
                                            onClick={this.submitChangePassword}>
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountSecurity;
