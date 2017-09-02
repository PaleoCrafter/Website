import React, {Component} from "react";

class AccountNav extends Component {

    render() {
        document.title = "Account Settings - Diluv";
        return (
            <div className="col-md-2">
                <div className="list-group list-group-root">
                    <a className="list-group-item" href="/account">
                        Profile
                    </a>
                    <a className="list-group-item" href="/account/projects">
                        Projects
                    </a>
                    {/*<a className="list-group-item" href="/account/settings">*/}
                        {/*Settings*/}
                    {/*</a>*/}
                    <a className="list-group-item" href="/account/security">
                        Security
                    </a>
                </div>
            </div>
        )
    }
}

export default AccountNav;