import React, {Component} from "react";

class Projects extends Component {
    render() {
        return (
            document.title = this.props.match.params[0].capitalize() + " - Projects - Project Alt",
                <div>
                    <h1><i className="fa fa-cog" aria-hidden="true"/> {this.props.match.params[0].capitalize()}</h1>
                    <hr/>
                    <div className="alert alert-dismissible alert-warning">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <h4>Warning!</h4>
                        <p>An error occured while getting a list of {this.props.match.params[0]}.</p>
                    </div>
                    
                    <div className="container">
                    
                        <div className="row">
                            <div className="col-md-3"><p>
                            
                                {/* project type nav */}
                                <div className="list-group list-group-root">
                                    <a href="#" className="list-group-item">Item 1.1</a>
                                    <div className="list-group">
                                        <a href="#" className="list-group-item">Item 1.1.1</a>
                                        <a href="#" className="list-group-item">Item 1.1.2</a>
                                        <a href="#" className="list-group-item">Item 1.1.3</a>
                                    </div>
                                            
                                    <a href="#" className="list-group-item">Item 2.1</a>
                                    <div className="list-group">
                                        <a href="#" className="list-group-item">Item 2.1.1</a>
                                        <a href="#" className="list-group-item">Item 2.1.2</a>
                                        <a href="#" className="list-group-item">Item 2.1.3</a>
                                    </div>
                                            
                                    <a href="#" className="list-group-item">Item 3.1</a>
                                    <div className="list-group">
                                        <a href="#" className="list-group-item">Item 3.1.1</a>
                                        <a href="#" className="list-group-item">Item 3.1.2</a>
                                        <a href="#" className="list-group-item">Item 3.1.3</a>
                                    </div>
                                </div>
                                {/* end project type nav */}
            
                            </p></div>
                            
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="panel push-down">
                                        
                                        {/* page numbers nav, leaves 1 unit spare to align dropdowns */}
                                        <div className="row">
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
                                                        <a className="page-link" href="#">&raquo;</a>
                                                    </li>
                                                </ul>
                                            </div>
                            
                                            <div className="col-md-3">
                                                <div className="dropdown">
                                                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        Sort by:
                                                        <span classNameName="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                                        <li><a href="#">Newest</a></li>
                                                        <li><a href="#">Top Rated</a></li>
                                                        <li><a href="#">Etc</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                            
                                            <div className="col-md-3">
                                                <div className="dropdown">
                                                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        Game version:
                                                        <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                        <li><a href="#">1.6.4</a></li>
                                                        <li><a href="#">1.7.10</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                        </div>
                        
                                        <div className="row">
                                            <div className="col-md-12">
                                                <hr />
                                            </div>
                                        </div>
        
                                        {/* sample styling for mod entries */}
                                        <div className="row">
                                            <div className="col-md-3">
                                                <a href="#" className="thumbnail">
                                                    <img src="http://placehold.it/125x125" alt="..." />
                                                </a>
                                            </div>
                                                
                                            <div className="col-md-9">
                                                <h3><div id="modID">Mod by Modder</div></h3>
                                                    
                                                <div id="modDate">Updated: 4/23/2017</div>
                                                <div id="modVersions">Versions: 1.6.4, 1.7.10</div>
                                            </div>
                                        </div>
                                        {/*} ////////////////////////////// */}
                                        
                                        <div className="row">
                                            <div className="col-md-12">
                                                <hr />
                                            </div>
                                        </div>
                        
                                    </div>
                                </div>
                            </div>

                        </div>
        
                    </div>

                </div>
        )
    }
}
export default Projects;