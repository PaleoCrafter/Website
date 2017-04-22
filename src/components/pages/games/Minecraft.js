import React, {Component} from "react";
import globals from "../../../globals";

class Minecraft extends Component {
    constructor() {
        super();
        this.state = {gameData: []};
    }


    componentDidMount() {
        fetch(globals.endPoint + `/games?name=minecraft`)
            .then(result => result.json())
            .then(gameData => {
                this.setState({gameData});

                fetch(globals.endPoint + `/projectTypes`)
                    .then(result => result.json())
                    .then(projectTypes => {
                        console.log(projectTypes);
                    });
            });
        console.log()
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.gameData.map(gameData =>
                            <div key={gameData.id}>
                                <a href={gameData.website}>{gameData.name}</a>
                            </div>
                        )
                    }
                </div>
                Index
            </div>
        )
    }
}

export default Minecraft;