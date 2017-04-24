import React, {Component} from "react";

class Messages extends Component {

    render() {
        return (
            document.title = "Private Messages - Project Alt",
                <div>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active">Private Messages</li>
                    </ol>
                    <button type="button" className="btn btn-secondary">New Message</button>
                    <hr/>
                    <div className="row">
                        <div className="col-3">
                            <div className="list-group">
                                <a href="#" className="list-group-item  list-group-item-action active">
                                    Inbox (1)
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">Unread (0)</a>
                            </div>
                            <br/>
                            <br/>
                            <div className="list-group">
                                <a href="#" className="list-group-item  list-group-item-action active">
                                    Inbox (1)
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">Unread (0)</a>
                            </div>
                        </div>
                        <div className="col">
                            <table className="table table-striped table-hover table-bordered">
                                <thead className="thead-inverse">
                                <tr>
                                    <th>Subject</th>
                                    <th>Replies</th>
                                    <th>Activity</th>
                                    <th>From</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Message Name</td>
                                    <td>2</td>
                                    <td>3 days ago</td>
                                    <td>A dickhead <span class="badge badge-success">Friend</span></td>
                                </tr>
                                <tr>
                                    <td>Message Name</td>
                                    <td>2</td>
                                    <td>3 days ago</td>
                                    <td>A dickhead</td>
                                </tr>
                                <tr>
                                    <td><b>Message Name</b></td>
                                    <td><b>2</b></td>
                                    <td><b>3 days ago</b></td>
                                    <td><b>A dickhead</b></td>
                                </tr>
                                <tr>
                                    <td>Message Name</td>
                                    <td>2</td>
                                    <td>3 days ago</td>
                                    <td>A dickhead</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Messages;