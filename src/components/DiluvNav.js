import React, { PureComponent } from 'react';
import globals from '../utils/globals';
import requestUtils from '../utils/requestUtils';
import userUtils from '../utils/userUtils';

class DiluvNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            game: '',
            items: [],
            user: [],
            error: ''
        };
    }

    componentDidMount() {
        const location = this.props.location.pathname;
        let game = location.split('/')[1];
        if (game === 'minecraft') {
            this.setState({ game: 'minecraft' });
            // requestUtils.getFetchJSON(globals.endPoint()  + '/games/minecraft/projectTypes')
            //     .then(res => {
            //         if (res.statusCode === 200) {
            //             this.setState({ items: res.data });
            //         } else {
            //             this.setState({ error: { message: res.data.message } });
            //         }
            //     })
            //     .catch(err => {
            //         this.setState({ error: { message: 'An unknown error occurred' } });
            //         console.error('The request /games/minecraft/projectTypes in DiluvNav to the api had an error. ' + err);
            //     });
        }
        this.getUserData();
    }

    getUserData() {
        if (userUtils.isUserLoggedIn()) {
            requestUtils.getFetchJSON(globals.endPoint() + '/users/me')
                .then(res => {
                    if (res.statusCode === 200) {
                        this.setState({ user: res.data });
                    } else {
                        this.setState({ error: { message: res.data.message } });
                    }
                })
                .catch(err => {
                    this.setState({ error: { message: 'An unknown error occurred' } });
                    console.error('The request /users/me to the api had an error. ' + err);
                });
        }
    }

    renderLoggedIn() {
        return (
            <div className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="avatar avatar-small" src={this.state.user.avatar}/> {this.state.user.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/account"><i className="fa fa-cog"/> Account</a>
                    <a className="dropdown-item" href="/logout"><i className="fa fa-sign-out-alt"/> Logout</a>
                </div>
            </div>
        );
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
        );
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button"
                            data-toggle="collapse"
                            data-target="#navbarHome">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <a className="navbar-brand" href="/"><img src="/favicon/favicon.ico"
                                                              style={{ width: 50 }}/></a>

                    <div className="collapse navbar-collapse" id="navbarHome">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href={'/' + this.state.game}>
                                    Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            {
                                this.state.items.length > 0 ? this.state.items.map(item =>
                                    <li key={item.slug} className="nav-item">
                                        <a className="nav-link"
                                           href={'/' + this.state.game + '/projects/' + item.slug}>
                                            {item.name}
                                        </a>
                                    </li>
                                ) : ''
                            }

                        </ul>
                        {/*<form className="form-inline my-2 my-lg-0" action="/search">*/}
                        {/*<input className="form-control mr-sm-2" type="text" name="search" placeholder="Search..."/>*/}
                        {/*<button className="btn btn-outline-navbar my-2 my-sm-0" type="submit"><i*/}
                        {/*className="fa fa-search"/></button>*/}
                        {/*</form>*/}
                        &nbsp;&nbsp;&nbsp;
                        {
                            userUtils.isUserLoggedIn() ? this.renderLoggedIn() : this.renderNotLoggedIn()
                        }
                    </div>
                </nav>
                <br/>
            </div>
        );
    }
}

export default DiluvNav;
