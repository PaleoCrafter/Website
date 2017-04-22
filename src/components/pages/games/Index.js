import React, {Component} from "react";
import Minecraft from "./Minecraft";
import Main from "./Main";

class Index extends Component {
    constructor() {
        super();
        this.state = {game: <Main/>};
    }


    componentDidMount() {
        let host = window.location.host;
        let parts = host.split(".");
        let subdomain = "";
        let length = 2;
        if (host.includes("localhost")) {
            length = 1
        }
        if (parts.length > length) {
            subdomain = parts[0];
        }

        if (subdomain == "minecraft") {
            this.setState({game: <Minecraft/>});
        }
    }

    render() {
        return (
            <div>
                {this.state.game}
            </div>
        )
    }
}

export default Index;