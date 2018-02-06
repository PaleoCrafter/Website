import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtils';
import AccountNav from '../../../elements/account/AccountNav';

class AccountSettings extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            userSettings: [],
            error: ''
        };

        requestUtils.getFetchJSON(globals.endPoint() + '/users/me')
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({ user: res.data });
                } else {
                    this.setState({ error: { message: 'An unknown error occurred' } });
                    console.error('The request /users/me to the api had an error. ' + err);
                }
            })
            .catch(err => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error('The request /users/me to the api had an error. ' + err);
            });

        requestUtils.getFetchJSON(globals.endPoint() + '/users/me/settings')
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({ userSettings: res.data });
                } else {
                    this.setState({ error: { message: 'An unknown error occurred' } });
                    console.error('The request /users/me/settings to the api had an error. ' + err);
                }
            })
            .catch(err => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error('The request /users/me/settings to the api had an error. ' + err);
            });

        this.submitChangeProfile = this.submitChangeProfile.bind(this);
        this.submitChangeEmail = this.submitChangeEmail.bind(this);
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

    submitChangeEmail(event) {
        let payload = {
            'oldPassword': this.state.oldPassword,
            'newPassword': this.state.newPassword,
            'newPasswordConfirm': this.state.newPasswordConfirm
        };

        //TODO
        // globals.postForm(globals.endPoint() + '/user/settings', payload, res => {
        //     if (res.statusCode === 200) {
        //
        //     } else {
        //         this.setState({ data: res });
        //     }
        // })
        //     .catch(err => {
        //
        //     });

        event.preventDefault();
    }

    submitChangeProfile(event) {

        event.preventDefault();
    }

    render() {
        document.title = 'Account Settings - Diluv';
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1><i className="fa fa-cog"/> Account Settings</h1>
                    </div>
                </div>

                <div className="row">
                    <AccountNav/>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6">
                                <h4><b>Change Email</b></h4>
                                <form method="POST" className="form-signin" autoComplete="off">
                                    Email: <input name="email" onChange={this.handleInputChange}
                                                  type="email"
                                                  value={this.state.userSettings.email || ''}
                                                  id="inputEmail"
                                                  className="form-control"
                                                  placeholder="Email address"
                                                  required autoFocus/>
                                    <button className="btn btn-lg btn-primary btn-block btn-signin"
                                            onClick={this.submitChangeEmail}>
                                        Update Email
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4><b>Change Profile</b></h4>
                                <form method="POST" className="form-signin" autoComplete="off">
                                    <input name="firstName" onChange={this.handleInputChange}
                                           type="text"
                                           value={this.state.userSettings.firstName || ''}
                                           id="inputFirstName"
                                           className="form-control"
                                           placeholder="First Name"/>
                                    <input name="lastName" onChange={this.handleInputChange}
                                           type="text"
                                           value={this.state.userSettings.lastName || ''}
                                           id="inputLastName"
                                           className="form-control"
                                           placeholder="Last Name"/>
                                    <input name="location" onChange={this.handleInputChange}
                                           type="text"
                                           value={this.state.userSettings.location || ''}
                                           id="inputLocation"
                                           className="form-control"
                                           placeholder="Location"/>

                                    <button className="btn btn-lg btn-primary btn-block btn-signin"
                                            onClick={this.submitChangeProfile}>
                                        Save
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

export default AccountSettings;
