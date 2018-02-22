import React, { Component } from 'react';
import { Redirect } from 'react-router';
import globals from '~/utils/globals';
import requestUtils from '~/utils/requestUtils';

import Select from 'react-select';
import Dropzone from 'react-dropzone';
import Textarea from 'react-textarea-autosize';
import userUtils from '~/utils/userUtils';

class ModSettings extends Component {

    constructor() {
        super();
        this.state = {
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
                    defaultLogoPreview: `${globals.publicFolder()}/projects/logo/${res.data.logo}`,

                    description: res.data.description,
                    markdown: globals.parseMarkdown(res.data.description),
                    logoPreview: `${globals.publicFolder()}/projects/logo/${res.data.logo}`,
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

                console.log(this.state);

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

        let params = {};
        if (this.state.defaultProjectName !== this.refs.projectName.value) {
            params['projectName'] = this.refs.projectName.value;
        }

        if (this.state.defaultShortDescription !== this.refs.shortDescription.value) {
            params['shortDescription'] = this.refs.shortDescription.value;
        }

        if (this.state.defaultDescription !== this.state.description) {
            params['shortDescription'] = this.state.description;
        }

        if (this.state.defaultLogoPreview !== this.state.logoPreview) {
            params['logo'] = this.state.imageFiles;
        }

        if (this.state.defaultCategories !== this.state.categories) {
            params['categories'] = this.state.categories.split(',');
        }

        Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));

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
                if (res.statusCode === 200) {
                    this.setState({ redirect: res.data.slug });
                    console.log(this.state.redirect);

                }
                console.log(res);
            });
        //TODO CATCH AND FIX
    }

    /**
     * Handles the change of logo
     * @param imageFiles
     */
    onDrop(imageFiles) {
        console.log(imageFiles);
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
        let description = change.target.value;

        if (description === '') {
            description = ' No description to preview';
        }
        this.setState({ markdown: globals.parseMarkdown(description) });
    }

    onCategoryChange(categories) {
        console.log('You\'ve selected:', categories);
        this.setState({ categories });
    }

    render() {
        //TODO Check permission and redirect away if none
        const projectSlug = this.props.match.params.slug;

        document.title = this.state.defaultProjectName + ' - Settings - Diluv';

        if (this.state.permission && !globals.hasProjectPermission(this.state.permission, globals.PROJECT_PERMISSION.EDIT_SETTINGS)) {
            return (<Redirect to={'/minecraft/' + projectSlug}/>);
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h1><i className="fa fa-cog"/> {this.state.defaultProjectName} Settings</h1>
                    </div>
                    <div className="col-md-2">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active"
                                   href={'/minecraft/mods/' + projectSlug}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href={'/minecraft/mods/' + projectSlug + '/files'}>Files</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href={'/minecraft/mods/' + projectSlug + '/settings'}>Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-2">
                                <Dropzone
                                    onDrop={this.onDrop}
                                    className='dropzone'
                                    activeClassName='active-dropzone'
                                    accept="image/jpeg, image/png"
                                    multiple={false}>

                                    {this.state.logoPreview ? <div>
                                        <div><img width="160" height="160"
                                                  src={this.state.logoPreview}/></div>
                                    </div> : <div>Drag and drop or click to select a logo to upload
                                        (Optional).</div>}
                                </Dropzone>


                            </div>
                            <div className="col-md-6">
                                <div className="col-md-auto">
                                    Project Name:
                                    <input key={this.state.slug} ref="projectName"
                                           type="text" className="form-control input-md"
                                           defaultValue={this.state.defaultProjectName}
                                           required={true}/>
                                </div>
                                <div className="col-md-auto">
                                    Short Description:
                                    <textarea key={this.state.slug}
                                              ref="shortDescription" className="form-control"
                                              defaultValue={this.state.defaultShortDescription}
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
                                    onChange={this.onCategoryChange}
                                    options={this.state.selectableCategories}
                                    placeholder="Select Categories"
                                    simpleValue
                                    value={this.state.categories}
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-12">
                                Description:
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab"
                                           href="#write"
                                           role="tab">Write</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#preview"
                                           role="tab">Preview</a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane active" id="write" role="tabpanel">
                                    <Textarea key={this.state.slug}
                                              className="form-control"
                                              placeholder="Enter some markdown..."
                                              value={this.state.value}
                                              onChange={this.onDescriptionChange}
                                              defaultValue={this.state.defaultDescription}
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
                                    Edit Project
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModSettings;
