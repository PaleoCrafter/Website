import React, {Component} from "react";

class Projects extends Component {
    render() {
        return (
            document.title = this.props.match.params[0].capitalize() + " - Projects - Project Alt",
                <div>
                    <h1><i className="fa fa-cog" aria-hidden="true"/> {this.props.match.params[0].capitalize()}</h1>
                    <hr/>
                    <div className="alert alert-dismissible alert-warning">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <h4>Warning!</h4>
                        <p>An error occured while getting a list of {this.props.match.params[0]}.</p>
                    </div>
                    <div>
                        <ul className="pagination pagination-sm">
                            <li className="page-item disabled">
                                <a className="page-link" href="?page=2">&laquo;</a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="?page=1">1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="?page=2">2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="?page=3">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="?page=4">4</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="?page=5">5</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">&raquo;</a>
                            </li>
                        </ul>
                    </div>
                </div>
        )
    }
}
export default Projects;