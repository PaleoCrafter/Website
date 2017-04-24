import React, {Component} from "react";

class Project extends Component {
    render() {
        return (
            document.title = "Overview - "+this.props.match.params[0].capitalize() + " - Project Alt",
                <div>
                    {this.props.match.params[0].capitalize()}
                </div>
        )
    }
}

export default Project;