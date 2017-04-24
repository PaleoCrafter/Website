import React, {Component} from "react";
import ProjectType from "./elements/ProjectType";

class Navbar extends Component {

    render() {
        return (
            <div>
                <div style={{
                    width: '100%',
                    height: '230px',
                    'background-image': "url('http://wallpapercave.com/wp/xkROBiY.jpg')",
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover'
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
                            <button className="btn btn-outline-navbar my-2 my-sm-0" type="submit"><i className="fa fa-search" aria-hidden="true"/></button>
                        </form>
                        {/*Switch to css padding*/}
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-outline-navbar"><i className="fa fa-envelope" aria-hidden="true"/></button>
                                <button type="button" className="btn btn-outline-navbar"><i className="fa fa-bell" aria-hidden="true"/></button>
                                <button type="button" className="btn btn-outline-navbar"><i className="fa fa-cog" aria-hidden="true"/></button>
                            </div>
                            &nbsp;
                            &nbsp;
                            <img className="avatar" src="http://placehold.it/400/50B2D6/ffffff" style={{height: 45,width:45   }}/>
                        </div>
                    </div>
                </nav>
                <br/>
            </div>
        );
    }
}


export default Navbar;