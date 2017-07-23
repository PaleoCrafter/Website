import React, {Component} from "react";
import {Redirect} from "react-router";
import globals from "../../../../globals";

class ProjectFiles extends Component {

    constructor() {
        super();
        this.state = {projectData: [], projectFileData: []};
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        fetch(globals.endPoint + `/projects/` + projectSlug)
            .then(res => {
                return res.json().then(json => ({
                        status: res.status,
                        data: json
                    })
                )
            })
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

    render() {
        const projectSlug = this.props.match.params.slug;

        document.title = "Settings - " + projectSlug.capitalize() + " - Diluv";

        if (!globals.hasProjectPermission(this.state.projectData.permission, "NULL")) {
            return (<Redirect to={"/minecraft/project/" + projectSlug}/>)
        } else
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">

                        </div>
                        <div className="col-md-2">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active"
                                       href={"/minecraft/project/" + projectSlug}>Overview</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"
                                       href={"/minecraft/project/" + projectSlug + "/files"}>Files</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"
                                       href={"/minecraft/project/" + projectSlug + "/settings"}>Settings</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
    }
}

export default ProjectFiles;