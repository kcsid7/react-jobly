import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import salaryFormatter from "../../helpers/salaryFormatter";


import JoblyApi from "../../api/api";


import "./JobDetails.css";

function JobDetails({id}) {

    // const { jobId } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        async function getJob(jobId) {
            try {
                const result = await JoblyApi.getJobDetails(jobId);
                setJob(result.job);
            } catch(e) {
                console.log("Get Job Error", e);
            }
        }
        getJob(id);
    }, [])

    const jobDetailsHTML = (j) => {
        return (
            <>
            <div className="JobDetails">
                <div className="JobDetails-Body">
                    <div className="JobDetails-Body-Salary">
                        <h5>Salary: {salaryFormatter(j.salary)}</h5>
                        {j.equity ? <h5>Equity: {j.equity}</h5> : <></>}
                        {j.company.numEmployees ? <h5>Employees: {j.company.numEmployees}</h5> : <></>}
                    </div>
                </div>
            </div>
            </>
        )
    }

    return (
        <>
        {
            job ? jobDetailsHTML(job) : <></>
        }
        </>
    )
}


export default JobDetails;