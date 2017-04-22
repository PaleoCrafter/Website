import React, {Component} from "react";
import Minecraft from "./Minecraft";

class Index extends Component {
    constructor() {
        super();
        this.state = {gameData: []};
    }


    componentDidMount() {
        let host = window.location.host;
        let parts = host.split(".");
        let subdomain = "";
        //TODO Fix for localhost testing
        if (parts.length > 2) {
            subdomain = parts[0];
        }

        if (subdomain == "minecraft") {
            this.setState({Minecraft});
        } else {

        }
    }

    render() {
        return (
            <div>
                <Minecraft/>
            </div>
        )
    }
}

export default Index;