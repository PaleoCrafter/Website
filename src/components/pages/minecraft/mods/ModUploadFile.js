import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtils';
import userUtils from '../../../../utils/userUtils';

class ProjectUploadFile extends Component {

    constructor() {
        super();
        this.state = {
            projectData: [],
            file: [],
            edit: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(e) {

        if (e.target.files.length === 1) {
            const file = e.target.files[0];
            if (file !== null) {
                this.setState({ file: file });
                return;
            }
        }
        this.setState({ file: null });
    }

    onSubmit(e) {
        const projectSlug = this.props.match.params.slug;

        const formData = new FormData();
        // formData.append('parentId', 0);
        formData.append('displayName', this.state.file.name);
        formData.append('releaseType', 'release');
        formData.append('file', this.state.file, this.state.file.name);

        fetch(globals.endPoint() + '/games/minecraft/mods/projects/' + projectSlug + '/files',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userUtils.getToken()}`,
                },
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error('The request /games/minecraft/mods/projects/' + projectSlug + '/files to the api had an error. ' + err);
            });
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

    renderEditForm() {
        return (
            <div>
                Display Name: <input ref="projectName" type="text" className="form-control input-md"
                                     required={true}/>
            </div>
        );
    }

    renderFileUpload() {
        return (
            <div className="container">
                <div className="row">
                    File: <input type="file" name="file" accept=".jar,.zip"
                                 onChange={this.uploadFile}/>

                </div>
                <div className="row">
                    <a className="btn btn-info" role="button" onClick={this.onSubmit}>
                        Upload File
                    </a>
                </div>

                {
                    this.state.edit ? this.renderEditForm() : ''
                }
            </div>
        );
    }

    render() {
        console.log(this.state.projectData);
        const projectSlug = this.props.match.params.slug;
        document.title = this.state.projectData.name + ' - Files - Diluv';

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Upload File</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10">
                        <div className="col-12">
                            {
                                /*TODO Database call for accept*/
                                // this.state.fileUploading ? (this.renderUploadProgress()) :
                                (this.renderFileUpload())
                            }
                        </div>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active"
                                   href={'/minecraft/mods/' + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href={'/minecraft/mods/' + projectSlug + '/files'}>Files</a>
                            </li>
                            {
                                (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.UPLOAD_FILE)) ? (
                                    <li className="nav-item">
                                        <a className="nav-link"
                                           href={'/minecraft/mods/' + projectSlug + '/settings'}>Settings</a>
                                    </li>) : ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectUploadFile;
