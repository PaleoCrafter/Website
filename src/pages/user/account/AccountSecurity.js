import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import globals from '../../../utils/globals';
import userUtils from '../../../utils/userUtils';
import requestUtils from '../../../utils/requestUtils';
import AccountNav from '../../../components/elements/account/AccountNav';

class AccountSecurity extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            userSettings: []
        };

        this.submitChangePassword = this.submitChangePassword.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        requestUtils.getFetchJSON(`${globals.endPoint()}/users/me`)
            .then((res) => {
                this.setState({ user: res.data });
            })
            .catch((err) => {
                console.log(err);
            });

        requestUtils.getFetchJSON(`${globals.endPoint()}/users/me/settings`)
            .then((res) => {
                this.setState({ userSettings: res.data });
            })
            .catch((err) => {
                console.log(err);
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

    submitChangePassword(event) {
        // TODO CHeck this.state.newPassword and this.state.newPasswordConfirm
        if (this.state.newPassword === this.state.newPasswordConfirm) {
            const formData = new FormData();
            formData.append('oldPassword', this.state.oldPassword);
            formData.append('newPassword', this.state.newPassword);

            fetch(
                `${globals.endPoint()}/users/me/security`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${userUtils.getToken()}`,
                    },
                    body: formData,
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
                <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#mfaDisableModal"
                >
                    Disable MFA
                </button>

                <div
                    className="modal fade"
                    id="mfaDisableModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="mfaDisableModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="mfaDisableModalLabel">Disable
                                    MFA
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group input-group-sm mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="mfaInputPassword"
                                        placeholder="Password"
                                    />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >Cancel
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
                <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#mfaEnableModal"
                >
                    Enable MFA
                </button>

                <div
                    className="modal fade"
                    id="mfaEnableModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="mfaEnableModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="mfaEnableModalLabel">Enable MFA</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group input-group-sm mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="mfaInputPassword"
                                        placeholder="Password"
                                    />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >Cancel
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
                <h2 className="title is-2"><i className="fa fa-cog"/> Account Security</h2>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <AccountNav url="security"/>
                    </div>
                    <div className="column">
                        <div className="column is-two-fifths">

                            <h4 className="title is-4">Multi-Factor</h4>
                            <strong> Status: </strong> {this.state.userSettings.mfaEnabled ? 'Enabled' : 'Disabled'}
                            {
                                this.state.userSettings.mfaEnabled ?
                                    this.renderMfaEnabled() :
                                    this.renderMfaDisabled()
                            }
                        </div>
                        <br/>
                        <div className="column is-two-fifths">

                            <h4 className="title is-4">Change Password</h4>
                            <div className="field">
                                <label className="label">Old Password</label>
                                <div className="control">
                                    <input
                                        name="oldPassword"
                                        onChange={this.handleInputChange}
                                        type="password"
                                        id="inputOldPassword"
                                        className="input"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">New Password</label>
                                <div className="control">
                                    <input
                                        name="newPassword"
                                        onChange={this.handleInputChange}
                                        type="password"
                                        id="inputNewPassword"
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Confirm New Password</label>
                                <div className="control">
                                    <input
                                        name="newPasswordConfirm"
                                        onChange={this.handleInputChange}
                                        type="password"
                                        id="inputNewPasswordConfirm"
                                        className="input"
                                        required
                                    />

                                </div>
                            </div>
                            <button
                                className="button is-link"
                                onClick={this.submitChangePassword}
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountSecurity;
