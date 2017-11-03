import React, {Component} from "react";
import DropzoneComponent from 'react-dropzone-component';

const djsConfig = {
    autoProcessQueue: false,
    acceptedFiles: "image/jpeg,image/png,image/gif",
};
const eventHandlers = {
    addedfile: (file) => console.log(file)
};

const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'no-url'
};


class ProjectsCreate extends Component {

    constructor() {
        super();
        this.state = {gameData: [], projects: [], projectType: [], error: []};
    }

    render() {
        const projectTypeName = this.props.match.params.slug;
        document.title = projectTypeName.capitalize() + " - Create - Diluv";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1><i className="fa fa-cog"/> Create Project</h1>
                    </div>
                    <div className="col-md-6"/>

                </div>

                <div className="row">
                    <div className="col-md-2">
                        {
                            <DropzoneComponent config={componentConfig}
                                               eventHandlers={eventHandlers}
                                               djsConfig={djsConfig}/>
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="col-md-8">
                            <input id="textName" name="textName" type="text" placeholder="Project Name"
                                   className="form-control input-md" required=""/>
                        </div>
                        <div className="col-md-10">
                            <textarea className="form-control" id="textShortDescription" name="textShortDescription"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        Description:
                        <select id="selectbasic" name="selectbasic">
                            <option value="html">HTML</option>
                            <option value="markdown">Markdown</option>
                        </select>
                        <textarea className="form-control" id="textDescription" name="textDescription"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsCreate;