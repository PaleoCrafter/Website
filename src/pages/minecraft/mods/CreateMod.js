import React, { Component } from 'react';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import Textarea from 'react-textarea-autosize';

import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

import userUtils from '~/utils/userUtils';
import { Redirect } from 'react-router';


class CreateMod extends Component {

    constructor() {
        super();
        this.state = {
            error: [],
            description: '',
            markdown: 'No description to preview',
            imageFiles: null,
            categories: [],
            options: []
        };


        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    componentDidMount() {
        requestUtils.getFetchJSON(`${globals.endPoint()}/games/minecraft/mods/categories/`)
            .then(res => {
                let o = [];
                res.data.map(function (item) {
                    o.push({
                        label: item.name,
                        value: item.slug
                    });
                });
                this.setState({ options: o });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onDrop(imageFiles) {
        if (this.state.imageFiles) {
            window.URL.revokeObjectURL(this.state.imageFiles);
        }

        this.setState({
            imageFiles: imageFiles[0]
        });
    }

    handleChange(categories) {
        console.log('You\'ve selected:', categories);
        this.setState({ categories });
    }

    onDescriptionChange(change) {
        this.setState({ description: change.target.value });
        let description = change.target.value;

        if (description === '') {
            description = ' No description to preview';
        }
        this.setState({ markdown: globals.parseMarkdown(description) });
    }

    onSubmit() {
        if (!this.refs.projectName.value) {
            this.setState({ errors: 'A mod name is needed.' });
            console.log('Project Name Is missing');
            return;
        }
        if (!this.refs.shortDescription.value) {
            this.setState({ errors: 'A short description is needed.' });
            console.log('Short Description Is missing');
            return;
        }
        if (!this.state.description) {
            this.setState({ errors: 'A description is needed.' });
            console.log('Description is missing');

            return;
        }

        const formData = new FormData();
        formData.append('projectName', this.refs.projectName.value);
        formData.append('shortDescription', this.refs.shortDescription.value);
        formData.append('description', this.state.description);
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

                            {this.state.imageFiles ?
                                <img className="cm-logo" width="100%" height="100%"
                                     src={this.state.imageFiles.preview}/>
                                : <div>Drag and drop or click to select a logo to upload
                                    (Optional).</div>}
                        </Dropzone>


                    </div>
                    <div className="col-md-6">
                        <div className="col-md-auto">
                            <h5>Project Name:</h5>
                            <input ref="projectName" type="text" placeholder="Project Name"
                                   className="form-control input-md"
                                   required={true}/>
                        </div>
                        <br/>
                        <div className="col-md-auto">
                            <h5>Short Description:</h5>
                            <textarea ref="shortDescription" placeholder="Short Description"
                                      className="form-control"
                                      required={true}/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-5">
                        <h5>Categories:</h5>
                        <Select
                            closeOnSelect={true}
                            multi
                            onChange={this.handleChange}
                            options={this.state.options}
                            placeholder="Select Categories"
                            simpleValue
                            value={this.state.categories}
                        />
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-10">
                        <h5>Description:</h5>
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
                                              onChange={this.onDescriptionChange}
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

export default CreateMod;
