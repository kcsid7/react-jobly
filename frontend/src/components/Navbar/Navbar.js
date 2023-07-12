import React, { useState, useContext } from "react";

import { NavLink } from "react-router-dom";


import AppContext from "../../context/AppContext";



import "./Navbar.css";



function Navbar({logout}) {

    const { localUser, isAdmin } = useContext(AppContext);

    
    return (
        <>
            <nav className="Navbar">
                <div>
                    <NavLink className={`Navlink`} to="/">Home</NavLink>
                </div>
                {/* <div>
                        <NavLink className={`Navlink`} to="/login">Login</NavLink>
                        <NavLink className={`Navlink`} to="/signup">Signup</NavLink>
                </div>  */}
                {
                    localUser 
                    ?
                    <div>
                        <NavLink className={`${isAdmin ? 'Navlink-White' : ''}`} to={`/user/${localUser}`}>{localUser}</NavLink>
                        <NavLink className={`${isAdmin ? 'Navlink-White' : ''}`} to="/" onClick={logout}>Logout</NavLink>
                    </div>
                    :                
                    <div>
                        <NavLink className={`${isAdmin ? 'Navlink-White' : ''}`} to="/login">Login</NavLink>
                        <NavLink className={`${isAdmin ? 'Navlink-White' : ''}`} to="/signup">Signup</NavLink>
                    </div> 
                }

            </nav>
        </>
    )
}

export default Navbar;