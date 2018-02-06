import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import globals from '../../../../utils/globals';
import Textarea from "react-textarea-autosize";

import userUtils from '../../../../utils/userUtils';
import { Redirect } from 'react-router';

import marked from 'marked';

marked.setOptions({
    sanitize: true,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

class ProjectsCreate extends Component {

    constructor() {
        super();
        this.state = {
            error: [],
            value: '',
            markdown: 'No description to preview',
            imageFiles: null
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(imageFiles) {

        if(this.state.imageFiles)
            window.URL.revokeObjectURL(this.state.imageFiles);
        this.setState({
            imageFiles: imageFiles[0]
        });
    }

    onChange(change) {
        this.setState({ value: change.target.value });
        let description = change.target.value;

        if (description === '') {
            description = ' No description to preview';
        }
        this.setState({ markdown: marked(description) });
    }

    onSubmit() {
        if (!this.refs.projectName.value) {
            this.setState({ errors: 'A mod name is needed.' });
            console.log("Project Name Is missing");
            return;
        }
        if (!this.refs.shortDescription.value) {
            this.setState({ errors: 'A short description is needed.' });
            console.log("Short Description Is missing");
            return;
        }
        if (!this.state.value) {
            this.setState({ errors: 'A description is needed.' });
            console.log("Description is missing");

            return;
        }

        const formData = new FormData();
        formData.append('projectName', this.refs.projectName.value);
        formData.append('shortDescription', this.refs.shortDescription.value);
        formData.append('description', this.state.value);
        formData.append('logo', this.state.imageFiles ? this.state.imageFiles : '');


        fetch(globals.endPoint() + '/games/minecraft/mods/projects',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userUtils.getToken()}`,
                },
                body: formData,
            })
            .then(res => res.json())
            .then((res) => {
                if (res.statusCode === 200) {
                    this.setState({ redirect: res.data.slug });
                    console.log(this.state.redirect);

                }
                console.log(res);
            });
        //TODO CATCH AND FIX
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/minecraft/mods/' + this.state.redirect + '/'}/>);
        }
        if (!userUtils.isUserLoggedIn()) {
            return (<Redirect to={'/'}/>);
        }

        document.title = 'Create Mod - Diluv';
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1><i className="fa fa-cog"/> Create Mod</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <Dropzone
                            onDrop={this.onDrop}
                            className='dropzone'
                            activeClassName='active-dropzone'
                            accept="image/jpeg, image/png"
                            multiple={false}>

                            {this.state.imageFiles ? <div>
                                <div><img width="180" height="180" src={this.state.imageFiles.preview}/></div>
                            </div> : <div>Drag and drop or click to select a logo to upload (Optional).</div>}
                        </Dropzone>


                    </div>
                    <div className="col-md-6">
                        <div className="col-md-auto">
                            Project Name:
                            <input ref="projectName" type="text" className="form-control input-md"
                                   required={true}/>
                        </div>
                        <div className="col-md-auto">
                            Short Description:
                            <textarea ref="shortDescription" className="form-control"
                                      required={true}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        Description:
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#write"
                                   role="tab">Write</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#preview"
                                   role="tab">Preview</a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="write" role="tabpanel">
                                    <Textarea className="form-control"
                                              placeholder="Enter some markdown..."
                                              value={this.state.value}
                                              onChange={this.onChange}
                                              required={true}/>
                            </div>
                            <div className="tab-pane" id="preview" role="tabpanel">
                                <div className="form-control"
                                     dangerouslySetInnerHTML={{ __html: this.state.markdown }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-2">
                        <a className="btn btn-info" role="button" onClick={this.onSubmit}>
                            Create Project
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectsCreate;
