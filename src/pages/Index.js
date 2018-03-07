import React from 'react';
import { Link } from 'react-router-dom';

class Index extends React.Component {
    render() {
        return (
           <div className="container">
                <Link to="/minecraft">
                    Minecraft
                </Link >
            </div>
        );
    }
}

export default Index;
