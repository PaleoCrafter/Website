import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtilities';

import ModNav from '../../../elements/minecraft/mods/ModNav';
import ModMember from '../../../elements/minecraft/mods/ModMember';

class ModMembers extends Component {
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

        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}`))
            .then((res) => {
                this.setState({ projectData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });

        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/members`))
            .then((res) => {
                this.setState({ memberData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onSubmit() {
        const projectSlug = this.props.match.params.slug;

        if (this.state.memberData.length > 0) {
            this.state.memberData.map((item) => {
                if (item.role !== 'Owner') {
                    const permissions = this.state.permissions[item.username];

                    const params = {
                        'member': item.username,
                        'memberPermissions': permissions ? permissions : []
                    };

                    requestUtils.fetchPut(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/members`), params)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((res) => {
                            console.log('error');
                            console.log(res);
                        });
                }
                return null;
            //    TODO LOOK INTO
            });
        }
    }

    onChange(username, permissions) {
        const p = this.state.permissions;
        p[username] = permissions;
        this.setState({ permissions: p });
    }

    onRemove(e) {
        const projectSlug = this.props.match.params.slug;

        const params = {
            'member': e,
        };

        requestUtils.fetchDelete(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/members`), params)
            .then((res) => {
                let memberList = this.state.memberData.slice();
                memberList = memberList.filter(value => value.username !== e);
                this.setState({ memberData: memberList });
            })
            .catch((res) => {
                console.log('error');
            });
    }

    onClickAddUser(e) {
        const projectSlug = this.props.match.params.slug;

        const formData = new FormData();
        formData.append('member', this.state.username);

        requestUtils.fetchPost(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/members`), formData)
            .then((res) => {
                const memberList = this.state.memberData.slice();
                memberList.push(res.data);
                this.setState({ memberData: memberList });
            })
            .catch((res) => {
                console.log('error');
                console.log(res);
            });
    }


    onChangeUserAdd(e) {
        this.setState({ username: e.target.value });
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        //TODO REDIRECT IF NO PERMISSIONS AKA NOT LOGGED IN

        document.title = `${this.state.projectData.name} Members - Diluv`;

        return (
            <section className="section">
                <div className="columns">
                    <div className="column is-four-fifths">
                        <h2 className="title is-2"><i
                            className="fas fa-address-book"
                        /> {this.state.projectData.name} Members
                        </h2>

                        <div className="columns is-gapless">
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <div className="control">
                                            {/*TODO Do search from the api*/}
                                            <input onChange={this.onChangeUserAdd.bind(this)}
                                                   className="input"
                                                   type="text" placeholder="Username"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <div className="control">
                                            <a onClick={this.onClickAddUser.bind(this)}
                                               className="button is-link">
                                                Add User
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.projectData.owner ? (
                                <ModMember
                                    username={this.state.projectData.owner.username}
                                    avatar={this.state.projectData.owner.avatar}
                                    createdAt={this.state.projectData.owner.createdAt}
                                    permissions={this.state.projectData.permission}
                                    owner={true}
                                />
                            ) : null
                        }
                        {
                            this.state.memberData.length > 0 && this.state.memberData.map((item) =>
                                (
                                    <ModMember
                                        onChange={this.onChange.bind(this)}
                                        onRemove={this.onRemove.bind(this, item.username)}
                                        key={item.username}
                                        username={item.username}
                                        avatar={item.avatar}
                                        createdAt={item.createdAt}
                                        memberPermission={item.permission}
                                        permissions={this.state.projectData.permission}
                                        role={item.role}
                                    />
                                )
                            )
                        }
                        <br/>
                        <a className="button is-primary is-right" onClick={this.onSubmit}>
                            Save
                        </a>
                    </div>
                    <div className="column">
                        <ModNav slug={projectSlug} url="members"/>
                    </div>
                </div>
            </section>
        );
    }
}

export default ModMembers;
