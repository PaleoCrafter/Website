import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import ReactTooltip from 'react-tooltip';
import requestUtils from '../../../../utils/requestUtils';
import dateFormat from 'dateformat';
import prettyBytes from 'pretty-bytes';

class ModFiles extends Component {

    constructor() {
        super();
        this.state = {
            projectData: [],
            projectFileData: []
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
                    this.setState({ projectFileData: res.data });
                    console.log(res.data);

                } else {
                    console.log('Game');
                }
            })
            .catch(err => {
                //TODO
            });
    }
    static getDate(epoch) {
        return dateFormat(new Date(epoch), 'hh:mm:ss dd/mm/yyyy');
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
                                           href={'/minecraft/project/' + projectSlug + '/upload'}>
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
                                   href={'/minecraft/project/' + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active"
                                   href={'/minecraft/project/' + projectSlug + '/files'}>Files</a>
                            </li>
                            {
                                (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.EDIT_SETTINGS)) ? (
                                    <li className="nav-item">
                                        <a className="nav-link"
                                           href={'/minecraft/project/' + projectSlug + '/settings'}>Settings</a>
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
                                    {
                                        (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.UPLOAD_FILE)) ? (
                                            <th>Status</th>
                                        ) : ''
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.projectFileData.map(function (item) {
                                        return (
                                            <tr key={item.sha256}>
                                                <td>{item.displayName}</td>
                                                <td>{ModFiles.getDate(item.createdAt)}</td>
                                                <td>{prettyBytes(item.size)}</td>
                                                <td>
                                                    {
                                                        //TODO Max to like 5, and add comma's
                                                        item.gameVersions ? item.gameVersions.map(item =>
                                                            <div key={item.version}>
                                                                {item.version}
                                                            </div>
                                                        ) : ''
                                                    }
                                                </td>
                                                <td>{item.downloads}</td>
                                                <td>
                                                    {(item.public) ? (
                                                            <div>
                                                                <a href={item.downloadUrl}>Download</a>
                                                                <i data-tip={item.sha256}
                                                                   className='fa fa-info-circle'/>
                                                                <ReactTooltip class='hoverSHA'
                                                                              delayHide={1000}
                                                                              effect='solid'/>
                                                            </div>
                                                        ) :
                                                        (
                                                            <div>
                                                                <a>Download Not Public</a>
                                                            </div>
                                                        )
                                                    }

                                                </td>
                                                {
                                                    (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.UPLOAD_FILE)) ? (
                                                        <td>
                                                            {(item.public) ? 'Public' :
                                                                item.status
                                                            }
                                                        </td>
                                                    ) : ''
                                                }
                                            </tr>
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
