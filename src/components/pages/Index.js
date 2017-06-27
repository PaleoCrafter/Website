import React, {Component} from "react";
import {Link} from "react-router-dom";

class Index extends Component {

    render() {
        return (
            <div>
                <Link to="/minecraft">
                    <a href="https://minecraft.net">
                        <img width="200px" src="/img/minecraft.svg"/>
                    </a>
                </Link>
            </div>
        )
    }
}

export default Index;