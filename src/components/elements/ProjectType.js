import React, {Component} from "react";
import {Link} from "react-router-dom";
import globals from "../../globals";

class ProjectType extends Component {
    constructor() {
        super();
        this.state = {items: []};
    }

    componentDidMount() {

        fetch(globals.endPoint + `/games/1/projectTypes`)
            .then(result => result.json())
            .then(items => this.setState({items}));
    }

    render() {
        return (
            <div className="dropdown-menu" aria-labelledby="dropdown01">
                {
                    this.state.items.map(item =>
                        <Link key={item.id} className="dropdown-item" to={'/projects/' + item.name.toLowerCase()}>
                            {item.name}
                        </Link>
                    )
                }
            </div>
        );
    }

}
export default ProjectType;