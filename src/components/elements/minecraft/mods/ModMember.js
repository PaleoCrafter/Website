import React, { Component } from 'react';
import projectPermissions from '../../../../utils/projectPermissions';
import globals from '../../../../utils/globals';

class ModMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissions: []
        };
    }

    onChange(permission, event) {
        const permissions = this.state.permissions;

        if (event.target.checked) {
            permissions.push(permission);
        } else {
            permissions.splice(permissions.indexOf(permission), 1);
        }
        this.setState({ permissions });

        this.props.onChange(this.props.username, permissions);
    }

    renderPermissions(name, permission) {
        const components = [];
        for (const m in permission) {
            const type = permission[m];
            components.push(
                <div key={type.PERMISSION} className="panel-block">
                    <input
                        onChange={this.onChange.bind(this, type.PERMISSION)}
                        key={type.PERMISSION}
                        type="checkbox"
                        defaultChecked={projectPermissions.hasProjectPermission(this.props.memberPermission, type)}
                        disabled={!projectPermissions.hasProjectPermission(this.props.permissions, projectPermissions.PERMISSION.MEMBER.MODIFY)}
                    />
                    {
                        type.DISPLAY_NAME
                    }
                </div>
            );
        }
        return (
            <nav className="panel">
                <p className="panel-heading">
                    {name}
                </p>
                {
                    components
                }
            </nav>
        );
    }

    renderOwner() {
        return (
            <div>
                {/* TODO Style better */}
                Can't modify owner
            </div>
        );
    }

    renderMember() {
        return (
            <div className="columns is-multiline is-mobile">
                <div className="column">
                    {
                        this.renderPermissions('Project Settings', projectPermissions.PERMISSION.SETTINGS)
                    }
                </div>
                <div className="column">
                    {
                        this.renderPermissions('File Settings', projectPermissions.PERMISSION.FILE)
                    }
                </div>
                <div className="column">
                    {
                        this.renderPermissions('Project URLs', projectPermissions.PERMISSION.PROJECT)
                    }
                </div>
                <div className="column">
                    {
                        this.renderPermissions('Members Permission', projectPermissions.PERMISSION.MEMBER)
                    }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={`${globals.publicURL()}/avatar/${this.props.avatar}`}
                                     alt={this.props.username}/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{this.props.username}</p>
                        </div>
                        {
                            !this.props.owner &&
                            (
                                <div className="media-right">
                                    <button onClick={this.props.onRemove}
                                            className="button is-danger"
                                            disabled={!projectPermissions.hasProjectPermission(this.props.permissions, projectPermissions.PERMISSION.MEMBER.REMOVE)}>
                                        Remove
                                    </button>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        {
                            this.props.owner ? this.renderOwner() : this.renderMember()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ModMember;
