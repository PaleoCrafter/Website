import React, { Component } from 'react';
import globals from '../../../utils/globals';
import requestUtils from '../../../utils/requestUtils';
import projectPermissions from '../../../utils/projectPermissions';

import ModNav from '../../../components/elements/minecraft/mods/ModNav';
import ModFile from '../../../components/elements/minecraft/mods/files/ModFile';

class ModFiles extends Component {
    constructor() {
        super();
        this.state = {
            projectData: [],
            modFileData: [],
        };
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.getFetchJSON(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}`)
            .then((res) => {
                this.setState({ projectData: res.data });
            })
            .catch((err) => {
                console.log('Game');
            });

        requestUtils.getFetchJSON(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/files`)
            .then((res) => {
                this.setState({ modFileData: res.data });
            })
            .catch((err) => {
                console.log('Project Files');
            });
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        document.title = `${this.state.projectData.name} - Files - Diluv`;
        return (
            <section className="section">
                <div className="columns">
                    <div className="column is-four-fifths">
                        <div className="columns">
                            <div className="column is-four-fifths">
                                <h2 className="title is-2">{this.state.projectData.name} Files</h2>
                            </div>
                            <div className="column">
                                {
                                    (this.state.projectData.permission && projectPermissions.hasProjectPermission(
                                        this.state.projectData.permission,
                                        projectPermissions.PERMISSION.FILE.UPLOAD,
                                    )) ? (
                                        <a
                                            className="button is-success"
                                            role="button"
                                            href={`/minecraft/mods/${projectSlug}/upload`}
                                        >
                                            Upload File
                                        </a>
                                    ) : ''
                                }
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
                                {
                                    this.state.projectData.permission && globals.containsProjectPermission(
                                        this.state.projectData.permission,
                                        globals.PERMISSION.FILE,
                                    ) ?
                                        (
                                            <th>
                                                Edit File
                                            </th>
                                        )
                                        : ''
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.modFileData.map(function (item) {
                                    return (
                                        <ModFile
                                            key={item.id}
                                            id={item.id}
                                            sha512={item.sha512}
                                            createdAt={item.createdAt}
                                            displayName={item.displayName}
                                            downloads={item.downloads}
                                            gameVersions={item.gameVersions}
                                            releaseType={item.releaseType}
                                            size={item.size}
                                            permission={this.state.projectData.permission}
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
            </section>
        );
    }
}

export default ModFiles;
