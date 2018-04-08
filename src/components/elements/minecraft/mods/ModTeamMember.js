import React, { Component } from 'react';
import projectPermissions from '../../../../utils/projectPermissions';


class ModTeamMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissions: []
        };
    }

    onChange(permission,
             event) {
        const permissions = this.state.permissions;

        if (event.target.checked) {
            permissions.push(permission);
        } else {
            permissions.splice(permissions.indexOf(permission), 1);
        }
        this.setState({ permissions });

        this.props.onChange(this.props.username, permissions);
    }

    renderPermissions(permission) {
        const components = [];
        for (const m in permission) {
            const type = permission[m];
            components.push(
                <div key={type.PERMISSION} className="field">
                    <label className="checkbox">
                        <input
                            onChange={this.onChange.bind(this, type.PERMISSION)}
                            key={type.PERMISSION}
                            type="checkbox"
                            defaultChecked={projectPermissions.hasProjectPermission(this.props.memberPermission, type)}
                        />
                        {
                            type.DISPLAY_NAME
                        }
                    </label>
                </div>
            );
        }
        return (
            components
        );
    }

    renderOwner() {
        return (
            <div>
                {/* Style better */}
                Can't modify owner
            </div>
        );
    }

    renderMember() {
        return (
            <div className="columns is-gapless is-multiline is-mobile">
                <div className="column">
                    <h4 className="title is-4">Project Settings</h4>
                    {
                        this.renderPermissions(projectPermissions.PERMISSION.SETTINGS)
                    }
                </div>
                <div className="column">
                    <h4 className="title is-4">File Settings</h4>
                    {
                        this.renderPermissions(projectPermissions.PERMISSION.FILE)
                    }
                </div>
                <div className="column">
                    <h4 className="title is-4">Project URL's</h4>
                    {
                        this.renderPermissions(projectPermissions.PERMISSION.PROJECT)
                    }
                </div>
                <div className="column">
                    <h4 className="title is-4">Member's Permission</h4>
                    {
                        this.renderPermissions(projectPermissions.PERMISSION.MEMBER)
                    }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src={`http://localhost:1234/avatar/${this.props.avatar}`}/>
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{this.props.username}</p>
                            </div>
                            {
                                this.props.role !== 'Owner' && projectPermissions.hasProjectPermission(this.props.permissions,
                                    projectPermissions.PERMISSION.MEMBER.REMOVE) ?
                                    (
                                        <div className="media-right">
                                            <a onClick={this.props.onRemove} className="button"
                                               role="button">
                                                Remove
                                            </a>
                                        </div>
                                    )
                                    : ''
                            }
                        </div>

                        <div className="content">
                            {
                                this.props.role === 'Owner' ? this.renderOwner() : this.renderMember()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModTeamMember;
