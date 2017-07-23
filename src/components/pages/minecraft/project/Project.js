import React, {Component} from "react";
import globals from "../../../../globals";
const dateFormat = require('dateformat');

class Project extends Component {

    constructor() {
        super();
        this.state = {projectData: []};
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        globals.getFetch(globals.endPoint + `/projects/` + projectSlug, "GET", globals.getToken())
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
                    console.log(res.data)
                } else {
                    console.log('Game');
                }
            });
    }

    render() {
        document.title = "Overview - " + this.state.projectData.name + " - Diluv";
        const projectSlug = this.props.match.params.slug;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <a href="#" className="thumbnail">
                            <img src={this.state.projectData.logo} width="175" height="175"/>
                        </a>
                    </div>
                    <div className="col-md-8">
                        <h2>{this.state.projectData.name}</h2>
                        <br/>
                        <h6>Total Downloads: {this.state.projectData.totalDownloads}</h6>
                        <h6>Created: {this.state.projectData.createdAt}</h6>
                        <h6>Updated: {this.state.projectData.updatedAt}</h6>
                        {/*<h6>Authors: {this.state.projectData.authors}</h6>*/}
                        {/*<h6>Categories: {this.state.projectData.categories}</h6>*/}

                        {/*TODO Options*/}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10">
                        <p dangerouslySetInnerHTML={{__html: this.state.projectData.description}}/>
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

export default Project;