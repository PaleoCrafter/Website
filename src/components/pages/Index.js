import React from 'react';

class Index extends React.Component {
    render() {
        document.title = 'Diluv';
        return (
            <div className="container">
                <div className="column is-one-fifth">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title is-centered">
                                <a href="/minecraft/mods/">Minecraft</a>
                            </p>
                        </header>
                        <a href="/minecraft/">
                            <div className="card-image">
                                <figure className="image is-16by9">
                                    <img src="/images/logo_minecraft.png" alt="Mods" />
                                </figure>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
