import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Select from 'react-select';
import Dropzone from 'react-dropzone';
import ReactMarkdown from 'react-markdown';
import Textarea from 'react-textarea-autosize';

import globals from '../../../../utils/globals';
import userUtils from '../../../../utils/userUtilities';
import requestUtils from '../../../../utils/requestUtilities';
import renderers from '../../../elements/highlight/markdown-renderer';

class CreateMod extends Component {
    constructor() {
        super();
        this.state = {
            tab: 1,
            error: "",
            description: '',
            imageFiles: null,
            categories: [],
            options: [],
            loggedIn: true,
        };

        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    componentDidMount() {
        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/categories/`))
            .then((res) => {
                const o = [];
                res.data.map((item) => {
                    o.push({
                        label: item.name,
                        value: item.slug,
                    });
                    //TODO LOOK INTO
                    return null;
                });
                this.setState({ options: o });
            })
            .catch((err) => {
                console.log(err);
            });

        userUtils.isUserLoggedIn()
            .then(() => {
                this.setState({ loggedIn: true });
            })
            .catch(() => {
                this.setState({ loggedIn: false });
            });
    }

    onDrop(imageFiles) {
        if (this.state.imageFiles) {
            window.URL.revokeObjectURL(this.state.imageFiles);
        }

        this.setState({
            imageFiles: imageFiles[0],
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
        this.setState({ tab });
    }

    onSubmit() {
        if (!this.refs.projectName.value) {
            this.setState({ error: 'A mod name is needed.' });
            console.log('Project Name Is missing');
            return;
        }
        if (!this.refs.shortDescription.value) {
            this.setState({ error: 'A short description is needed.' });
            console.log('Short Description Is missing');
            return;
        }
        if (!this.state.description) {
            this.setState({ error: 'A description is needed.' });
            console.log('Description is missing');

            return;
        }
        if (!this.state.categories) {
            this.setState({ error: 'Categories is needed.' });
            console.log('Categories is missing');

            return;
        }

        const formData = new FormData();
        formData.append('projectName', this.refs.projectName.value);
        formData.append('shortDescription', this.refs.shortDescription.value);
        formData.append('description', this.state.description);
        formData.append('logo', this.state.imageFiles);
        formData.append('categories', this.state.categories);

        requestUtils.fetchPost(new URL(`${globals.endPoint()}/games/minecraft/mods/projects`), formData)
            .then((res) => {

                this.setState({ redirect: res.data.slug });
                console.log(this.state.redirect);
            }).catch((res) => {
                this.setState({ error: res.message });
            });

    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={`/minecraft/mods/${this.state.redirect}/`} />);
        }
        if (!this.state.loggedIn) {
            this.props.history.go(-1);
        }

        document.title = 'Create Mod - Diluv';
        return (
            <div className="container">
                <h2 className="title is-2"><i className="fa fa-cog" /> Create Mods</h2>
                {this.state.error ? (
                    <div className="column is-one-fifths">
                        <div className="notification is-danger">
                            {this.state.error}
                        </div>
                    </div>) : null}
                <div className="columns">
                    <div className="column is-one-fifth">
                        <Dropzone
                            onDrop={this.onDrop}
                            className="dropzone"
                            activeClassName="active-dropzone"
                            accept="image/jpeg, image/png"
                            multiple={false}
                        >

                            <div className="card">
                                <div className="card-content">
                                    {this.state.imageFiles ? (
                                        <figure className="image">
                                            <img alt="Mod Logo" src={this.state.imageFiles.preview} />
                                        </figure>
                                    )
                                        : <figure className="image">
                                            <img alt="Mod Logo" src="https://bulma.io/images/placeholders/empty.png" />
                                        </figure>
                                    }
                                </div>


                                <div className="card-footer">
                                    {this.state.imageFiles ? (
                                        <p className="card-footer-item">
                                            {this.state.imageFiles.name}
                                        </p>
                                    )
                                        : <p className="card-footer-item">
                                            Click or drag an image to upload project logo (Optional).</p>}
                                </div>
                            </div>
                        </Dropzone>
                    </div>

                    <div className="column is-two-fifths">

                        <strong>Project Name:</strong>
                        <br />
                        <input
                            ref="projectName"
                            type="text"
                            placeholder="Project Name"
                            className="input"
                            required
                        />
                        <br />
                        <br />
                        <strong>Short Description:</strong>
                        <br />
                        <textarea
                            ref="shortDescription"
                            placeholder="Short Description"
                            className="textarea"
                            required
                        />
                    </div>
                </div>

                <br />
                <div className="column is-two-fifths">
                    <h5>Categories:</h5>
                    <Select
                        closeOnSelect
                        multi
                        onChange={this.onCategoryChange}
                        options={this.state.options}
                        placeholder="Select Categories"
                        simpleValue
                        value={this.state.categories}
                    />
                </div>
                <br />


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
                                <Textarea
                                    className="textarea"
                                    placeholder="Enter some markdown..."
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange}
                                    required
                                />
                            ) :
                                (
                                    <ReactMarkdown
                                        renderers={renderers}
                                        source={this.state.description ? this.state.description : 'No description to preview'}
                                    />
                                )
                        }
                    </div>
                    <br />
                    <a className="button" onClick={this.onSubmit}>
                        Create Project
                    </a>
                </div>
            </div>
        );
    }
}

export default CreateMod;
