import React from 'react';

class Index extends React.Component {
    render() {
        document.title = 'Diluv';
        return (
            <div className="container">
                <a href="/minecraft">
                    Minecraft
                </a>
            </div>
        );
    }
}

export default Index;
