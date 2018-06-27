import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtilities';
import AccountNav from '../../../elements/account/AccountNav';

class AccountSettings extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            userSettings: [],
            error: '',
        };
        this.submitChangeProfile = this.submitChangeProfile.bind(this);
        this.submitChangeEmail = this.submitChangeEmail.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        requestUtils.fetchGet(`${globals.endPoint()}/users/me`)
            .then((res) => {
                this.setState({ user: res.data });
            })
            .catch((err) => {
                console.error(err);
            });

        requestUtils.fetchGet(`${globals.endPoint()}/users/me/settings`)
            .then((res) => {
                this.setState({ userSettings: res.data });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleInputChange(event) {
        const [target, name] = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value,
        });
    }

    submitChangeEmail(event) {
        // const payload = {
        //     oldPassword: this.state.oldPassword,
        //     newPassword: this.state.newPassword,
        //     newPasswordConfirm: this.state.newPasswordConfirm,
        // };

        // TODO
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
                <h2 className="title is-2"><i className="fa fa-cog"/> Account Settings</h2>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <AccountNav url="settings"/>
                    </div>
                    <div className="column">
                        <div className="column is-two-fifths">
                            <h4 className="title is-4">Change Email</h4>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        name="email"
                                        onChange={this.handleInputChange}
                                        type="email"
                                        value={this.state.userSettings.email || ''}
                                        id="inputEmail"
                                        className="input"
                                        placeholder="Email address"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">

                                    <button
                                        className="button is-link"
                                        onClick={this.submitChangeEmail}
                                    >
                                        Update Email
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountSettings;
