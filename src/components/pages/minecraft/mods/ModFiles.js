import React, { Component } from 'react';
import ReactTable from 'react-table';

import globals from '../../../../utils/globals';
import requestUtils from '../../../../utils/requestUtilities';
import projectPermissions from '../../../../utils/projectPermissions';

import ModNav from '../../../elements/minecraft/mods/ModNav';
import prettyBytes from '../../../../utils/pretty-bytes';

class ModFiles extends Component {
    constructor() {
        super();
        this.state = {
            projectData: [],
            modFileData: [],
        };
    }

    componentDidMount() {
        const projectSlug = this.props.match.params.slug;

        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}`))
            .then((res) => {
                this.setState({ projectData: res.data });
            })
            .catch((err) => {
                console.log('Game');
            });

        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/mods/projects/${projectSlug}/files`))
            .then((res) => {
                this.setState({ modFileData: res.data });
            })
            .catch((err) => {
                console.log('Project Files');
            });
    }

    newFile(file) {
        return {
            name: file.displayName,
            date: globals.getDate(file.createdAt),
            size: prettyBytes(file.size),
            gameVersion: file.gameVersions,
            downloadCount: file.downloads,
            status: this.state.projectData.permission && projectPermissions.containsProjectPermission(
                this.state.projectData.permission, projectPermissions.PERMISSION.FILE) ? file.public : null
        };
    }

    makeData() {
        return this.state.modFileData.map(item => {
            return {
                ...this.newFile(item),
            };
        });
    }

    injectThProps = (state, rowInfo, column) => {
        return {
            style: { display: 'none' }
        };
    };

    render() {
        const columns = [
            {
                Header: 'Display Name',
                accessor: 'name',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Size',
                accessor: 'size'
            },
            {
                Header: 'Game Versions',
                accessor: 'gameVersion',
            },
            {
                Header: 'Download Count',
                accessor: 'downloadCount',
            },
        ];

        if (this.state.projectData.permission && projectPermissions.containsProjectPermission(
            this.state.projectData.permission, projectPermissions.PERMISSION.FILE)) {
            columns.push(
                {
                    Header: 'Status',
                    accessor: 'status',
                }
            );
        }

        const data = this.makeData();

        const projectSlug = this.props.match.params.slug;
        document.title = `${this.state.projectData.name} - Files - Diluv`;
        return (
            <section className="section">
                <div className="columns">
                    <div className="column is-four-fifths">
                        <div className="columns">
                            <div className="column is-four-fifths">
                                <h2 className="title is-2">{this.state.projectData.name} Files</h2>
                            </div>
                            <div className="column">
                                {
                                    (this.state.projectData.permission && projectPermissions.hasProjectPermission(
                                        this.state.projectData.permission, projectPermissions.PERMISSION.FILE.UPLOAD,
                                    )) &&
                                    (
                                        <a className="button is-success"
                                           role="button"
                                           href={`/minecraft/mods/${projectSlug}/upload`}>
                                            Upload File
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                        <ReactTable
                            data={data}
                            loading={!data}
                            columns={[
                                { columns },
                            ]}
                            defaultPageSize={100}
                            showPageSizeOptions={false}
                            className="-striped -highlight"
                            resizable={false}
                            getTheadGroupThProps={this.injectThProps}
                        />
                    </div>
                    <div className="column">
                        <ModNav slug={projectSlug} url="files"/>
                    </div>
                </div>
            </section>
        );
    }
}

export default ModFiles;
