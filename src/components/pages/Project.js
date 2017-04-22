import React, {Component} from "react";

class Project extends Component {
    render() {
        return (
            <div>
                {this.props.match.params[0]}
            </div>
        )
    }
}

export default Project;