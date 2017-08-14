import React, {Component} from "react";
import {Redirect} from "react-router";
import globals from "../../../globals";

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (globals.getStorage() != null) {
            globals.getStorage().clear();
        }
        return (<Redirect to={"/"}/>);
    }
}

export default Logout;