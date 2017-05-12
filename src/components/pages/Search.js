import React, {Component} from "react";

class Search extends Component {

    render() {
        document.title = "Search - Diluv";
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Search</li>
                </ol>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Users</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Search;