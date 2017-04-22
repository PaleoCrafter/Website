import React, {Component} from "react";
import {Link} from "react-router-dom";

class ProjectType extends Component {
    constructor() {
        super();
        this.state = {items: []};
    }

    //TODO Subdomains

    componentDidMount() {
        fetch(`https://api.mcmoddev.com/v1/games/1/projectTypes`)
            .then(result => result.json())
            .then(items => this.setState({items}));
    }

    render() {
        return (
            <div className="dropdown-menu" aria-labelledby="dropdown01">
                    {
                        this.state.items.map(item =>
                            <Link key={item.id} className="dropdown-item" to={'/project/' + item.name.toLowerCase()}>
                                {item.name}
                            </Link>
                        )
                    }
            </div>
        );
    }

}
export default ProjectType;