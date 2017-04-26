import React, {Component} from "react";


class Files extends Component {
    render() {
        return (
            document.title = "Files - "+this.props.match.params[0].capitalize() + " - Project Alt",
                <div className="container">

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Date</th>
                                    <th>Game Version</th>
                                    <th>Downloads</th>
                                  </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                      </table>
                    </div>
                </div>
        )
    }
}

export default Files;