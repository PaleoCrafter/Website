import React, {Component} from "react";
import globals from "../../../globals";
import {Link} from "react-router-dom";

class Minecraft extends Component {
    constructor() {
        super();
        this.state = {gameData: [], items: []};
    }


    componentDidMount() {
        fetch(globals.endPoint + `/games/1`)
            .then(result => result.json())
            .then(gameData => {
                this.setState({gameData});

                fetch(globals.endPoint + `/games/1/projectTypes`)
                    .then(result => result.json())
                    .then(projectTypes => {
                        this.setState({items: projectTypes});
                        console.log(projectTypes);
                    });
            });

    }

    render() {
        return (
            <div>
                <div>
                    Projects:
                    {
                        this.state.items.map(item =>
                            <Link key={item.id} className="dropdown-item"
                                  to={'/minecraft/projects/' + item.slug}>
                                {item.name}
                            </Link>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Minecraft;