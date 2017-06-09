import React, {Component} from "react";

class ProjectView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <a href="#" className="thumbnail">
                        <img src={this.props.logo} width="125" height="125"/>
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
                        <a href="/minecraft/project/test">
                            <div id="modName">{this.props.name}</div>
                        </a>
                        <p id="modAuthor">by TheCodedOne</p>

                        <p id="modDescription">Exoskeleton | Fully Customizable Armor</p>
                    </h3>
                    <div id="modData">
                        <i className="fa fa-download" aria-hidden="true"/> Downloads: {this.props.totalDownloads} | <i className="fa fa-clock-o" aria-hidden="true"/> Updated: 1/23/4567
                    </div>
                    <div id="modVersions">Game Versions: {
                        this.props.versions.map(function (item, i) {
                            return <span key={item.id} className="badge badge-primary">{item.id}</span>
                        })
                    }
                    </div>
                    <div id="modCategories">Categories: {
                        this.props.categories.map(function (item) {
                            return <span key={item.name} className="badge badge-primary">{item.name}</span>
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }

}
export default ProjectView;