import React, {Component} from "react";

class ProjectsCreate extends Component {

    constructor() {
        super();
        this.state = {gameData: [], projects: [], projectType: [], error: []};
    }

    render() {
        const projectTypeName = this.props.match.params[0];

        document.title = this.props.match.params[0].capitalize() + " - Projects - Diluv";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1><i className="fa fa-cog" aria-hidden="true"/> {"Create Project"}</h1>
                    </div>
                    <div className="col-md-6"/>

                </div>

                <div className="row">
                    <div className="col-md-2">
                        Create
                        {/*Send data*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsCreate;