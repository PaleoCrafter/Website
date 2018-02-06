import React, { Component } from 'react';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

import ModFile from '~/components/elements/mods/files/ModFile';

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
                if (res.statusCode === 200) {
                    this.setState({ projectData: res.data });
                } else {
                    console.log('Game');
                }
            })
            .catch(err => {
                //TODO
            });

        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods/projects/' + projectSlug + '/files')
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({ modFileData: res.data });
                } else {
                    console.log('Game');
                }
            })
            .catch(err => {
                //TODO
            });
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        document.title = this.state.projectData.name + ' - Files - Diluv';
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h2>{this.state.projectData.name}</h2>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav">
                            <li>
                                {
                                    (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.UPLOAD_FILE)) ? (
                                        <a className="btn btn-info" role="button"
                                           href={'/minecraft/mods/' + projectSlug + '/upload'}>
                                            Upload File
                                        </a>
                                    ) : ''
                                }
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link"
                                   href={'/minecraft/mods/' + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active"
                                   href={'/minecraft/mods/' + projectSlug + '/files'}>Files</a>
                            </li>
                            {
                                (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.EDIT_SETTINGS)) ? (
                                    <li className="nav-item">
                                        <a className="nav-link"
                                           href={'/minecraft/mods/' + projectSlug + '/settings'}>Settings</a>
                                    </li>) : ''
                            }
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-10">
                        <div className="table-responsive">
                            <table className="table">
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
                    </div>
                </div>
            </div>
        );
    }
}

export default ModFiles;
