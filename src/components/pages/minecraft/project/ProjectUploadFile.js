import React, {Component} from "react";
import globals from "../../../../globals";

class ProjectUploadFile extends Component {

    constructor() {
        super();
        this.state = {projectData: [], fileUploading: false};
        this.uploadFile = this.uploadFile.bind(this);

    }

    uploadFile(e) {

        if (e.target.files.length === 1) {
            const file = e.target.files[0];
            if (file !== null) {
                this.setState({fileUploading: true});

                const projectSlug = this.props.match.params.slug;
                const formData = new FormData();
                const xhr = new XMLHttpRequest();

                formData.append('uploads[]', file, file.name);

                xhr.open("POST", globals.endPoint + '/projects/' + projectSlug + '/files');
                console.log(globals.getToken());
                xhr.setRequestHeader('Authorization', 'Bearer ' + globals.getToken());
                xhr.onload = e => console.log(e.target.responseText);
                xhr.onerror = e => console.log("Error: " + e);
                xhr.onreadystatechange = function () {//Call a function when the state changes.
                    console.log(xhr.status)
                };
                xhr.send(formData)
            } else
                this.setState({fileUploading: false})
        } else
            this.setState({fileUploading: false})
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        fetch(globals.endPoint + '/projects/' + projectSlug)
            .then(res => globals.getJson(res))
            .then(res => {
                if (res.status === 200) {
                    this.setState({projectData: res.data});
                } else {
                    console.log('Game');
                    console.log(res.status);
                    console.log(res.data);
                }
            });
    }

    renderFileUpload() {

        return (
            <div>
                File: <input type="file" name="file" accept=".jar,.zip" onChange={this.uploadFile}/>
            </div>
        )
    }

    renderUploadProgress() {
        return (
            <div className="row">
                <div className="col-8">
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                             aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: 75 + '%'}}></div>
                    </div>
                </div>
                <div className="col-4">
                    <button>Cancel</button>
                </div>
            </div>
        )
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        document.title = "Files - " + this.state.projectData.name + " - Diluv";

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
                                this.state.fileUploading ? (this.renderUploadProgress()) :
                                    (this.renderFileUpload())
                            }
                        </div>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href={"/minecraft/project/" + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={"/minecraft/project/" + projectSlug + "/files"}>Files</a>
                            </li>
                            {
                                (globals.hasProjectPermission(this.state.projectData.permission, "NULL")) ? (
                                    <li className="nav-item">
                                        <a className="nav-link"
                                           href={"/minecraft/project/" + projectSlug + "/settings"}>Settings</a>
                                    </li>) : ""
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectUploadFile;