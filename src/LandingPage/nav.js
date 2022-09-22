import React from 'react';

function nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1>Portfolio</h1>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <p className="nav-link active">Home</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link">My Page</p>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse d-flex" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <p className="nav-link" aria-current="page">Sign In</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link">Sign Up</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default nav;