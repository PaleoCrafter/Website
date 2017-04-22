import React, {Component} from "react";
import ProjectType from "./elements/ProjectType";

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
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
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
                                <ProjectType/>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search..."/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        {/*Switch to css padding*/}
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <button type="button" className="btn">
                                <span><i className="fa fa-cog fa-lg"/></span>
                            </button>
                            &nbsp;
                            <button type="button" className="btn">
                                <span><i className="fa fa-envelope fa-lg"/></span>
                            </button>
                            &nbsp;
                            <button type="button" className="btn">
                                <span><i className="fa fa-bell fa-lg"/></span>
                            </button>
                            &nbsp;&nbsp;

                            <img src="/favicon/favicon.ico" style={{height: 40}}/>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


export default Navbar;