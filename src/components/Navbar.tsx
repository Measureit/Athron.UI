import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/athlete">Athlete Progress</Link>
                </li>
                <li>
                    <Link to="/group">Group Sessions</Link>
                </li>
                <li>
                    <Link to="/simulation">Path Simulation</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;