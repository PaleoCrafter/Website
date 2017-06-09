import React, {Component} from "react";
import ProjectView from "../../elements/ProjectView";


class Project extends Component {
    render() {
        document.title = "Overview - " + this.props.match.params[0].capitalize() + " - Diluv";

        return (
            <div className="container">
                {/* header */}
                <div className="row">
                    <div className="col-md-10">
                        <h2>{this.props.match.params[0].capitalize()}</h2>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav">
                            <li>
                                <a href="#">Download</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>

                        {/* sample styling for mod entries */}
                        <div className="row">
                            <div id="mod-nav" className="col-md-12">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/">Overview</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Files</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Wiki</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <ProjectView/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div id="modDesc">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Project;