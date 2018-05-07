import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtilities';
import ModNav from '../../../elements/minecraft/mods/ModNav';

class ModUploadFile extends Component {
    constructor() {
        super();
        this.state = {
            projectData: [],
            file: [],
            edit: false,
            displayName: '',
            releaseType: 'release',
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onDisplayNameChange = this.onDisplayNameChange.bind(this);
        this.onReleaseTypeChange = this.onReleaseTypeChange.bind(this);
    }


    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}`))
            .then((res) => {
                this.setState({ projectData: res.data });
            })
            .catch((err) => {
                console.error(err);
            });
    }


    uploadFile(e) {
        if (e.target.files.length === 1) {
            const file = e.target.files[0];
            if (file !== null) {
                this.setState({ file });
                if (!this.state.displayName) {
                    this.setState({ displayName: file.name });
                }
                return;
            }
        }
        this.setState({ file: null });
    }

    onSubmit(e) {
        const projectSlug = this.props.match.params.slug;

        const formData = new FormData();
        // formData.append('parentId', 0);
        formData.append('displayName', this.state.displayName);
        formData.append('releaseType', this.state.releaseType);
        formData.append('changelog', this.refs.changelog.value);
        formData.append('file', this.state.file, this.state.file.name);

        requestUtils.fetchPost(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/files`), formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                this.setState({ error: { message: 'An unknown error occurred' } });
                console.error(`The request /games/minecraft/mods/projects/${projectSlug}/files to the api had an error. ${err}`);
            });
    }

    onDisplayNameChange(change) {
        this.setState({ displayName: change.target.value });
    }

    onReleaseTypeChange(change) {
        this.setState({ releaseType: change.target.value });
    }

    renderFileUpload() {
        return (
            <div>
                <div className="field">
                    <label className="label">File</label>

                    <div className="file">
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                name="resume"
                                accept=".jar,.zip"
                                onChange={this.uploadFile}
                            />
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

                <div className="field">
                    <label className="label">Display Name</label>

                    <div className="control">
                        <input
                            key="diplay"
                            onChange={this.onDisplayNameChange}
                            value={this.state.displayName}
                            className="input"
                            type="text"
                            placeholder="Display Name"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Changelog</label>
                    <div className="control">
                        <textarea ref="changelog" className="textarea" placeholder="Changelog"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Release Type</label>
                    <div className="control">
                        <div className="select">
                            <select onChange={this.onReleaseTypeChange}>
                                <option value="release">Release</option>
                                <option value="beta">Beta</option>
                                <option value="alpha">Alpha</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <a className="button is-primary" onClick={this.onSubmit}>
                        Upload File
                    </a>
                </div>
            </div>
        );
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        document.title = `${this.state.projectData.name} - Upload Files - Diluv`;

        return (
            <div className="container">
                <h2 className="title is-2"><i className="fa fa-cog"/> Upload File</h2>
                <div className="columns">
                    <div className="column is-four-fifths">
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
        );
    }
}

export default ModUploadFile;
