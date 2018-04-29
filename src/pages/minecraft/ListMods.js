import React, { Component } from 'react';
import ReactPaginate from 'react-paginate'
import globals from '../../utils/globals';
import userUtils from '../../utils/userUtils';
import requestUtils from '../../utils/requestUtils';
import ModView from '../../components/elements/minecraft/mods/ModView';

class ListMods extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            projectType: [],
            error: [],
            loggedIn: false,
        };
    }

    componentDidMount() {
        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods`))
            .then((res) => {
                this.setState({ projectType: res.data });
            })
            .catch((err) => {
                console.log(err);
            });

        userUtils.isUserLoggedIn()
            .then(() => {
                this.setState({ loggedIn: true });
            })
            .catch(() => {
                this.setState({ loggedIn: false });
            });
        this.getPageData(1);
    }

    getPageData(page) {
        if (page == null) {
            page = 1;
        }

        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/projects?page=${page}`))
            .then((res) => {
                this.setState({ projects: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    handlePageClick(data) {
        console.log(data.selected + 1);
        this.getPageData(data.selected + 1);
    }

    render() {
        document.title = 'Mods - Projects - Diluv';
        return (
            <div className="container">
                <div className="columns ">
                    <div className="column is-four-fifths">
                        <h2 className="title is-2"><i className="fa fa-cog"/> Mods</h2>
                        <nav className="pagination">
                            <ReactPaginate
                                previousLabel="&laquo;"
                                nextLabel="&raquo;"
                                pageCount={this.state.projects.totalPageCount ? this.state.projects.totalPageCount : 1}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick.bind(this)}
                                pageLinkClassName="pagination-link"
                                containerClassName="pagination-list"
                                breakClassName="pagination-ellipsis"
                                previousLinkClassName="pagination-previous"
                                nextLinkClassName="pagination-next"
                                disabledClassName="is-disabled"
                                activeLinkClassName="is-current"
                            />
                        </nav>
                        <br/>
                        {
                            this.state.projects && this.state.projects.length > 0 && this.state.projects.map(item =>
                                (
                                    <ModView
                                        key={item.slug}
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
                                    />)
                            )
                        }
                    </div>

                    <div className="column">
                        {
                            this.state.loggedIn &&
                            (
                                <p className="field ">
                                    <a className="button is-large is-link"
                                       role="button"
                                       href="/minecraft/mods/create">
                                        Create Mod
                                    </a>
                                </p>
                            )
                        }
                        <br/>
                        {/*<h4 className="title is-4">Categories</h4>*/}
                        {/*{*/}
                        {/*this.state.projectType.categories && this.state.projectType.categories.length > 0 && this.state.projectType.categories.map(item =>*/}
                        {/*(<p key={item.name} className="field ">*/}
                        {/*<a className="button">*/}
                        {/*{item.name}*/}
                        {/*</a>*/}
                        {/*</p>))*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListMods;
