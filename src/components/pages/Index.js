import React, {Component} from "react";
import {Link} from "react-router-dom";

class Index extends Component {

    render() {
        return (
            <div>
                <Link to="/minecraft">Minecraft</Link>
            </div>
        )
    }
}

export default Index;