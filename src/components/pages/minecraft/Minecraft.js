import React, {Component} from "react";
import globals from "../../../globals";
import {Link} from "react-router-dom";

class Minecraft extends Component {
    constructor() {
        super();
        this.state = {gameData: [], items: []};
    }


    componentDidMount() {
        fetch(globals.endPoint + '/games/minecraft')
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({gameData:res.data});
                    fetch(globals.endPoint + '/games/minecraft/projectTypes')
                        .then(res => res.json())
                        .then(res => {
                            if (res.statusCode === 200) {
                                this.setState({items: res.data});
                                console.log(res.data);
                            } else {
                                //TODO Handle
                            }
                        });
                } else {
                    //TODO Handle
                }
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <h1>Projects</h1>
                    </div>
                    <div className="col-md-4"/>
                </div>
                <div className="row">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <Link to="/minecraft/projects/mods">
                            Mods
                        </Link>
                    </div>
                    <div className="col-md-4"/>
                </div>
            </div>
        )
    }
}

export default Minecraft;