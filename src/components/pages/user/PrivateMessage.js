import React, {Component} from "react";

class PrivateMessage extends Component {

    render() {
        document.title = "Message Name -  Private Messages - Diluv";
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/private-messages">Private Messages</a></li>
                    <li className="breadcrumb-item active">Message Name</li>
                </ol>
                <hr/>
                <h2>Message Name</h2>
            </div>
        )
    }
}

export default PrivateMessage;