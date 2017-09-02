import React, {PureComponent} from "react";
import globals from "../globals";

class MMDNav extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {game: "", items: [], user: [], loggedIn: false};
    }

    componentDidMount() {
        const location = this.props.location.pathname;
        let game = location.split("/")[1];
        if (game == "minecraft") {
            this.setState({game: "minecraft"});
            globals.getFetch(globals.endPoint + '/games/minecraft')
                .then(res => res.json())
                .then(res => {
                    if (res.statusCode === 200) {
                        globals.getFetch(globals.endPoint + '/games/minecraft/projectTypes')
                            .then(res => res.json())
                            .then(res => {
                                if (res.statusCode === 200) {
                                    this.setState({items: res.data});

                                } else {
                                }
                            });
                    } else {
                    }
                });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (globals.isUserLoggedIn() && !this.state.loggedIn) {
            this.setState({loggedIn: true});

            globals.getFetch(globals.endPoint + '/users/me', "GET", globals.getToken())
                .then(res => res.json())
                .then(res => {
                    if (res.statusCode === 200) {
                        this.setState({user: res.data});
                    } else {
                        console.log(res.data)
                    }
                });

            return true
        } else {
            this.setState({loggedIn: false});
            return true
        }
    }

    renderLoggedIn() {
        return (
            <div>
                <a className="nav-item dropdown text-white" id="navbarDropdownMenuLink" data-toggle="dropdown">
                    <img className="avatar avatar-small" src={this.state.user.avatar}/> {this.state.user.username}
                </a>

                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="/account"><i className="fa fa-cog"/> Account</a>
                    <a className="dropdown-item" href="/logout"><i className="fa fa-sign-out"/> Logout</a>
                </div>
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
                <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarHome">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <a className="navbar-brand" href="/"><img src="/favicon/favicon.ico" style={{width: 50}}/></a>

                    <div className="collapse navbar-collapse" id="navbarHome">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href={"/" + this.state.game}>
                                    Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            {
                                this.state.items.length > 0 ? this.state.items.map(item =>
                                    <li key={item.slug} className="nav-item">
                                        <a className="nav-link" href={'/' + this.state.game + '/projects/' + item.slug}>
                                            {item.name}
                                        </a>
                                    </li>
                                ) : console.log(this.state.items)
                            }
                        </ul>
                        {/*<form className="form-inline my-2 my-lg-0" action="/search">*/}
                        {/*<input className="form-control mr-sm-2" type="text" name="search" placeholder="Search..."/>*/}
                        {/*<button className="btn btn-outline-navbar my-2 my-sm-0" type="submit"><i*/}
                        {/*className="fa fa-search"/></button>*/}
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