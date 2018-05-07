import React, { Component } from 'react';
import { Redirect } from 'react-router';
import userUtils from '../../../utils/userUtilities';

class Logout extends Component {
    render() {
        if (userUtils.getStorage() !== null) {
            userUtils.getStorage()
                .clear();
        }
        return (
            <Redirect to="/"/>
        );
    }
}

export default Logout;
