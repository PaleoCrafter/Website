import React, {Component} from "react";
class ProjectView extends Component {
    constructor(props) {
        super(props);
    }

    static getOwner(authors) {
        var keys = Object.keys(authors);

        let i = 0, length = keys.length;
        for (; i < length; i++) {
            const author = authors[keys[i]];

            if (author.role === "Owner") {
                return (
                    <a href={"/minecraft/user/" + author.username}>
                        <p id="modAuthor">by {author.username}</p>
                    </a>)
            }
        }
    }

    static getDate(epoch) {
        var d = new Date(epoch); // The 0 there is the key, which sets the date to the epoch
        return d.toString()
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <a href="#" className="thumbnail">
                        <img src={this.props.logo} width="150" height="150"/>
                    </a>
                </div>
                <div className="col-9">
                    <div className="right">
                        <span className="badge badge-primary">
                            <i className="fa fa-file" aria-hidden="true"/>
                        </span><br/>
                        <span className="badge badge-primary">
                            <i className="fa fa-cog" aria-hidden="true"/>
                        </span><br/>
                        <span className="badge badge-warning">
                            <i className="fa fa-star" aria-hidden="true"/>
                        </span><br/>
                    </div>
                    <h3>
                        <a href={"/minecraft/project/" + this.props.slug}>
                            <div id="modName">{this.props.name}</div>
                        </a>

                        {ProjectView.getOwner(this.props.authors)}

                        <p id="modDescription">{this.props.shortDescription}</p>
                    </h3>
                    <div id="modData">
                        <i className="fa fa-download" aria-hidden="true"/> Downloads: {this.props.totalDownloads} | <i
                        className="fa fa-clock-o" aria-hidden="true"/> Updated: {ProjectView.getDate(this.props.updatedAt)}
                    </div>
                    <div id="modVersions">Game Versions: {
                        this.props.versions.map(function (item, i) {
                            return <span style={{marginRight: 2 +'px'}} key={item.version} className="badge badge-primary">{item.version}</span>
                        })
                    }
                    </div>
                    <div id="modCategories">Categories: {
                        this.props.categories.map(function (item) {
                            return <span style={{marginRight: 2 +'px'}} key={item.name} className="badge badge-primary">{item.name}</span>
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }

}
export default ProjectView;