import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ReCAPTCHA from 'react-google-recaptcha';
import globals from '../../utils/globals';
import userUtils from '../../utils/userUtils';
import requestUtils from '../../utils/requestUtils';

let captcha;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: '',
            loggedIn: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        userUtils.isUserLoggedIn()
            .then(() => {
                this.setState({ loggedIn: true });
            })
            .catch(() => {
                this.setState({ loggedIn: false });
            });
    }


    onChange(value) {
        const formData = new FormData();

        if (!this.refs.email.value) {
            this.setState({ errors: 'Email is needed.' });
            console.log('Email is missing');
            return;
        }

        if (!this.refs.username.value) {
            this.setState({ errors: 'Email is needed.' });
            console.log('Email is missing');
            return;
        }
        if (!this.refs.password.value) {
            this.setState({ errors: 'Password is needed.' });
            console.log('Password is missing');
            return;
        }
        if (!this.refs.passwordConfirm.value) {
            this.setState({ errors: 'Password is needed.' });
            console.log('Password is missing');
            return;
        }

        formData.append('email', this.refs.email.value);
        formData.append('username', this.refs.username.value);
        formData.append('password', this.refs.password.value);
        formData.append('passwordConfirm', this.refs.passwordConfirm.value);
        formData.append('g-recaptcha-response', value);

        requestUtils.fetchPost(new URL(`${globals.endPoint()}/auth/register`, formData))
            .then((res) => {
                if (res.statusCode === 200) {
                    this.props.history.push('/');
                } else {
                    // TODO Handle Error
                    this.setState({ data: res });
                }
            })
            .catch((err) => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error(`The request /auth/register to the api had an error. ${err}`);
            });

        captcha.reset();
    }

    handleSubmit(event) {
        captcha.execute();
        event.preventDefault();
    }

    handleInputChange(event) {
        const [target, name] = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value,
        });
    }

    render() {
        document.title = 'Register - Diluv';

        if (this.state.loggedIn) {
            return <Redirect to="/"/>;
        }

        return (
            <div>
                <div className="card card-container">
                    <figure className="avatar">
                        <img
                            id="profile-img"
                            className="profile-img-card"
                            src={`${globals.publicURL()}/favicon/favicon.ico`}
                        />
                    </figure>
                    <ReCAPTCHA
                        onChange={this.onChange}
                        sitekey="6LfbUCIUAAAAAM1Vgc3qsz5xomYnTrdvMnXVED8v"
                        size="invisible"
                        ref={(component) => {
                            captcha = component;
                        }}
                    />
                    <div className="field">
                        <div className="control">
                            <input
                                ref="email"
                                type="email"
                                className="input"
                                placeholder="Email address"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                ref="username"
                                type="text"
                                className="input"
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input
                                ref="password"
                                type="password"
                                className="input"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                ref="passwordConfirm"
                                type="password"
                                className="input"
                                placeholder="Retype Password"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button onClick={this.handleSubmit} className="button is-link">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
