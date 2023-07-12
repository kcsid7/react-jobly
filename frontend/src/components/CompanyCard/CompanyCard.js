import React, { useState } from "react";
import { Link } from "react-router-dom";


import "./CompanyCard.css";


function CompanyCard({handle, name, logo, numEmployees}) {



    return (
        <>
            <div className="CompanyCard">
                <div className="CompanyCard-Header">
                    {/* { logo ? <img src={logo} alt={name}/> : <></>} */}
                    <h4><Link to={`/company/${handle}`}>{name}</Link></h4>
                </div>
            </div>
        </>
    )


}

export default CompanyCard;