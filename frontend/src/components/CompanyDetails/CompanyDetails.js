import React, {useState, useEffect, useContext} from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import salaryFormatter from "../../helpers/salaryFormatter";

import AppContext from "../../context/AppContext";

// Components
import JobCard from "../JobCard/JobCard";
import AddJobForm from "../AddJobForm/AddJobForm";

// API
import JoblyApi from "../../api/api";

import "./CompanyDetails.css"
import EditCompanyForm from "../EditCompanyForm/EditCompanyForm";


function CompanyDetails() {


    const {id} = useParams();
    const { localUser, token, setError, isAdmin } = useContext(AppContext);

    const navigate = useNavigate();

    const [company, setCompany] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState(null);

    const [navState, setNavState] = useState('default');


    useEffect(() => {
        const getCompany = async () => {
            const result = await JoblyApi.getCompany(id);
            setCompany(result);
        }

        getCompany();


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

    }, [])


    // Add New Job - Admin
    function updateCompanyJobs(jobData) {
        setCompany(s => ({
            ...s,
            jobs: [...s.jobs, jobData]
        }))
    }

    // Update Company - Admin
    function updateCompanyState(data) {
        setCompany(s => ({
            ...s,
            name: data.name,
            description: data.description,
            numEmployees: data.numEmployees,
            logoUrl: data.logoUrl
        }))
    }

    // Delete Company Admin
    async function deleteCompany(handle) {
        try {
            console.log("deleteCompany");
            JoblyApi.token = token;
            const res = await JoblyApi.deleteCompany(handle)
            setError({message: `Restaurant ${res} deleted`, type: "success"});
            navigate("/companies")
        } catch(e) {
            console.log("deleteCompany", e);
        }
    }

    // EditJobForm - update Job
    // updatedJob = { equity, id, salary, title}
    const updateJob = (updatedJob) => {
        delete updatedJob.companyHandle;

        const editedJobs = company.jobs.map( j => {
            if (j.id !== updatedJob.id) return j
            return {...updatedJob}
        })

        setCompany(s => ({
            ...s,
            jobs: [...editedJobs]
        }))
    }


    const companyDetailsHTML = (comp) => {

        const adminFormsHTML = () => {
            switch(navState) {
                case 'add-job': 
                    return (
                        <AddJobForm handle={comp.handle} 
                            cancelForm={() => setNavState('default')} 
                            updateCompanyJobs={updateCompanyJobs}
                        />
                    )
                case 'edit-company':
                    return (
                        <EditCompanyForm company={company} cancelForm={() => setNavState('default')} updateCompanyState={updateCompanyState}/>
                    )
                default:
                    return (
                        <>
                        </>
                    )
            }
        }

        return (
            <>
            <div className="CompanyDetails">
                <div className="CompanyDetails-Header">
                    <h2>{comp.name}</h2>
                    <p>{comp.description}</p>
                    {
                        isAdmin ?
                        <>
                            <div className="Admin-Btn-Grp">
                                <button onClick={() => setNavState('edit-company')}>Edit Company</button>
                                <button onClick={() => setNavState('add-job')}>Add Job</button>
                                <button onClick={() => deleteCompany(company.handle)}>Delete Company</button>
                            </div>
                        </>
                        : <></>
                    }
                </div>
                {
                    isAdmin ? adminFormsHTML(company) : <></>
                }
                <div className="CompanyDetails-Body">
                    <h4>Job List</h4>
                    {
                        company.jobs.length > 0 ? 
                        <>
                            {
                                company.jobs.sort().map(i => <JobCard 
                                                key={i.id} 
                                                id={i.id} 
                                                title={i.title}
                                                salary={i.salary}
                                                equity={i.equity}
                                                hideCompany={true}
                                                editJobUpdate={updateJob}
                                                companyHandle={company.handle} 
                                                companyName={company.name}
                                                applied={appliedJobs ? appliedJobs.includes(i.id) : false}
                                                setAppliedJob={localUser ? setAppliedJobs : null}
                                    />)
                            }
                        </>
                        :
                        <></>
                    }

                </div>
            </div>
            </>
        )
    }

    return (
        <>
        {
            company ? companyDetailsHTML(company) : <></>
        }
        </>
    )
}

export default CompanyDetails;