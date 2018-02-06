import React, { Component } from 'react';
import globals from '../../../../utils/globals';

import prettyBytes from '../../../../utils/pretty-bytes';
import ReactTooltip from 'react-tooltip';

class ProjectFile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.displayName}</td>
                <td>{globals.getDate(this.props.createdAt)}</td>
                <td>{prettyBytes(100000000000000000000000)}</td>
                <td>
                    {
                        //TODO Max to like 5, and add comma's
                        this.props.gameVersions ? this.props.gameVersions.map(item =>
                            <div key={item.version}>
                                {item.version}
                            </div>
                        ) : ''
                    }
                </td>
                <td>{this.props.downloads}</td>
                <td>
                    {(this.props.public) ? (
                            <div>
                                <a href={this.props.downloadUrl}>Download</a>
                                <i data-tip={this.props.sha512}
                                   className='fa fa-info-circle'/>
                                <ReactTooltip class='hoverSHA'
                                              delayHide={1000}
                                              effect='solid'/>
                            </div>
                        ) :
                        (
                            <div>
                                <a>N/A</a>
                            </div>
                        )
                    }

                </td>
                {
                    <td>
                        {(this.props.public) ? 'Public' :
                            this.props.status
                        }
                    </td>
                }
            </tr>
        );
    }
}

export default ProjectFile;
