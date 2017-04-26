import React, {Component} from "react";

class Project extends Component {
    render() {
        return (
            document.title = "Overview - "+this.props.match.params[0].capitalize() + " - Project Alt",
                <div>
                    {this.props.match.params[0].capitalize()}
                    <div className="container">
    
                        {/* header */}
                        <div className="row">
                            <div className="col-md-10">
                                <h2>Mod Name</h2> 
                            </div>
                            <div className="col-md-2">
                                <ul className="nav"><li>
                                    <a href="#">Download</a>
                                </li></ul>
                            </div>
                        </div>
        
                        <div className="row">           
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr />
                                    </div>
                                </div>
                        
                                {/* sample styling for mod entries */}
                                <div className="row">
                                    <div id="mod-nav" className="col-md-12">
                                        <ul className="nav nav-tabs">
                                            <li className="active"><a href="#">Overview</a></li>
                                            <li><a href="#">Downloads</a></li>
                                            <li><a href="#">Wiki</a></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* grouped */}
                                        <div className="col-md-2">
                                            <a href="#" className="thumbnail push-down">
                                                <img src="tesla.png" alt="..."/>
                                            </a>
                                        </div>
                                        <div className="col-md-10">
                                            <h3><div id="modID">Mod by Modder</div></h3>
                                                    
                                            <div id="modDate">Updated: 4/23/2017</div>
                                            <div id="modVersions">Versions: 1.6.4, 1.7.10</div>
                                        </div>
                                        {/* end grouped */}
                                    </div>
                                </div>
                
                                <div className="row">
                                    <div className="col-md-12">
                                        <hr />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-12">
                                        <div id="modDesc">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur, libero scelerisque laoreet tristique, metus purus finibus magna, ut sagittis velit augue tincidunt arcu. Aenean condimentum dolor vestibulum nulla dictum, eget varius lectus laoreet. Integer a dolor ac quam laoreet tempus vitae vel arcu. Maecenas condimentum dolor a elit bibendum porttitor. Sed ut arcu sed mauris mollis lacinia. Proin commodo vulputate orci fermentum mattis. Aenean ut posuere lacus. Vivamus magna ligula, malesuada id libero eu, commodo tempus arcu. Etiam gravida odio et justo tempus, a maximus nisi facilisis.

                                            Donec quis urna convallis, ultricies lorem sed, porttitor mauris. Nam sed felis eu orci luctus luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eleifend nec elit eget accumsan. Phasellus scelerisque enim vel ipsum scelerisque, vitae gravida mauris bibendum. Morbi elit est, venenatis ut justo eu, rutrum ullamcorper lorem. Integer neque lacus, suscipit vitae est id, convallis efficitur leo. In bibendum vehicula condimentum. Donec blandit maximus odio, non lobortis lorem venenatis id.

                                            Praesent sit amet eros diam. Maecenas lobortis quis libero vel consequat. Duis interdum dui neque, quis congue justo congue et. Mauris dictum sit amet nibh quis sollicitudin. Integer velit risus, mollis ac lectus blandit, consectetur congue metus. Nunc rhoncus sapien vel lacus accumsan pulvinar. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam sagittis hendrerit metus nec iaculis. Ut efficitur neque non nisi consectetur, vitae consequat lectus vehicula. Vivamus congue augue dolor, at aliquam ipsum laoreet sit amet. Mauris sodales eros eget justo laoreet, non ullamcorper eros facilisis. Vivamus diam mauris, ultricies vitae vulputate in, varius eget velit. Aliquam lorem neque, tristique eget tortor in, varius consectetur felis.

                                            Maecenas faucibus arcu ut tortor semper, in faucibus lectus posuere. Cras congue, enim non ullamcorper consequat, felis magna condimentum velit, sed ullamcorper turpis lorem a erat. Maecenas auctor odio mauris, sed rutrum justo auctor ut. Sed cursus purus vel viverra pretium. Integer justo metus, gravida vel pulvinar nec, feugiat nec ante. Fusce ut sem eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed aliquam tortor id velit molestie, sed vestibulum magna commodo.

                                            Nulla rutrum, leo et faucibus porttitor, lorem nisl pretium nunc, id finibus augue arcu eget ante. Aliquam scelerisque malesuada odio eu interdum. Sed quis ipsum enim. Donec faucibus lectus enim, quis euismod justo tristique vitae. Vivamus at sodales tortor. Aliquam vitae fringilla nulla, at feugiat sem. In sed aliquam arcu. Curabitur sagittis suscipit sodales. In pharetra efficitur velit in vehicula. Curabitur eget tortor libero. Maecenas luctus at diam at malesuada. Donec suscipit velit sit amet placerat iaculis. Nullam ac purus sed purus facilisis euismod et sed libero. Suspendisse tempus laoreet arcu, eget tempor nisl convallis vel.
                                        </div>
                                    </div>
                                </div>
                
                            </div>
                        </div>
                    </div>

                </div>
        )
    }
}

export default Project;