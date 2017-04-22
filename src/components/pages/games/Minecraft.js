import React, {Component} from "react";

class Index extends Component {
    constructor() {
        super();
        this.state = {gameData: []};
    }


    componentDidMount() {
        //TODO Doesn't currently exist
        fetch(`http://localhost:3000/v1/games?name=minecraft`)
            .then(result => result.json())
            .then(gameData => {
                this.setState({gameData});

                fetch(`http://localhost:3000/v1/projectTypes`)
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
                            <div key={gameData.id} >
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

export default Index;