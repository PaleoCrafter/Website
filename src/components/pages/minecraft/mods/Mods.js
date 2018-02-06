import React, { Component } from 'react';
import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtils';

import marked from 'marked';
import ProjectView from '../../../elements/mods/ModView';

marked.setOptions({
    sanitize: true,
    highlight: function (code) {
        return require('highlight.js')
            .highlightAuto(code).value;
    }
});

class Mods extends Component {

    constructor() {
        super();
        this.state = { projectData: [] };
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods/projects/' + projectSlug)
            .then(res => {
                if (res.statusCode === 200) {
                    this.setState({ projectData: res.data });
                    console.log(res.data);
                } else {
                    console.log('Game');
                }
            })
            .catch(err => {
                //TODO
            });
    }

    render() {
        document.title = this.state.projectData.name + ' - Overview - Diluv';
        const projectSlug = this.props.match.params.slug;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <a href="#" className="thumbnail">
                            <img className="mod-logo"
                                 src={globals.publicFolder() + this.state.projectData.logo}/>
                        </a>
                    </div>
                    <div className="col-md-8">
                        <h2>{this.state.projectData.name}</h2>
                        <br/>
                        <h6>Authors: {this.state.projectData.authors ? ProjectView.getOwner(this.state.projectData.authors) : ''}</h6>

                        <h6>Total Downloads: {this.state.projectData.totalDownloads}</h6>
                        <h6>Created: {this.state.projectData.createdAt ? globals.getDate(this.state.projectData.createdAt) : ''}</h6>
                        <h6>Updated: {this.state.projectData.createdAt ? globals.getDate(this.state.projectData.updatedAt) : ''}</h6>
                        {/*<h6>Categories: {this.state.projectData.categories}</h6>*/}

                        {/*TODO Options*/}
                    </div>
                    <div className="col-md-2">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active"
                                   href={'/minecraft/' + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href={'/minecraft/mods/' + projectSlug + '/files'}>Files</a>
                            </li>
                            {
                                (this.state.projectData.permission && globals.hasProjectPermission(this.state.projectData.permission, globals.PROJECT_PERMISSION.EDIT_SETTINGS)) ? (
                                    <li className="nav-item">
                                        <a className="nav-link"
                                           href={'/minecraft/mods/' + projectSlug + '/settings'}>Settings</a>
                                    </li>) : ''
                            }
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10">
                        <p dangerouslySetInnerHTML={{ __html: this.state.projectData.description ? marked(this.state.projectData.description) : '' }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mods;
