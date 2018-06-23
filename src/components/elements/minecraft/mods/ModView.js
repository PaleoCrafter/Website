import React, { Component } from 'react';
import globals from '../../../../utils/globals';

class ModView extends Component {

    getAuthors(authors) {
        const keys = Object.keys(authors);

        let elements = [];
        for (let i = 0; i < Math.min(keys.length, 3); i++) {
            const author = authors[keys[i]];

            elements.push(
                <a key={author.username} href={`/minecraft/user/${author.username}`}>
                    {i > 0 ? ', ' : null} {author.username}
                </a>
            );
        }
        return (
            <div className="content">
                by {elements}
            </div>
        );
    }

    render() {
        return (
            <div className="box">
            <article className="media">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <img
                            alt="Mod Logo"
                            className="mod-logo"
                            src={`${globals.publicURL()}/projects/${this.props.slug}/logo/${this.props.logo}`}
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <a href={`/minecraft/mods/${this.props.slug}`}>
                            <h3 className="title is-3">{this.props.name}</h3>
                        </a>

                        {
                            this.props.owner ? (
                                    <div className="content">
                                        by <a key={this.props.owner.username}
                                              href={`/minecraft/user/${this.props.owner.username}`}>
                                        {this.props.owner.username}
                                    </a>
                                    </div>
                                )
                                : null
                        }
                        <div className="content">
                            <p>{this.props.shortDescription}</p>
                        </div>
                        <div className="content">
                            <div>
                                <i className="fa fa-download"/> Downloads: {this.props.totalDownloads} | <i
                                className="fa fa-clock"
                            /> Last Updated: {globals.getFormattedDate(this.props.updatedAt, '')}
                            </div>

                            <div>Categories: {
                                this.props.categories.map(item => (
                                    <span style={{ marginRight: `${2}px` }}
                                          key={item.name}
                                          className="tag is-rounded is-info">
                                        {item.name}
                                    </span>))
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="media-right">
                    <p className="field">
                        <a href={`/minecraft/mods/${this.props.slug}/files`}>
                            <span className="icon">
                                <i className="fa fa-file"/>
                            </span>
                        </a>
                    </p>
                    {/* TODO Favourite */}
                    <p className="field">
                        <a>
                            <span className="icon has-text-warning">
                                <i className="far fa-star"/>
                            </span>
                        </a>
                    </p>
                </div>
            </article>
            </div>
        );
    }
}

export default ModView;
