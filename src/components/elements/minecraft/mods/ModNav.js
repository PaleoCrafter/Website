import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtilities';
import projectPermissions from '../../../../utils/projectPermissions';

class ModNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            permissions: null,
        };
    }

    componentDidMount() {
        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${this.props.slug}`))
            .then(res => {
                this.setState({ permissions: res.data.permissions });
            })
            .catch(err => {
                console.log(err);
            });

        console.log(this.state.permissions)
    }


    render() {
        return (
            <aside className="menu">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li>
                        <a className={this.props.url === 'overview' ? 'is-active' : ''}
                           href={`/minecraft/mods/${this.props.slug}`}>
                            Overview
                        </a>
                    </li>
                    <li>
                        <a className={this.props.url === 'files' ? 'is-active' : ''}
                           href={`/minecraft/mods/${this.props.slug}/files`}>
                            Files
                        </a>
                    </li>
                </ul>
                {
                    this.state.permissions &&
                    (
                        <div>
                            <p className="menu-label">
                                Administration
                            </p>
                            <ul className="menu-list">
                                {
                                    projectPermissions.hasProjectPermission(this.state.permissions, projectPermissions.PERMISSION.FILE.UPLOAD) &&
                                    (
                                        <li>
                                            <a className={this.props.url === 'upload' ? 'is-active' : ''}
                                               href={`/minecraft/mods/${this.props.slug}/upload`}>
                                                Upload Files
                                            </a>
                                        </li>
                                    )
                                }
                                {
                                    <li>
                                        <a className={this.props.url === 'members' ? 'is-active' : ''}
                                           href={`/minecraft/mods/${this.props.slug}/members`}>
                                            Members
                                        </a>
                                    </li>
                                }
                                {
                                    projectPermissions.containsProjectPermission(this.state.permissions, projectPermissions.PERMISSION.SETTINGS) &&
                                    (
                                        <li>
                                            <a className={this.props.url === 'settings' ? 'is-active' : ''}
                                               href={`/minecraft/mods/${this.props.slug}/settings`}>
                                                Settings
                                            </a>
                                        </li>
                                    )
                                }

                            </ul>
                        </div>
                    )
                }
            </aside>
        );
    }
}

export default ModNav;
