import React, {Component} from "react";

class ErrorNotFound extends Component {

    render() {
        document.title = "404 - Diluv";
        return (
            <div>
                404 Not Found
            </div>
        )
    }
}

export default ErrorNotFound;