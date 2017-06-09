import React, {Component} from "react";
import globals from "../../../globals";
import {Link} from "react-router-dom";

class Minecraft extends Component {
    constructor() {
        super();
        this.state = {gameData: [], items: []};
    }


    componentDidMount() {
        fetch(globals.endPoint + `/games?name=minecraft`)
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
                    <a href="https://minecraft.net">
                        <img width="200px" src="/img/minecraft.svg"/>
                    </a>
                    <br/>
                    Projects:
                    {
                        this.state.items.map(item =>
                            <Link key={item.id} className="dropdown-item"
                                  to={'/minecraft/projects/' + item.name.toLowerCase()}>
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