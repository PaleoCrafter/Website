import React, { Component } from 'react';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import Textarea from 'react-textarea-autosize';

import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

import userUtils from '~/utils/userUtils';
import { Redirect } from 'react-router';
import ReactMarkdown from 'react-markdown';
import renderers from '~/components/markdown-renderer';

class CreateMod extends Component {

    constructor() {
        super();
        this.state = {
            tab: 1,
            error: [],
            description: '',
            markdown: 'No description to preview',
            imageFiles: null,
            categories: [],
            options: []
        };


        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
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

    onCategoryChange(categories) {
        console.log('You\'ve selected:', categories);
        this.setState({ categories });
    }

    onDescriptionChange(change) {
        this.setState({ description: change.target.value });
    }

    onChangeTab(tab) {
        this.setState({ tab: tab });
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
        if (!this.state.categories) {
            this.setState({ errors: 'Categories is needed.' });
            console.log('Categories is missing');

            return;
        }

        const formData = new FormData();
        formData.append('projectName', this.refs.projectName.value);
        formData.append('shortDescription', this.refs.shortDescription.value);
        formData.append('description', this.state.description);
        formData.append('logo', this.state.imageFiles ? this.state.imageFiles : '');
        formData.append('categories', this.state.categories);


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
                this.setState({ redirect: res.data.slug });
                console.log(this.state.redirect);
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
                <h2 className="title is-2"><i className="fa fa-cog"/> Create Mods</h2>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <Dropzone
                            onDrop={this.onDrop}
                            className='dropzone'
                            activeClassName='active-dropzone'
                            accept="image/jpeg, image/png"
                            multiple={false}>

                            {this.state.imageFiles ? (
                                    <p className="image is-150x150">
                                        <img className="mod-logo" src={this.state.imageFiles.preview}/>
                                    </p>
                                )
                                : <div>Drag and drop or click to select a logo to upload
                                    (Optional).</div>}
                        </Dropzone>
                    </div>
                    <div className="column is-two-fifths">
                        <strong>Project Name:</strong>
                        <br/>
                        <input ref="projectName" type="text" placeholder="Project Name"
                               className="input"
                               required={true}/>
                        <br/>
                        <br/>
                        <strong>Short Description:</strong>
                        <br/>
                        <textarea ref="shortDescription" placeholder="Short Description"
                                  className="textarea"
                                  required={true}/>
                    </div>
                </div>

                <br/>
                <div className="column is-two-fifths">
                    <h5>Categories:</h5>
                    <Select
                        closeOnSelect={true}
                        multi
                        onChange={this.onCategoryChange}
                        options={this.state.options}
                        placeholder="Select Categories"
                        simpleValue
                        value={this.state.categories}
                    />
                </div>
                <br/>


                <div className="column is-two-fifths">
                    <h5>Description:</h5>
                    <div className="tabs">
                        <ul>
                            <li className="is-active" onClick={() => this.onChangeTab(1)}>
                                <a>Write</a>
                            </li>
                            <li onClick={() => this.onChangeTab(2)}>
                                <a>Preview</a>
                            </li>
                        </ul>
                    </div>
                    <div className="container">
                        {
                            this.state.tab === 1 ? (
                                    <Textarea className="textarea"
                                              placeholder="Enter some markdown..."
                                              value={this.state.description}
                                              onChange={this.onDescriptionChange}
                                              required={true}/>
                                ) :
                                (
                                    <ReactMarkdown renderers={renderers}
                                                   source={this.state.description ? this.state.description : 'No description to preview'}/>
                                )
                        }
                    </div>
                    <br/>
                    <a className="button" onClick={this.onSubmit}>
                        Create Project
                    </a>
                </div>
            </div>
        );
    }
}

export default CreateMod;
