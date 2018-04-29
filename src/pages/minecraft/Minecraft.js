import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import globals from '../../utils/globals';
import requestUtils from '../../utils/requestUtils';

class Minecraft extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            error: '',
        };
    }


    componentDidMount() {
        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft`))
            .then((res) => {
                this.setState({ gameData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
        requestUtils.fetchGet(new URL(`${globals.endPoint()}/games/minecraft/projectTypes`))
            .then((res) => {
                this.setState({ items: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <section className="section">
                <h1 className="title is-1">Projects</h1>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <a href="/minecraft/mods/">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png"
                                             alt="Mods"/>
                                    </figure>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Minecraft;
