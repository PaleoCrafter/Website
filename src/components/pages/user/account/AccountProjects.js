import React, {Component} from "react";
import globals from "../../../../globals";
import ProjectView from "../../../elements/ProjectView";
import AccountNav from "../../../elements/account/AccountNav";

class AccountProjects extends Component {

    constructor() {
        super();
        this.state = {user: []};
    }

    componentDidMount() {
        globals.getFetch(globals.endPoint + '/users/me', "GET", globals.getToken())
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({user: res.data});
                    console.log(res.data)

                } else {
                    console.log(res.data)
                }
            });
    }

    render() {
        document.title = "Account Projects - Diluv";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1><i className="fa fa-cog"/> Account Projects</h1>
                    </div>
                </div>

                <div className="row">
                    <AccountNav/>
                    <div className="col-md-8">
                        {
                            this.state.user.projects && this.state.user.projects.length > 0 ? this.state.user.projects.map(item =>
                                <ProjectView key={item.slug}
                                             name={item.name}
                                             authors={item.authors}
                                             description={item.description}
                                             logo={item.logo}
                                             totalDownloads={item.totalDownloads}
                                             createdAt={item.createdAt}
                                             updatedAt={item.updatedAt}
                                    // gameVersions={item.gameVersions}
                                             categories={item.categories}
                                             shortDescription={item.shortDescription}
                                             slug={item.slug}
                                             permission={item.permission}
                                />
                            ) : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountProjects;