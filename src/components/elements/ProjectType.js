import React, {Component} from "react";
import globals from "../../globals";
import {Link} from "react-router-dom";

class ProjectType extends Component {
    constructor() {
        super();
        this.state = {items: []};
    }

    componentDidMount() {
        fetch(globals.endPoint + `/games/1/projectTypes`)
            .then(result => result.json())
            .then(items => this.setState({items: items}))
            .catch(err => {
                console.log(err);
            });
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