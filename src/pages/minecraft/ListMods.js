import React, { Component } from 'react';
import ModView from '~/components/elements/minecraft/mods/ModView';
import globals from '~/utils/globals';
import ReactPaginate from 'react-paginate';
import requestUtils from '~/utils/requestUtils';
import userUtils from '~/utils/userUtils';

class ListMods extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            projectType: [],
            error: []
        };
    }

    getPageData(page) {
        if (page == null) {
            page = 1;
        }

        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods/projects?page=' + page)
            .then(res => {
                this.setState({ projects: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods')
            .then(res => {
                this.setState({ projectType: res.data });
            })
            .catch(err => {
                console.log(err);
            });

        this.getPageData(1);
    }

    handlePageClick(data) {
        console.log(data.selected + 1);
        this.getPageData(data.selected + 1);
    };

    render() {
        // if (!this.state.projectType)
        //     return (<E404/>);

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
                                pageLinkClassName={'pagination-link'}
                                containerClassName={'pagination-list'}
                                breakClassName={'pagination-ellipsis'}
                                previousLinkClassName={'pagination-previous'}
                                nextLinkClassName={'pagination-next'}
                                disabledClassName={'is-disabled'}
                                activeLinkClassName={'is-current'}
                            />
                        </nav>
                        <br/>
                        {
                            this.state.projects && this.state.projects.length > 0 ? this.state.projects.map(item =>
                                <ModView key={item.slug}
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
                            ) : ''
                        }
                    </div>

                    {/*TODO Fix*/}
                    <div className="column">
                        {
                            userUtils.isUserLoggedIn() ? (
                                <p className="field ">
                                    <a className="button is-large is-link" role="button"
                                       href={'/minecraft/mods/create'}>
                                        Create Mod
                                    </a>
                                </p>
                            ) : ''
                        }
                        <br/>
                        <h4 className="title is-4">Categories</h4>
                        {
                            // console.log(this.state.projectType.categories)
                            this.state.projectType.categories && this.state.projectType.categories.length > 0 ? this.state.projectType.categories.map(item =>
                                <p className="field ">
                                    <a key={item.name} className="button">
                                        {item.name}
                                    </a>
                                </p>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ListMods;
