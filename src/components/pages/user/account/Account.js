import React, {Component} from "react";
import AccountNav from "~/components/elements/account/AccountNav";

class Account extends Component {

    constructor() {
        super();
        this.state = {gameData: [], projects: [], projectType: [], error: []};
    }

    render() {
        document.title = "Account - Diluv";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1><i className="fa fa-cog"/> Account</h1>
                    </div>
                    <div className="col-md-6"/>

                </div>

                <div className="row">
                    <AccountNav/>
                </div>
            </div>
        )
    }
}

export default Account;
