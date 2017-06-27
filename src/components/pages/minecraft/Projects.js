import React, {Component} from "react";
import ProjectView from "../../elements/ProjectView";
import globals from "../../../globals";

class Projects extends Component {

    constructor() {
        super();
        this.state = {gameData: [], projects: [], projectType: [], error: []};
    }

    componentDidMount() {
        fetch(globals.endPoint + `/games/1`)
            .then(res => {
                return res.json().then(json => ({
                        status: res.status,
                        data: json
                    })
                )
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({gameData: res.data});
                    const gameId = res.data.id;
                    const projectTypeName = this.props.match.params[0];
                    let projectType;
                    for (const key in res.data.projectTypes) {
                        const obj = res.data.projectTypes[key];
                        if (obj.slug === projectTypeName) {
                            projectType = obj;
                        }
                    }
                    this.setState({projectType: projectType});

                    fetch(globals.endPoint + `/games/${gameId}/projectTypes/${projectType.id}/projects`)
                        .then(res => {
                            return res.json().then(json => ({
                                    status: res.status,
                                    data: json
                                })
                            )
                        })
                        .then(res => {
                            if (res.status === 200) {
                                this.setState({projects: res.data});
                            } else {
                                console.log('Project');
                                console.log(res.status);
                                console.log(res.data);
                            }
                        })
                } else {
                    console.log('Game');
                    console.log(res.status);
                    console.log(res.data);
                }
            });

    }

    render() {
        document.title = this.props.match.params[0].capitalize() + " - Projects - Diluv";
        return (
            <div>
                <h1><i className="fa fa-cog" aria-hidden="true"/> {this.props.match.params[0].capitalize()}</h1>
                <hr/>
                {
                    false ?
                        <div className="alert alert-dismissible alert-warning">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <h4>Warning!</h4>
                            <p>An error occured while getting a list of {this.props.match.params[0]}.</p>
                        </div>
                        : <div/>
                }
                <div className="container">

                    <div className="row">
                        <div className="col-md-3">
                            {/* project type nav */}
                            <div className="list-group list-group-root">
                                {
                                    // console.log(this.state.projectType.categories)
                                    this.state.projectType.categories ? this.state.projectType.categories.map(item =>
                                        <a key={item.name} href={item.slug}
                                           className="list-group-item">{item.name}</a>
                                    ) : <div/>
                                }
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
                                                    {
                                                        ["Newest", "Top Rated"].map(item =>
                                                            <li key={item}>
                                                                <a className="dropdown-item" href="#">{item}</a>
                                                            </li>
                                                        )
                                                    }
                                                    {/*<li><a className="dropdown-item" href="#">Newest</a></li>*/}
                                                    {/*<li><a className="dropdown-item" href="#">Top Rated</a></li>*/}
                                                    {/*<li><a className="dropdown-item" href="#">Etc</a></li>*/}
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
                                                    {
                                                        this.state.gameData.versions ? this.state.gameData.versions.map(item =>
                                                            <li key={item.version}>
                                                                <a className="dropdown-item" href="#">
                                                                    {item.version}
                                                                </a>
                                                            </li>
                                                        ) : <div/>
                                                    }
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
                                        this.state.projects ? this.state.projects.map(item =>
                                            <ProjectView key={item.id} id={item.id}
                                                         name={item.name}
                                                         authors={item.authors}
                                                         description={item.description} logo={item.logo}
                                                         totalDownloads={item.totalDownloads}
                                                         createdAt={item.createdAt}
                                                         updatedAt={item.updatedAt}
                                                         versions={item.gameVersions}
                                                         categories={item.categories}
                                                         shortDescription={item.shortDescription}
                                                         slug={item.slug}
                                            />
                                        ) : <div/>
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

export
default
Projects;