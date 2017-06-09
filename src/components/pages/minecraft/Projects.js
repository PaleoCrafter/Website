import React, {Component} from "react";
import ProjectView from "../../elements/ProjectView";
import globals from "../../../globals";

class Projects extends Component {

    constructor() {
        super();
        this.state = {gameData: [], items: []};
    }


    componentDidMount() {
        fetch(globals.endPoint + `/games?name=minecraft`)
            .then(result => result.json())
            .then(gameData => {
                this.setState({gameData: gameData});
                console.log(gameData[0].id);
                fetch(globals.endPoint + `/projects`)
                    .then(result => result.json())
                    .then(projects => {
                        this.setState({items: projects});
                        console.log(projects);
                    });
            });

    }

    render() {
        document.title = this.props.match.params[0].capitalize() + " - Projects - Diluv";
        return (
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
                        <div className="col-md-3">
                            {/* project type nav */}
                            <div className="list-group list-group-root">
                                <a href="#" className="list-group-item">Technology</a>
                                <div className="list-group">
                                    <a href="#" className="list-group-item">Item 1.1.1</a>
                                    <a href="#" className="list-group-item">Item 1.1.2</a>
                                    <a href="#" className="list-group-item">Item 1.1.3</a>
                                </div>

                                <a href="#" className="list-group-item">Magic</a>

                                <a href="#" className="list-group-item">Miscellaneous</a>
                            </div>
                            {/* end project type nav */}
                        </div>

                        <div className="col-md-9">
                            <div className="row">
                                <div className="panel push-down col-md-12">

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
                                                <button className="btn btn-default dropdown-toggle" type="button"
                                                        id="dropdownMenu1" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="true">
                                                    Sort by:
                                                    <span className="caret"/>
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                                    <li><a className="dropdown-item" href="#">Newest</a></li>
                                                    <li><a className="dropdown-item" href="#">Top Rated</a></li>
                                                    <li><a className="dropdown-item" href="#">Etc</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="dropdown">
                                                <button className="btn btn-default dropdown-toggle" type="button"
                                                        id="dropdownMenu2" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="true">
                                                    Game version:
                                                    <span className="caret"/>
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <li><a className="dropdown-item" href="#">1.6.4</a></li>
                                                    <li><a className="dropdown-item" href="#">1.7.10</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <hr />
                                        </div>
                                    </div>
                                    {
                                        this.state.items.map(item =>
                                            <ProjectView key={item.id} id={item.id} name={item.name}
                                                         description={item.description} logo={item.logo}
                                                         totalDownloads={item.totalDownloads}
                                                         createdAt={item.createdAt}
                                                         versions={item.gameVersions}
                                                         categories={item.categories}
                                            />
                                        )
                                    }
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