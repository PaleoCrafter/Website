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
                <button type="button" className="btn btn-primary" data-toggle="modal"
                        data-target="#mfaDisableModal">
                    Disable MFA
                </button>

                <div className="modal fade" id="mfaDisableModal" tabindex="-1" role="dialog"
                     aria-labelledby="mfaDisableModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="mfaDisableModalLabel">Disable
                                    MFA</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group input-group-sm mb-3">
                                    <input type="password" className="form-control"
                                           id="mfaInputPassword" placeholder="Password"/>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal">Cancel
                                </button>
                                <button type="button" className="btn btn-primary">Disable MFA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderMfaDisabled() {

        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal"
                        data-target="#mfaEnableModal">
                    Enable MFA
                </button>

                <div className="modal fade" id="mfaEnableModal" tabindex="-1" role="dialog"
                     aria-labelledby="mfaEnableModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="mfaEnableModalLabel">Enable MFA</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group input-group-sm mb-3">
                                    <input type="password" className="form-control"
                                           id="mfaInputPassword" placeholder="Password"/>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal">Cancel
                                </button>
                                <button type="button" className="btn btn-primary">Enable MFA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        document.title = 'Account Security - Diluv';
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1><i className="fa fa-cog"/> Account Security</h1>
                    </div>
                </div>

                <div className="row">
                    <AccountNav/>
                    <div className="col-md-8">
                        <div className="container">
                            <h4><b>Multi-Factor</b></h4>
                            <div>
                                <strong> Status: </strong> {this.state.userSettings.mfaEnabled ? 'Enabled' : 'Disabled'}
                            </div>
                            {
                                this.state.userSettings.mfaEnabled ? this.renderMfaEnabled() : this.renderMfaDisabled()
                            }
                        </div>
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
        );
    }
}

export default AccountSecurity;
