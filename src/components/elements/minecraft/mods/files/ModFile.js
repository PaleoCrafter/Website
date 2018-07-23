import React, { Component } from 'react';
import globals from '../../../../../utils/globals';

import prettyBytes from '../../../../../utils/pretty-bytes';

class ModFile extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.displayName}</td>
                <td>{globals.getDate(this.props.createdAt)}</td>
                <td>{prettyBytes(this.props.size)}</td>
                <td>
                    {
                        //TODO Max to like 5, and add comma's
                        this.props.gameVersions && this.props.gameVersions.map(item =>
                            <div key={item.version}>
                                {item.version}
                            </div>
                        )
                    }
                </td>
                <td>{this.props.downloads}</td>
                <td>
                    {(this.props.public) ? (
                            <div>
                                <a href={this.props.downloadUrl}>Download</a>
                                <i data-tip={this.props.sha512}
                                   className='fa fa-info-circle'/>
                                {/*<ReactTooltip className='hoverSHA'*/}
                                              {/*delayHide={1000}*/}
                                              {/*effect='solid'/>*/}
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

export default ModFile;
