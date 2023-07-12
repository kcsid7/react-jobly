import React, {useState, useContext, useEffect} from "react";

import { useParams, useNavigate, Link } from "react-router-dom";


import AppContext from "../../context/AppContext";

import NewAdminUserForm from "../NewAdminUserForm/NewAdminUserForm";
import AddCompanyForm from "../AddCompanyForm/AddCompanyForm";

import JoblyApi from "../../api/api";

import "./UserProfile.css";


function UserProfile() {

    const { username } = useParams();
    const { setError, localUser, token, isAdmin } = useContext(AppContext);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [navBtn, setNavBtn] = useState('default');

    useEffect( () => {

        if (!localUser) {
            setError({message: "Unauthorized", type: "failure"});
            navigate("/");
        } else {
            getUserInfo(localUser);
        }
        async function getUserInfo(username) {
            JoblyApi.token = token;
            const result = await JoblyApi.getUser(username);
            console.log("UserProfile - useEffect - getUserInfo", result);
            setUser(result);
        }
    }, [])


    const userHTML = (user) => {

        const adminViewsHTML = () => {
            switch(navBtn) {
                case 'add-user':
                    return (
                        <NewAdminUserForm />
                    )
                
                case 'add-company':
                    return (
                        <AddCompanyForm />
                    )

                default:
                    return (
                        <>
                        </>
                    )
            }
        }

        if (user.isAdmin) {
            return (
                <div className="UserProfile">
                    <h1>Admin Profile</h1>
                    <div className="UserProfile-Info">
                        <h5>{user.firstName} {user.lastName}</h5>
                        <h5>{user.email}</h5>
                    </div>
                    <div className="UserProfile-Info-Admin-Btns">
                        <button onClick={() => setNavBtn(s => 'add-user')}>Add User</button>
                        <button onClick={() => navigate("/users")}>Show All Users</button>
                        <button onClick={() => setNavBtn(s => 'add-company')}>Add Company</button>
                        <button onClick={() => navigate("/companies")}>Show All Companies</button>
                    </div>
                    {
                        adminViewsHTML()
                    }
                </div>
            )
        }

        return (
            <>
            <div className="UserProfile">
                <h1>{user.firstName} {user.lastName}'s Profile</h1>
                <div className="UserProfile-Info">
                    <h5>{user.email}</h5>
                </div>
                <div className="UserProfile-Applications">
                    <h4>Applications [ {user.applications.length} ]</h4>
                    <ul className="UserProfile-Applications-List">
                        {
                            user.applications ?
                            user.applications.map(a => {
                                return (
                                    <li key={a.job_id} className="UserProfile-Applications-List-Item">
                                        <h5>{a.title}</h5>
                                        <h5><Link to={`/company/${a.company_handle}`}>{a.name}</Link></h5>
                                    </li>
                                )
                            })
                            : <></>
                        }
                    </ul>
                </div>
            </div>
            </>
        )
    }



    return (
    <>
        {/* <h1> User Profile </h1> */}
        {user ? userHTML(user) : <></>}
    </>
    )
}

export default UserProfile;