import React, { Component } from 'react';
import globals from '~/utils/globals';
import { Link } from 'react-router-dom';
import requestUtils from '~/utils/requestUtils';

class Minecraft extends Component {
    constructor() {
        super();
        this.state = {
            gameData: [],
            items: [],
            error: ''
        };
    }


    componentDidMount() {
        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft')
            .then(res => {
                console.log(res);
                if (res.statusCode === 200) {
                    this.setState({ gameData: res.data });
                } else {
                    //TODO Handle
                }
            })
            .catch(err => {

            });
        requestUtils.getFetchJSON(globals.endPoint() + '/games/minecraft/projectTypes')
            .then(res => {
                console.log(res);

                if (res.statusCode === 200) {
                    this.setState({ items: res.data });
                } else {
                    //TODO Handle
                }
            })
            .catch(err => {

            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <h1>Projects</h1>
                    </div>
                    <div className="col-md-4"/>
                </div>
                <div className="row">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        {
                            this.state.items.length > 0 ? this.state.items.map(item =>
                                <Link key={item.slug} to={'/minecraft/' + item.slug}>
                                    {item.name}
                                </Link>
                            ) : ''
                        }
                    </div>
                    <div className="col-md-4"/>
                </div>
            </div>
        );
    }
}

export default Minecraft;
