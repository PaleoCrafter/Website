import React, {Component} from "react";
import AccountTop from "../../../elements/AccountTop";

class Account extends Component {

    render() {
        return (
            document.title = "My Account - Project Alt",
                <div>
                    <AccountTop/>
                    <div className="card card-outline-primary text-xs-center">
                        <div className="card-block">
                            <div className="form-group">
                                <fieldset>
                                    <label className="control-label" for="readOnlyInput">Username</label>
                                    <input className="form-control" id="readOnlyInput" type="text"
                                           placeholder="Username" readOnly="true"/>
                                </fieldset>
                                <br/>
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" value="example@example.com"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                    anyone else.
                                </small>
                                <br/>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Account;