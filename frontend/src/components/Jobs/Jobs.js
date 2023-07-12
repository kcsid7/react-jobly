import React, { useState, useEffect, useContext } from "react";


// Context
import AppContext from "../../context/AppContext.js";

// API
import JoblyApi from "../../api/api.js";

// CSS
import "./Jobs.css"

// Components
import JobCard from "../JobCard/JobCard.js";

function Jobs() {

    const { localUser, token, isAdmin } = useContext(AppContext);

    const [jobs, setJobs] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState(null);

    useEffect(() => {
        async function getJobs() {
            try {
                const result = await JoblyApi.getAllJobs();
                setJobs(result.jobs);
            } catch(e) {
                console.log("Get Jobs Error", e);
            }
        }
        if (!jobs) getJobs();

        async function getUserApplications() {
            try {
                const result = await JoblyApi.getUser(localUser);
                setAppliedJobs(s => result.applications.map(r => r.job_id));
            } catch(e) {
                console.log("Get User Applications", e);
            }
        }

        if (localUser) {
            JoblyApi.token = token;
            getUserApplications();
        }


    }, [jobs])


    // EditJobForm - update Job
    // updatedJob = {companyHandle, equity, id, salary, title}
    const updateJob = (updatedJob) => {

        console.log("/jobs", updatedJob);

        const editedJobs = jobs.map( j => {
            if (j.id !== updatedJob.id) return j
            return {...updatedJob, companyName: j.companyName}
        })
        console.log(editedJobs);

        setJobs([...editedJobs])



    }

    const jobsHTML = (j) => {
        return (
            <div className="Jobs">
                {
                    j.map(i => <JobCard 
                                    key={i.id} 
                                    id={i.id} 
                                    title={i.title}
                                    salary={i.salary} 
                                    editJobUpdate={updateJob}
                                    equity={i.equity} 
                                    companyHandle={i.companyHandle} 
                                    companyName={i.companyName}
                                    hideCompany={false}
                                    applied={appliedJobs ? appliedJobs.includes(i.id) : false}
                                    setAppliedJob={localUser ? setAppliedJobs : null}
                                    />) 
                }
            </div>
        )
    }
    
    return (
        <>
            {
                jobs ?
                jobsHTML(jobs):
                <></>
            }
        </>
    )
}

export default Jobs;