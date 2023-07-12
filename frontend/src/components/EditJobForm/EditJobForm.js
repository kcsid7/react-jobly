import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import AppContext from "../../context/AppContext";

import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

import JoblyApi from "../../api/api";


import "./EditJobForm.css";

function EditJobForm({ id, cancelForm, title, salary, equity, editJobUpdate }) {

    const { setError, isAdmin, localUser, token } = useContext(AppContext);

    const navigate = useNavigate();

    const initialData = {
        title: title,
        salary: salary,
        equity: equity
    }

    // Form Data Hook
    const [formData, updateForm, resetForm] = useFormData(initialData);


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            JoblyApi.token = token
            const updateData = {...formData, salary: +formData.salary};
            const res = await JoblyApi.updateJob(id, updateData)
            editJobUpdate(res);
            cancelForm();
            setError({message: `Job Updated`, type: "success"})
        } catch(e) {
            resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="EditJob">
            <h3>Edit Job - Admin</h3>
            <form className="EditJob-Form" onSubmit={handleSubmit}>
                <div className="EditJob-Form-Field">
                    <label htmlFor="title">Title</label>
                    <input required type="text" name="title" id="title" value={formData.title} onChange={updateForm}/>
                </div>
                <div className="EditJob-Form-Field">
                    <label htmlFor="salary">Salary</label>
                    <input required type="number" name="salary" id="salary" value={formData.salary} onChange={updateForm}/>
                </div>
                <div className="EditJob-Form-Field">
                    <label htmlFor="equity">Equity</label>
                    <input required type="text" name="equity" id="equity" value={formData.equity} onChange={updateForm}/>
                </div>
                <button disabled={!Object.values(formData).every(d => d !== "")}>Update Job</button>
                <button type="button" 
                        onClick={() => cancelForm()}>Cancel</button>
            </form>
        </div>
    )
}

export default EditJobForm;