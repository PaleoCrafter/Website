import React, {Component} from "react";
import globals from "../../../../globals";
import ReactTooltip from "react-tooltip";

class ProjectFiles extends Component {

    constructor() {
        super();
        this.state = {projectData: [], projectFileData: []};
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        globals.getFetch(globals.endPoint + '/projects/' + projectSlug, "GET", globals.getToken())
            .then(res => globals.getJson(res))
            .then(res => {
                if (res.status === 200) {
                    this.setState({projectData: res.data});
                } else {
                    console.log('Game');
                }
            });

        fetch(globals.endPoint + '/projects/' + projectSlug + '/files')
            .then(res => globals.getJson(res))
            .then(res => {
                if (res.status === 200) {
                    this.setState({projectFileData: res.data});
                } else {
                    console.log('Game');
                }
            });
    }

    render() {
        const projectSlug = this.props.match.params.slug;
        document.title = "Files - " + this.state.projectData.name + " - Diluv";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h2>{this.state.projectData.name}</h2>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav">
                            <li>
                                {
                                    (globals.hasProjectPermission(this.state.projectData.permission, "NULL")) ? (
                                        <a className="btn btn-info" role="button"
                                           href={"/minecraft/project/" + projectSlug + "/uploadFile"}>
                                            Upload File
                                        </a>
                                    ) : ""
                                }
                            </li>
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
                                        (globals.hasProjectPermission(this.state.projectData.permission, "NULL")) ? (
                                            <th>Status</th>
                                        ) : ""
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.projectFileData.map(function (item) {
                                        return (
                                            <tr key={item.sha256}>
                                                <td>{item.displayName}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{item.size}</td>
                                                <td>
                                                    {
                                                        //TODO Max to like 5, and add comma's
                                                        item.gameVersions ? item.gameVersions.map(item =>
                                                            <div key={item.version}>
                                                                {item.version}
                                                            </div>
                                                        ) : ""
                                                    }
                                                </td>
                                                <td>{item.downloads}</td>
                                                <td>
                                                    <a href={item.downloadUrl}>
                                                        Download
                                                    </a> <i data-tip={item.sha256} className="fa fa-info-circle"
                                                            aria-hidden="true"/>
                                                    <ReactTooltip class='hoverSHA' delayHide={1000} effect='solid'/>
                                                </td>
                                                {
                                                    (globals.hasProjectPermission(this.state.projectData.permission, "NULL")) ? (
                                                        <td>{item.status}</td>
                                                    ) : ""
                                                }
                                            </tr>
                                        )
                                    }, this)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href={"/minecraft/project/" + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href={"/minecraft/project/" + projectSlug + "/files"}>Files</a>
                            </li>
                            {
                                console.log(this.state.projectData)
                            } {
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

export default ProjectFiles;