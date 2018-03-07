import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

import Select from 'react-select';
import Dropzone from 'react-dropzone';
import Textarea from 'react-textarea-autosize';
import userUtils from '~/utils/userUtils';

import ReactMarkdown from 'react-markdown';
import renderers from '~/components/markdown-renderer';
import ModNav from '~/components/elements/minecraft/mods/ModNav';

class ModSettings extends Component {

    constructor() {
        super();
        this.state = {
            tab: 1,

            slug: '',
            permission: 0,
            logoFile: [],
            logoPreview: '',

            defaultProjectName: '',
            defaultShortDescription: '',
            defaultCategories: '',
            defaultDescription: '',

            description: '',
            categories: [],
            selectableCategories: [],
        };

        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/mods/projects/' + projectSlug)
            .then(res => {

                this.setState({
                    slug: res.data.slug,
                    permission: res.data.permission,

                    defaultProjectName: res.data.name,
                    defaultDescription: res.data.description,
                    defaultShortDescription: res.data.shortDescription,
                    defaultLogoPreview: `${globals.cdnURL()}/projects/${res.data.slug}/logo/${res.data.logo}`,

                    description: res.data.description,
                    logoPreview: `${globals.cdnURL()}/projects/${res.data.slug}/logo/${res.data.logo}`,
                });


                let categories = '';
                res.data.categories.map(function (item) {
                    if (categories) {
                        categories += ',';
                    }
                    categories += item.slug;
                });
                this.setState({
                    defaultCategories: categories,
                    categories: categories
                });


            })
            .catch(err => {
                console.log(err);
            });

        requestUtils.getFetchJSON(`${globals.endPoint()}/games/minecraft/mods/categories/`)
            .then(res => {
                let o = [];
                res.data.map(function (item) {
                    o.push({
                        label: item.name,
                        value: item.slug
                    });
                });
                this.setState({ selectableCategories: o });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onSubmit() {
        if (!this.refs.projectName.value) {
            this.setState({ errors: 'A mod name is needed.' });
            console.log('Project Name is missing');
            return;
        }
        if (!this.refs.shortDescription.value) {
            this.setState({ errors: 'A short description is needed.' });
            console.log('Short Description is missing');
            return;
        }
        if (!this.state.description) {
            this.setState({ errors: 'A description is needed.' });
            console.log('Description is missing');
            return;
        }

        if (!this.state.categories) {
            this.setState({ errors: 'A category is needed.' });
            console.log('Category is missing');
            return;
        }

        const url = new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${this.state.slug}`);

        let params = new Map();
        if (this.state.defaultProjectName !== this.refs.projectName.value) {
            params.set('projectName', this.refs.projectName.value);
        }

        if (this.state.defaultShortDescription !== this.refs.shortDescription.value) {
            params.set('shortDescription', this.refs.shortDescription.value);
        }

        if (this.state.defaultDescription !== this.state.description) {
            params.set('description', this.state.description);
        }

        if (this.state.defaultLogoPreview !== this.state.logoPreview) {
            params.set('logo', this.state.logoFile);
        }

        if (this.state.defaultCategories !== this.state.categories) {
            params.set('categories', this.state.categories.split(','));
        }

        console.log(params.size);
        if (params.size === 0) {
            console.log('No data has been changed');
            return;
        }

        params.forEach((value, key) => url.searchParams.append(key, value));

        fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userUtils.getToken()}`,
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({ redirect: res.data.slug });
            })
            .catch(err => {
                console.log(err);
            });
        //TODO CATCH AND FIX
    }

    /**
     * Handles the change of logo
     * @param imageFiles
     */
    onDrop(imageFiles) {
        if (this.state.logoFile) {
            window.URL.revokeObjectURL(this.state.logoFile);
        }
        this.setState({
            logoFile: imageFiles[0],
            logoPreview: imageFiles[0].preview
        });
    }

    onDescriptionChange(change) {
        this.setState({ description: change.target.value });
    }

    onCategoryChange(categories) {
        this.setState({ categories });
    }

    onChangeTab(tab) {
        this.setState({ tab: tab });
    }

    render() {
        //TODO Check permission and redirect away if none
        const projectSlug = this.props.match.params.slug;

        document.title = this.state.defaultProjectName + ' - Settings - Diluv';

        if (this.state.redirect) {
            return (<Redirect to={'/minecraft/mods/' + this.state.redirect + '/'}/>);
        }
        if (this.state.permission && !globals.hasProjectPermission(this.state.permission, globals.PROJECT_PERMISSION.EDIT_SETTINGS)) {
            return (<Redirect to={'/minecraft/mods/' + projectSlug}/>);
        }

        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-four-fifths">
                            <h2 className="title is-2"><i
                                className="fa fa-cog"/> {this.state.defaultProjectName} Settings
                            </h2>
                            <div className="columns">
                                <div className="column is-one-fifth">
                                    <Dropzone
                                        onDrop={this.onDrop}
                                        className='dropzone'
                                        activeClassName='active-dropzone'
                                        accept="image/jpeg, image/png"
                                        multiple={false}>

                                        {this.state.logoPreview ?
                                            <p className="image is-150x150">
                                                <img className="mod-logo" width="160" height="160"
                                                     src={this.state.logoPreview}/>
                                            </p>
                                            : <div>Drag and drop or click to select a logo to upload
                                                (Optional).</div>}
                                    </Dropzone>


                                </div>
                                <div className="column is-two-fifths">
                                    <strong>Project Name:</strong>
                                    <br/>
                                    <input key={this.state.slug}
                                           ref="projectName"
                                           type="text"
                                           className="input"
                                           defaultValue={this.state.defaultProjectName}
                                           required={true}/>
                                    <br/>
                                    <br/>
                                    <strong>Short Description:</strong>
                                    <br/>
                                    <textarea key={`shortdescription-${this.state.slug}`}
                                              ref="shortDescription"
                                              className="textarea"
                                              defaultValue={this.state.defaultShortDescription}
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
                                    options={this.state.selectableCategories}
                                    placeholder="Select Categories"
                                    simpleValue
                                    value={this.state.categories}
                                />
                            </div>
                            <br/>
                            <div className="column is-four-fifth">
                                <h5>Description:</h5>
                                <div className="tabs">
                                    <ul>
                                        <li className={this.state.tab === 1 ? 'is-active' : ''}
                                            onClick={() => this.onChangeTab(1)}>
                                            <a>Write</a>
                                        </li>
                                        <li className={this.state.tab === 2 ? 'is-active' : ''}
                                            onClick={() => this.onChangeTab(2)}>
                                            <a>Preview</a>
                                        </li>
                                    </ul>
                                </div>
                                {
                                    this.state.tab === 1 ? (
                                            <Textarea key={`dist-${this.state.slug}`}
                                                      className="textarea"
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
                                Edit Mod
                            </a>
                        </div>
                        <div className="column">
                            <ModNav slug={projectSlug} url="settings"/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ModSettings;
