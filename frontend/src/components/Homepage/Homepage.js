import React, { useState } from "react";

import { Link } from "react-router-dom";


// CSS
import "./Homepage.css"

function Homepage() {

    return (
        <div className="Homepage">
            <h1 className="Homepage-Header">Jobly</h1>
            <div className="Homepage-Body">
                <h3>Discover your new adventure</h3>
                <div className="Homepage-Body-Links">
                    <h4>
                        <Link to={`/jobs`}>Discover Jobs</Link>
                    </h4>
                    <h4>
                        <Link to={`/companies`}>Discover Companies</Link>
                    </h4>
                        
                </div>
            </div>
        </div>
    )
}

export default Homepage;