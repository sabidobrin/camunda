import React, { Component } from "react";
import { Link } from 'react-router-dom';

// export a navigation component (use react-router-dom)
export default class Navigation extends Component {
    render() {
        return (
            <div className="navigation">
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/modeler">MODELER</Link></li>
                    <li><Link to="/frameworks">FRAMEWORKS</Link></li>
                    <li><Link to="/hacksession">HACK SESSION</Link></li>
                </ul>
            </div>
        );
    }
}