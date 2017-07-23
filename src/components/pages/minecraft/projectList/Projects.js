import React, {Component} from "react";
import ProjectView from "../../../elements/ProjectView";
import globals from "../../../../globals";
import ReactPaginate from 'react-paginate';

class Projects extends Component {
    constructor() {
        super();
        this.state = {gameData: [], projects: [], projectType: [], error: []};
    }

    getPageData(page) {
        if (page == null)
            page = 1;
        const projectTypeName = this.props.match.params.slug;

        fetch(globals.endPoint + `/games/minecraft/projectTypes/${projectTypeName}/projects?page=` + page)
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
                    console.log('Project error');
                }
            })
    }

    componentDidMount() {
        console.log(this);
        fetch(globals.endPoint + `/games/minecraft`)
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
                } else {
                    console.log('Game error');
                }
            });
        const projectTypeName = this.props.match.params.slug;


        fetch(globals.endPoint + `/games/minecraft/projectTypes/${projectTypeName}`,
        )
            .then(res => {
                return res.json().then(json => ({
                        status: res.status,
                        data: json
                    })
                )
            })
            .then(res => {
                if (res.status === 200)
                    this.setState({projectType: res.data});
                else
                    console.log('Project types error');
            });
        this.getPageData(1);
    }

    handlePageClick(data) {
        let selected = data.selected + 1;
        this.getPageData(selected)
    };

    render() {
        const projectTypeName = this.props.match.params.slug;

        document.title = this.props.match.params.slug.capitalize() + " - Projects - Diluv";
        return (

            <div className="container">
                <div className="row">
                    {
                        //TODO
                        false ?
                            <div className="alert alert-dismissible alert-warning">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <h4>Warning!</h4>
                                <p>An error occured while getting a list of projectTypeName.</p>
                            </div>
                            : ""
                    }
                    <div className="col-md-4">
                        <h1><i className="fa fa-cog" aria-hidden="true"/> {projectTypeName.capitalize()}</h1>
                    </div>
                    <div className="col-md-6"/>
                    <div className="col-md-2">
                        {
                            globals.isUserLoggedIn() ? (
                                <a className="btn btn-info" role="button"
                                   href={"/minecraft/projects/" + projectTypeName + "/create"}>
                                    Create {projectTypeName.capitalize()}
                                </a>
                            ) : ""
                        }

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="panel push-down col-md-12">

                                {/* page numbers nav, leaves 1 unit spare to align dropdowns */}
                                <div className="row">
                                    <div className="col-md-5">
                                        <ReactPaginate
                                            nextClassName={"page-item"}
                                            nextLinkClassName={"page-link"}
                                            previousLabel="&laquo;"

                                            previousClassName={"page-item"}
                                            previousLinkClassName={"page-link"}
                                            nextLabel="&raquo;"

                                            breakLabel={<a href="">...</a>}
                                            breakClassName={"break-me"}
                                            pageCount={this.state.projects.totalPageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageClick.bind(this)}
                                            containerClassName={"pagination pagination-sm"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            activeClassName={"active"}/>
                                    </div>

                                    <div className="col-md-3">
                                        {/*<div className="dropdown">*/}
                                            {/*<button className="btn btn-default dropdown-toggle" type="button"*/}
                                                    {/*id="dropdownMenu1" data-toggle="dropdown"*/}
                                                    {/*aria-haspopup="true" aria-expanded="true">*/}
                                                {/*Sort by:*/}
                                                {/*<span className="caret"/>*/}
                                            {/*</button>*/}
                                            {/*<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">*/}
                                                {/*{*/}
                                                    {/*["Newest", "Top Rated"].map(item =>*/}
                                                        {/*<li key={item}>*/}
                                                            {/*<a className="dropdown-item" href="#">{item}</a>*/}
                                                        {/*</li>*/}
                                                    {/*)*/}
                                                {/*}*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                    </div>

                                    <div className="col-md-3">
                                        {/*<div className="dropdown">*/}
                                            {/*<button className="btn btn-default dropdown-toggle" type="button"*/}
                                                    {/*id="dropdownMenu2" data-toggle="dropdown"*/}
                                                    {/*aria-haspopup="true" aria-expanded="true">*/}
                                                {/*Game version:*/}
                                                {/*<span className="caret"/>*/}
                                            {/*</button>*/}
                                            {/*<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">*/}
                                                {/*{*/}
                                                    {/*this.state.gameData.versions ? this.state.gameData.versions.map(item =>*/}
                                                        {/*<li key={item.version}>*/}
                                                            {/*<a className="dropdown-item" href="#">*/}
                                                                {/*{item.version}*/}
                                                            {/*</a>*/}
                                                        {/*</li>*/}
                                                    {/*) : ""*/}
                                                {/*}*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <hr/>
                                    </div>
                                </div>
                                {
                                    this.state.projects && this.state.projects.data ? this.state.projects.data.map(item =>
                                        <ProjectView key={item.slug}
                                                     name={item.name}
                                                     authors={item.authors}
                                                     description={item.description}
                                                     logo={item.logo}
                                                     totalDownloads={item.totalDownloads}
                                                     createdAt={item.createdAt}
                                                     updatedAt={item.updatedAt}
                                            // gameVersions={item.gameVersions}
                                                     categories={item.categories}
                                                     shortDescription={item.shortDescription}
                                                     slug={item.slug}
                                                     permission={item.permission}
                                        />
                                    ) : ""
                                }
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        {/* project type nav */}
                        <div className="list-group list-group-root">
                            {
                                // console.log(this.state.projectType.categories)
                                this.state.projectType.categories ? this.state.projectType.categories.map(item =>
                                    <a key={item.name} href={item.slug}
                                       className="list-group-item">{item.name}</a>
                                ) : ""
                            }
                        </div>
                        {/* end project type nav */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Projects;