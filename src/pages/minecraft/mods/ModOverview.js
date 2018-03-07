import React, { Component } from 'react';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

import ProjectView from '~/components/elements/minecraft/mods/ModView';

import ReactMarkdown from 'react-markdown';
import renderers from '~/components/markdown-renderer';
import ModNav from '~/components/elements/minecraft/mods/ModNav';

class ModOverview extends Component {

    constructor() {
        super();
        this.state = { projectData: [] };
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods/projects/' + projectSlug)
            .then(res => {
                this.setState({ projectData: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        document.title = this.state.projectData.name + ' - Overview - Diluv';
        const projectSlug = this.props.match.params.slug;
        return (
            <section className="section">
                    <div className="columns">
                        <div className="column is-four-fifths">
                            <article className="media">
                                <figure className="media-left">
                                    <p className="image is-150x150">
                                        <img className="mod-logo"
                                             src={`${globals.cdnURL()}/projects/${this.state.projectData.slug}/logo/${this.state.projectData.logo}`}/>
                                    </p>
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <h3 className="title is-3">{this.state.projectData.name}</h3>
                                        {this.state.projectData.authors ? ProjectView.getOwner(this.state.projectData.authors) : ''}
                                        Total
                                        Downloads: {this.state.projectData.totalDownloads}<br/>
                                        Created: {this.state.projectData.createdAt ? globals.getDate(this.state.projectData.createdAt) : ''}<br/>
                                        Updated: {this.state.projectData.createdAt ? globals.getDate(this.state.projectData.updatedAt) : ''}
                                        {/*<h6>Categories: {this.state.projectData.categories}</h6>*/}
                                    </div>
                                </div>
                                <div className="media-right">
                                    <div className="content">
                                        <div className="field">
                                            <a className="button is-info" href={''}>Download
                                                Latest</a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <div className="section">
                                <ReactMarkdown renderers={renderers}
                                               source={this.state.projectData.description}/>
                            </div>
                            {
                                console.log(this.state.projectData.description)
                            }
                        </div>
                        <div className="column ">
                            <ModNav slug={projectSlug} url="overview"/>
                        </div>
                    </div>
            </section>
        );
    }
}

export default ModOverview;
