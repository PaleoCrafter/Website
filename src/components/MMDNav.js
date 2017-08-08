import React, {PureComponent} from "react";
import globals from "../globals";

class MMDNav extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {game: "", items: []};
    }

    componentDidMount() {
        const location = this.props.location.pathname;
        let game = location.split("/")[1];
        if (game == "minecraft") {
            this.setState({game: "minecraft"});
            fetch(globals.endPoint + '/games/' + game)
                .then(res => globals.getJson(res))
                .then(gameData => {
                    this.setState({gameData});

                    fetch(globals.endPoint + '/games/' + game + '/projectTypes')
                        .then(res => globals.getJson(res))
                        .then(projectTypes => {
                            this.setState({items: projectTypes});
                            console.log(projectTypes);
                        });
                });

        }
    }

    renderLoggedIn() {
        return (
            <div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <a href="/private-messages">
                        <button type="button" className="btn btn-outline-navbar">
                            <i className="fa fa-envelope" aria-hidden="true"/>
                        </button>
                    </a>
                    <a href="/notifications">
                        <button type="button" className="btn btn-outline-navbar">
                            <i className="fa fa-bell" aria-hidden="true"/>
                        </button>
                    </a>
                    <a href="/account">
                        <button type="button" className="btn btn-outline-navbar">
                            <i className="fa fa-cog" aria-hidden="true"/>
                        </button>
                    </a>
                </div>
                &nbsp;
                &nbsp;
                <a href="/account">
                    <img className="avatar avatar-small" src="http://placehold.it/400/50B2D6/ffffff"/>
                </a>
            </div>
        )
    }

    renderNotLoggedIn() {
        return (
            <div>
                <div className="btn-toolbar">
                    <a href="/login">
                        <button type="button" className="btn btn-outline-navbar">
                            Login <i className="fa fa-envelope"/>
                        </button>
                    </a>
                    <span/>
                    <a href="/register">
                        <button type="button" className="btn btn-outline-navbar">
                            Register <i className="fa fa-bell"/>
                        </button>
                    </a>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div style={{
                    width: '100%',
                    height: '100px',
                }}/>
                <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <a className="navbar-brand" href="/"><img src="/favicon/favicon.ico" style={{width: 50}}/></a>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href={"/" + this.state.game}>
                                    Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            {
                                this.state.items.map(item =>
                                    <li key={item.slug} className="nav-item">
                                        <a className="nav-link" href={'/' + this.state.game + '/projects/' + item.slug}>
                                            {item.name}
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                        {/*<form className="form-inline my-2 my-lg-0" action="/search">*/}
                        {/*<input className="form-control mr-sm-2" type="text" name="search" placeholder="Search..."/>*/}
                        {/*<button className="btn btn-outline-navbar my-2 my-sm-0" type="submit"><i*/}
                        {/*className="fa fa-search" aria-hidden="true"/></button>*/}
                        {/*</form>*/}
                        &nbsp;&nbsp;&nbsp;
                        {
                            globals.isUserLoggedIn() ? this.renderLoggedIn() : this.renderNotLoggedIn()
                        }
                    </div>
                </nav>
                <br/>
            </div>
        )
    }
}

export default MMDNav;