import React, { useState, useContext } from "react";

import { Link, useNavigate  } from "react-router-dom";
import * as jose from "jose";

// Components
import JobDetails from "../JobDetails/JobDetails.js";

// API
import JoblyApi from "../../api/api.js";


import AppContext from "../../context/AppContext.js";


import "./JobCard.css";
import EditJobForm from "../EditJobForm/EditJobForm.js";

function JobCard(props) {


    const {id, title, salary, equity, companyHandle, 
        companyName, applied, setAppliedJob, hideCompany, editJobUpdate} = props

    const { setError, localUser, token, isAdmin } = useContext(AppContext);


    const [display, setDisplay] = useState(false);
    const [editForm, setEditForm] = useState(false);


    const toggleDisplay = () => setDisplay(d => !d);
    
    function handleShowDetails() {
        toggleDisplay();
    }

    async function applyToJob() {
        JoblyApi.token = token;
        const result = await JoblyApi.applyToJob(localUser, id);
        setError({message: "Applied to job!", type: "success"});
        setAppliedJob(s => [...s, id]);
    }

    


    return (
        <>
        <div className="JobCard">
            <div className="JobCard-Header">
                <h4>{title}</h4>
                {
                    hideCompany ?
                    <></> :
                    <h4><Link to={`/company/${companyHandle}`}>{companyName}</Link></h4>
                }
            </div>
            <div className="JobCard-Body">
                <button onClick={handleShowDetails} className="DetailsBtn">
                    {display ? "Hide Details" : "Show Details"}
                </button>
                {
                    localUser && !isAdmin ?
                    <button onClick={applyToJob} 
                            className={`${applied ? "ApplyBtn-Applied" : "ApplyBtn"}`}
                            disabled={applied}
                    >
                        { applied ? "Applied" : "Apply"}
                    </button> :
                    <>
                    {
                        isAdmin ? <button className="EditBtn" onClick={() => setEditForm(s => true)}>Edit Job</button> : <> </>
                    }
                    </>
                }
                {
                    editForm ? 
                        <EditJobForm 
                        cancelForm={() => setEditForm(s => false)}
                        title={title}
                        salary={salary}
                        equity={equity}
                        id={id}
                        editJobUpdate={editJobUpdate}
                        
                        /> 
                    : <></>
                }

                {
                    display ? <JobDetails id={id} /> : <></>
                }
            </div>
        </div>
        </>
    )
}

export default JobCard;