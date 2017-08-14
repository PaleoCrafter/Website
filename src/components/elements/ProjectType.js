import React, {Component} from "react";
import globals from "../../globals";
import {Link} from "react-router-dom";

class ProjectType extends Component {
    constructor() {
        super();
        this.state = {items: []};
    }

    componentDidMount() {
        fetch(globals.endPoint + '/games/minecraft/projectTypes')
            .then(res => res.json())
            .then(res => this.setState({items: res}))
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="dropdown-menu">
                {
                    this.state.items.map(item =>
                        <Link key={item.id} className="dropdown-item" to={'/projects/' + item.slug}>
                            {item.name}
                        </Link>
                    )
                }
            </div>
        );
    }

}
export default ProjectType;