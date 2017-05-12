import React, {Component} from "react";

class Account extends Component {

    render() {
        document.title = "Members - Diluv";
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Members</li>
                </ol>

                <div className="row">

                    <div className="col">
                        <div className="row">
                            <div className="panel push-down col-md-12">
                                {/* page numbers nav, leaves 1 unit spare to align dropdowns */}
                                <div className="row">
                                    <form className="form-inline">
                                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                                    </form>

                                    <div className="col-md-5">
                                        <ul className="pagination pagination-sm">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="?page=2">&laquo;</a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="?page=1">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="?page=2">2</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="?page=3">3</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="?page=4">4</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="?page=5">5</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="?page=6">6</a>
                                            </li>
                                            <li className="page-item">
                                                <p className="page-link" href="">...</p>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="?page=5">69</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">&raquo;</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <a href="#" className="thumbnail">
                                            <img src="" alt="..." width="125"
                                                 height="125"/>
                                        </a>
                                    </div>
                                    <div className="col-9">
                                        <div className="right">
                        <span className="badge badge-primary"><i className="fa fa-file"
                                                                 aria-hidden="true"/></span><br/>
                                            <span className="badge badge-primary"><i className="fa fa-cog"
                                                                                     aria-hidden="true"/></span><br/>
                                            <span className="badge badge-warning"><i className="fa fa-star"
                                                                                     aria-hidden="true"/></span><br/>
                                        </div>
                                        <h3>
                                            <a href="/project/test">
                                                <div id="modName">TheCodedOne
                                                </div>
                                            </a>
                                            <p id="modDescription">0 Projects</p>
                                        </h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="?page=2">&laquo;</a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="?page=1">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="?page=2">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="?page=3">3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="?page=4">4</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="?page=5">5</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="?page=6">6</a>
                                    </li>
                                    <li className="page-item">
                                        <p className="page-link" href="">...</p>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="?page=5">69</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">&raquo;</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;