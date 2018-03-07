import React, { Component } from 'react';
import globals from '~/utils/globals';

class ModView extends Component {
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


    render() {
        return (
            <article className="media">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <img className="mod-logo"
                             src={`${globals.publicFolder()}/projects/${this.props.slug}/logo/${this.props.logo}`}/>
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <a href={'/minecraft/mods/' + this.props.slug}>
                            <h3 className="title is-3">{this.props.name}</h3>
                        </a>

                        {
                            ModView.getOwner(this.props.authors)
                        }

                        <div className="content">
                            <p id="modDescription">{this.props.shortDescription}</p>
                        </div>
                        <div className="content">
                            <div id="modData">
                                <i className="fa fa-download"/> Downloads: {this.props.totalDownloads} | <i
                                className="fa fa-clock"/> Updated: {globals.getDate(this.props.updatedAt)}
                            </div>

                            <div id="modCategories">Categories: {
                                this.props.categories.map(function (item) {
                                    return <span style={{ marginRight: 2 + 'px' }}
                                                 key={item.name}
                                                 className="badge badge-primary">{item.name}</span>;
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="media-right">
                    <p className="field">
                        <a href={'/minecraft/mods/' + this.props.slug + '/files'}>
                                <span className="icon">
                                    <i className="fa fa-file"/>
                                </span>
                        </a>
                    </p>
                    {/*TODO Favourite*/}
                    <p className="field">
                        <a>
                            <span className="icon has-text-warning">
                                <i className="fas fa-star"></i>
                            </span>
                        </a>
                    </p>
                </div>
            </article>
        );
    }
}

export default ModView;
