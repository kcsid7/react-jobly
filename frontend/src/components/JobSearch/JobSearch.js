import React, { useState, useEffect, useContext } from "react";


// Context
import AppContext from "../../context/AppContext.js";

// API
import JoblyApi from "../../api/api.js";

// CSS
import "./JobSearch.css"

// Components
import JobCard from "../JobCard/JobCard.js";

function JobSearch() {

    const { localUser, token, isAdmin } = useContext(AppContext);

    const [jobs, setJobs] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState(null);
    const [search, setSearch] = useState("")

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

    const handleChange = (e) => {
        // If the search box has been used and is empty after 1 second we refresh the page
        if (e.target.value === "") {
            setTimeout(() => setJobs(null), 1000);
        }
        setSearch(e.target.value)
    }

    const submitSearch = async (e) => {
        e.preventDefault();
        const res = await JoblyApi.searchForJobByTerm(search);
        setJobs(res.jobs)
    }



    const jobsHTML = (j) => {
        return (
            <>
            <div className="Jobs-Search">
                <form>
                <input 
                    type="text" 
                    placeholder="Search for jobs" 
                    onChange={handleChange}
                    value={search} />
                <button 
                    onClick={submitSearch}
                    disabled={search === "" ? true : false}
                    >Search</button>
                </form>
            </div>
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
            </>
        )
    }
    
    return (
        <>
            {
                jobs ?
                jobsHTML(jobs):
                <>
                </>
            }
        </>
    )
}

export default JobSearch;