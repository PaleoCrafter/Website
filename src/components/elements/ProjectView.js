import React, { Component } from 'react';
import globals from '../../utils/globals';

import dateFormat from 'dateformat';

class ProjectView extends Component {
    constructor(props) {
        super(props);
    }

    static getOwner(authors) {
        const keys = Object.keys(authors);

        let i = 0,
            length = keys.length;
        for (; i < length; i++) {
            const author = authors[keys[i]];

            if (author.role === 'Owner') {
                return (
                    <a href={'/minecraft/user/' + author.username}>
                        <p id="modAuthor">by {author.username}</p>
                    </a>);
            }
        }
    }

    static getDate(epoch) {
        return dateFormat(new Date(epoch), 'hh:mm:ss dd/mm/yyyy');
    }

    render() {
        return (
            <div className="row mod-view">
                <div className="col-3">
                    <a href="#" className="thumbnail">
                        <img src={this.props.logo} width="150" height="150"/>
                    </a>
                </div>
                <div className="col-9">
                    <div className="right">
                        <a className="project-badge"
                           href={'/minecraft/project/' + this.props.slug + '/files'}>
                            <span className="badge badge-primary">
                                <i className="fa fa-file"/>
                            </span>
                        </a>

                        {
                            (this.props.permission && globals.hasProjectPermission(this.props.permission, globals.PROJECT_PERMISSION.EDIT_SETTINGS)) ? (
                                <a className="project-badge"
                                   href={'/minecraft/project/' + this.props.slug + '/settings'}>
                                    <span className="badge badge-primary">
                                        <i className="fa fa-cog"/>
                                    </span>
                                </a>
                            ) : ''
                        }
                        <a className="project-badge">
                            <span className="badge badge-warning">
                                <i className="fa fa-star"/>
                            </span>
                        </a>
                    </div>
                    <h3>
                        <a href={'/minecraft/project/' + this.props.slug}>
                            <div id="modName">{this.props.name}</div>
                        </a>

                        {ProjectView.getOwner(this.props.authors)}

                        <p id="modDescription">{this.props.shortDescription}</p>
                    </h3>
                    <div id="modData">
                        <i className="fa fa-download"/> Downloads: {this.props.totalDownloads} | <i
                        className="fa fa-clock"/> Updated: {ProjectView.getDate(this.props.updatedAt)}
                    </div>
                    {/*<div id="modVersions">Game Versions: {*/}
                    {/*this.props.versions.map(function (item, i) {*/}
                    {/*return <span style={{marginRight: 2 +'px'}} key={item.version} className="badge badge-primary">{item.version}</span>*/}
                    {/*})*/}
                    {/*}*/}
                    {/*</div>*/}
                    <div id="modCategories">Categories: {
                        this.props.categories.map(function (item) {
                            return <span style={{ marginRight: 2 + 'px' }} key={item.name}
                                         className="badge badge-primary">{item.name}</span>;
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }

}

export default ProjectView;
