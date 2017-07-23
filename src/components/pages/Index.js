import React, {Component} from "react";
import {Link} from "react-router-dom";

class Index extends Component {

    render() {
        return (
            <div>
                <Link to="/minecraft">
                    <img width="200px" src="/img/minecraft.svg"/>
                </Link>
            </div>
        )
    }
}

export default Index;