import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtilities';

class MinecraftUserProfile extends Component {
    constructor() {
        super();
        this.state = {
            userData: {
                username: '',
                avatar: '',
                createdAt: '',
                firstName: '',
                lastName: '',
                location: '',
            },
            error: '',
        };
    }

    componentDidMount() {
        const username = this.props.match.params.username;

        requestUtils.fetchGet(new URL(`${globals.endPoint()}/users/${username}`))
            .then((res) => {
                this.setState({ userData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const username = this.props.match.params.username;

        document.title = username + ' Profile';
        return (
            <div className="section">
                <div className="columns">
                    <div className="column">

                    </div>
                    <div className="column is-four-fifths">
                        <h1 className="title is-1">User Profile</h1>

                        <div className="field">
                            <figure className="image is-128x128">
                                <img alt="avatar" src={`http://localhost:3000/avatar/${this.state.userData.avatar}`}/>
                            </figure>
                        </div>
                        <div className="field">
                            Location: {this.state.userData.location}
                        </div>
                        <div className="field">
                            First Name: {this.state.userData.firstName}
                        </div>
                        <div className="field">
                            Last Name: {this.state.userData.lastName}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default MinecraftUserProfile;
