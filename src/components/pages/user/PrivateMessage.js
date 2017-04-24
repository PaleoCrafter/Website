import React, {Component} from "react";

class PrivateMessage extends Component {

    render() {
        return (
            document.title = "Message Name -  Private Messages - Project Alt",
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