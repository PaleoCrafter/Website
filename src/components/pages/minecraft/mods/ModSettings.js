import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '../../../../utils/globals';
import capitalize from 'capitalize';
import requestUtils from '../../../../utils/requestUtils';

class ProjectFiles extends Component {

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
                    console.log(res.status);
                    console.log(res.data);
                }
            })
            .catch(err => {
                //TODO
            });
    }

    render() {
        const projectSlug = this.props.match.params.slug;

        document.title = this.state.projectData.name + ' - Settings - Diluv';

        if (this.state.projectData.permission && !globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.EDIT_SETTINGS)) {
            return (<Redirect to={'/minecraft/project/' + projectSlug}/>);
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h2>{this.state.projectData.name} Settings</h2>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active"
                                   href={'/minecraft/project/' + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href={'/minecraft/project/' + projectSlug + '/files'}>Files</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href={'/minecraft/project/' + projectSlug + '/settings'}>Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectFiles;
