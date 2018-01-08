import React, { Component } from 'react';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import DropzoneComponent from 'react-dropzone-component';
import globals from '../../../../utils/globals';
import toBlock from 'data-uri-to-blob';

import ReactDOMServer from 'react-dom/server';
import userUtils from '../../../../utils/userUtils';
import { Redirect } from 'react-router';

import marked from 'marked';

marked.setOptions({
    sanitize:true,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
})

class ProjectsCreate extends Component {

    constructor() {
        super();
        this.state = {
            error: [],
            value: Plain.deserialize(''),
            markdown:'No description to preview'
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.dropzone = null;
        this.eventHandlers = {
            init: (dropzone) => {
                this.dropzone = dropzone;
            },
            maxfilesexceeded: (file) => {
                this.dropzone.removeAllFiles();
                this.dropzone.addFile(file);
            },
        };
        this.djsConfig = {
            autoProcessQueue: false,
            // dictDefaultMessage:'',
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview">
                    <div className="dz-message"></div>
                    <div className="dz-details">
                        <img data-dz-thumbnail="true"/>
                    </div>
                </div>
            ),
            maxFiles: 1,
        };
        this.componentConfig = {
            postUrl: 'no-url'
        };
    }


    onChange(change) {
        this.setState({ value: change.value });
        let description = Plain.serialize(change.value)
            .trim();
        if (description === '') {
            description = ' No description to preview';
        }
        this.setState({markdown: marked(description)})
    }

    onSubmit() {
        if (this.refs.projectName.value === '') {
            this.setState({ errors: 'A mod name is needed.' });
            return;
        }
        if (this.refs.shortDescription.value === '') {
            this.setState({ errors: 'A short description is needed.' });
            return;
        }
        if (this.state.value === '') {
            this.setState({ errors: 'A description is needed.' });
            return;
        }
        const formData = new FormData();
        formData.append('projectName', this.refs.projectName.value);
        formData.append('shortDescription', this.refs.shortDescription.value);
        formData.append('description', Plain.serialize(this.state.value));
        formData.append('logo', this.dropzone.files[0] ? toBlock(this.dropzone.files[0].dataURL) : '');


        //TODO Make slug more dynamic
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
            return (<Redirect to={'/minecraft/project/' + this.state.redirect + '/'}/>);
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
                        <DropzoneComponent config={this.componentConfig}
                                           eventHandlers={this.eventHandlers}
                                           djsConfig={this.djsConfig}/>
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
                                <div className="form-control">
                                    <Editor
                                        placeholder="Enter some markdown..."
                                        value={this.state.value}
                                        onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="tab-pane" id="preview" role="tabpanel">
                                <div className="form-control" dangerouslySetInnerHTML={{ __html: this.state.markdown }}/>
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
