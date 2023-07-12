import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import AppContext from "../../context/AppContext";

import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

import JoblyApi from "../../api/api";


import "./AddJobForm.css";

function AddJobForm({handle, cancelForm, updateCompanyJobs}) {

    const { setError, isAdmin, localUser, token } = useContext(AppContext);

    const navigate = useNavigate();

    const initialData = {
        title: "",
        salary: "",
        equity: ""
    }

    // Form Data Hook
    const [formData, updateForm, resetForm] = useFormData(initialData);


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const jobData = {...formData, salary: +formData.salary, companyHandle: handle}
            JoblyApi.token = token
            const {id, title, salary, equity, companyHandle} = await JoblyApi.addJob(jobData);
            setError({message: "Job Added!", type: "success"});
            updateCompanyJobs({id, title, salary, equity});
            navigate(`/company/${companyHandle}`);
            cancelForm();
            resetForm(s => initialData);
        } catch(e) {
            resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="AddJob">
            <h1>Add Job - Admin</h1>
            <form className="AddJob-Form" onSubmit={handleSubmit}>
                <div className="AddJob-Form-Field">
                    <label htmlFor="title">Title</label>
                    <input required type="text" name="title" id="title" value={formData.title} onChange={updateForm}/>
                </div>
                <div className="AddJob-Form-Field">
                    <label htmlFor="salary">Salary</label>
                    <input required type="number" name="salary" id="salary" value={formData.salary} onChange={updateForm}/>
                </div>
                <div className="AddJob-Form-Field">
                    <label htmlFor="equity">Equity</label>
                    <input required type="text" name="equity" id="equity" value={formData.equity} onChange={updateForm}/>
                </div>
                <button disabled={!Object.values(formData).every(d => d !== "")}>Add Job</button>
                <button type="button" 
                        onClick={() => cancelForm()}>Cancel</button>
            </form>
        </div>
    )
}

export default AddJobForm;