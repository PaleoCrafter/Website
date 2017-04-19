import React, { Component } from 'react';

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <a className="navbar-brand" href="/"><img src="/favicon/favicon.ico" style={{width: 50}}/></a>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="#">Mods</a>
                                <a className="dropdown-item" href="#">Modpacks</a>
                                <a className="dropdown-item" href="#">Resource Packs</a>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search..."/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                        <button type="button" className="btn">
                            <span><i className="fa fa-cog fa-lg"></i></span>
                        </button>
                        &nbsp;
                        <button type="button" className="btn">
                            <span><i className="fa fa-envelope fa-lg"></i></span>
                        </button>
                        &nbsp;
                        <button type="button" className="btn">
                            <span><i className="fa fa-bell fa-lg"></i></span>
                        </button>
                        &nbsp;&nbsp;
                        <img src="/favicon/favicon.ico" style={{height:40}}/>
                    </div>
                </div>
            </nav>
        );
    }

}


export default Navbar;