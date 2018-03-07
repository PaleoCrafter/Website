import React, { Component } from 'react';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

class ModNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            permission: 0,
        };
    }

    componentDidMount() {
        requestUtils.getFetchJSON(`${globals.endPoint()}/games/minecraft/mods/projects/${this.props.slug}`)
            .then(res => {
                this.setState({ permission: res.data.permission });
            })
            .catch(err => {
                console.log(err);
            });
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
                <p className="menu-label">
                    Administration
                </p>
                <ul className="menu-list">
                    <li>
                        <a className={this.props.url === 'upload' ? 'is-active' : ''}
                           href={`/minecraft/mods/${this.props.slug}/upload`}>
                            Upload Files
                        </a>
                    </li>
                    <li>
                        <a className={this.props.url === 'settings' ? 'is-active' : ''}
                           href={`/minecraft/mods/${this.props.slug}/settings`}>
                            Settings
                        </a>
                    </li>

                    {/*<li>*/}
                        {/*<a className="is-active">Security</a>*/}
                        {/*<ul>*/}
                            {/*<li><a>Team</a></li>*/}
                            {/*<li><a>Activity</a></li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                </ul>
            </aside>
        );
    }
}

export default ModNav;
