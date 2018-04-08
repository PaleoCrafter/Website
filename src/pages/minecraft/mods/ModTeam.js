import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '../../../utils/globals';
import requestUtils from '../../../utils/requestUtils';
import projectPermissions from '../../../utils/projectPermissions';

import ModNav from '../../../components/elements/minecraft/mods/ModNav';
import ModTeamMember from '../../../components/elements/minecraft/mods/ModTeamMember';

class ModTeam extends Component {
    constructor() {
        super();
        this.state = {
            projectData: [],
            memberData: [],
            permissions: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.getFetchJSON(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}`)
            .then((res) => {
                this.setState({ projectData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });

        requestUtils.getFetchJSON(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/members`)
            .then((res) => {
                this.setState({ memberData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onSubmit() {
        if (this.state.memberData.length > 0) {
            this.state.memberData.map((item) => {
                if (item.role !== 'Owner') {
                    console.log(this.state.permissions[item.username]);
                    //TODO Make post request to server
                }
            });
        }
    }

    onChange(username, permissions) {
        const p = this.state.permissions;
        p[username] = permissions;
        this.setState({ permissions: p });
    }

    onRemove(e) {

        //TODO Make post request to remove username and on success replace current existing memberData
    }

    render() {
        const projectSlug = this.props.match.params.slug;

        return (
            <section className="section">
                <div className="columns">
                    <div className="column is-four-fifths">
                        <h2 className="title is-2"><i
                            className="fas fa-address-book"
                        /> {this.state.projectData.name} Members
                        </h2>

                        <div className="columns is-gapless">
                            <div className="field">
                                ADD USER
                                {/*TODO*/}
                            </div>
                        </div>
                        {
                            this.state.memberData.length > 0 ? this.state.memberData.map((item) =>
                                (<ModTeamMember
                                    onChange={this.onChange.bind(this)}
                                    onRemove={this.onRemove.bind(this, item.username)}
                                    key={item.username}
                                    username={item.username}
                                    avatar={item.avatar}
                                    createdAt={item.createdAt}
                                    memberPermission={item.permission}
                                    permissions={this.state.projectData.permission}
                                    role={item.role}
                                />)) : ''
                        }
                        <br/>
                        <a className="button" onClick={this.onSubmit}>
                            Save
                        </a>
                    </div>
                    <div className="column">
                        <ModNav slug={projectSlug} url="team"/>
                    </div>
                </div>
            </section>
        );
    }
}

export default ModTeam;
