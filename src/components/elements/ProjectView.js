import React, {Component} from "react";
import {Link} from "react-router-dom";

class ProjectView extends Component {
    constructor() {
        super();
        this.state = {items: []};
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <a href="#" className="thumbnail">
                        <img src="http://i.imgur.com/Sybz8hC.png" alt="..." width="125" height="125"/>
                    </a>
                </div>
                <div className="col-9">
                    <div className="right">
                        <span className="badge badge-primary"><i className="fa fa-file"
                                                                 aria-hidden="true"/></span><br/>
                        <span className="badge badge-primary"><i className="fa fa-cog"
                                                                 aria-hidden="true"/></span><br/>
                        <span className="badge badge-warning"><i className="fa fa-star"
                                                                 aria-hidden="true"/></span><br/>
                    </div>
                    <h3>
                        <a href="/project/test"><div id="modName">Exo
                            <p id="modAuthor">by TheCodedOne</p>
                        </div></a>
                        <p id="modDescription">Exoskeleton | Fully Customizable Armor</p>
                    </h3>
                    <div id="modData"><i className="fa fa-download" aria-hidden="true"/>
                        Downloads: 1,234,567 <i className="fa fa-clock-o"
                                                aria-hidden="true"/> Updated: 1/23/4567
                    </div>
                    <div id="modVersions">Versions: <span className="badge badge-primary">1.2.3</span> <span
                        className="badge badge-primary">4.5.6</span></div>
                    <div id="modCategories">Categories: <span className="badge badge-primary">Tag Here</span></div>
                </div>
            </div>
        );
    }

}
export default ProjectView;