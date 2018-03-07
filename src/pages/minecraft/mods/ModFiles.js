import React, { Component } from 'react';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

import ModFile from '~/components/elements/minecraft/mods/files/ModFile';
import ModNav from '~/components/elements/minecraft/mods/ModNav';

class ModFiles extends Component {

    constructor() {
        super();
        this.state = {
            projectData: [],
            modFileData: []
        };
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods/projects/' + projectSlug)
            .then(res => {
                this.setState({ projectData: res.data });
            })
            .catch(err => {
                console.log('Game');
            });

        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods/projects/' + projectSlug + '/files')
            .then(res => {
                this.setState({ modFileData: res.data });
            })
            .catch(err => {
                console.log('Project Files');
            });
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        document.title = this.state.projectData.name + ' - Files - Diluv';
        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-four-fifths">
                            <div className="columns">
                                <div className="column is-four-fifths">
                                    <h2 className="title is-2">{this.state.projectData.name}</h2>
                                </div>
                                <div className="column">
                                    <ul className="nav">
                                        <li>
                                            {
                                                (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.UPLOAD_FILE)) ? (
                                                    <a className="button is-link" role="button"
                                                       href={'/minecraft/mods/' + projectSlug + '/upload'}>
                                                        Upload File
                                                    </a>
                                                ) : ''
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <table className="table  is-fullwidth">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Size</th>
                                    <th>Game Version</th>
                                    <th>Download Count</th>
                                    <th>Link</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.modFileData.map(function (item, i) {
                                        return (
                                            <ModFile
                                                key={item.sha512 | i}
                                                sha512={item.sha512}
                                                createdAt={item.createdAt}
                                                displayName={item.displayName}
                                                downloads={item.downloads}
                                                gameVersions={item.gameVersions}
                                                releaseType={item.releaseType}
                                                size={item.size}
                                            />
                                        );
                                    }, this)
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="column">
                            <ModNav slug={projectSlug} url="files"/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ModFiles;
