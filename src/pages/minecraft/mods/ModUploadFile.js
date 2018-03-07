import React, { Component } from 'react';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';
import userUtils from '~/utils/userUtils';
import ModNav from '~/components/elements/minecraft/mods/ModNav';

class ModUploadFile extends Component {

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
                console.log(res);
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
                this.setState({ projectData: res.data });
            })
            .catch(err => {
                console.log('Game');
                console.log(res.status);
                console.log(res.data);
            });
    }

    renderFileUpload() {
        return (
            <div className="container">
                <div className="row">
                    File:

                    <div className="file">
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume"
                                   accept=".jar,.zip"/>
                            <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload"/>
                          </span>
                          <span className="file-label">
                            Choose a file…
                          </span>
                        </span>
                        </label>
                    </div>

                </div>
                <div className="row">
                    <a className="btn btn-info" role="button" onClick={this.onSubmit}>
                        Upload File
                    </a>
                </div>
            </div>
        );
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        document.title = this.state.projectData.name + ' - Files - Diluv';

        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-four-fifths">
                            <h2 className="title is-2">Upload File</h2>
                            {
                                // this.state.fileUploading ? (this.renderUploadProgress()) :
                                (this.renderFileUpload())
                            }
                        </div>
                        <div className="column">
                            <ModNav slug={projectSlug} url="upload"/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ModUploadFile;
