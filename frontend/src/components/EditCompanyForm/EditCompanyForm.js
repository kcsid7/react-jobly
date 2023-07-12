import React, {useContext} from "react";

import { Link, useNavigate } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

import AppContext from "../../context/AppContext";

import JoblyApi from "../../api/api";


import "./EditCompanyForm.css";

function EditCompanyForm({company, cancelForm, updateCompanyState}) {



    const { token, localUser, setError } = useContext(AppContext);

    const navigate = useNavigate();

    const initialData = {
        name: company.name,
        description: company.description,
        numEmployees: company.numEmployees,
        logoUrl: company.logoUrl
    }

    // Form Data Hook
    const [formData, updateForm, resetForm] = useFormData(initialData);

    /* 
    custom error hook state that resets the error to null after a given time
    this time also determines for how long this error will be displayed
    */
    // const [error, setError] = useErrorState(7000); 

    // const errorMessage = (error) => {
    //     return error ?
    //     <>
    //         <AlertBanner width={70} message={error.message} type="success"/>
    //     </>
    //     : <></>
    // }


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            console.log("EditCompany - handleSubmit")
            JoblyApi.token = token;
            const patchData = {...formData, numEmployees: +formData.numEmployees, logoUrl: formData.logoUrl ? formData.logoUrl : ""}
            const {name, handle, description, logoUrl, numEmployees} = await JoblyApi.updateCompany(company.handle, patchData);
            setError({message: `Company ${name} Updated`, type: "success"});
            updateCompanyState({name, description, logoUrl, numEmployees});
            cancelForm()
        } catch(e) {
            resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="EditCompany">
            <h1>Edit Company - Admin Only</h1>
            <form className="EditCompany-Form" onSubmit={handleSubmit}>
                <div className="EditCompany-Form-Field">
                    <label htmlFor="name">Name</label>
                    <input required type="text" name="name" id="name" value={formData.name} onChange={updateForm}/>
                </div>
                <div className="EditCompany-Form-Field">
                    <label htmlFor="description">Description</label>
                    <textarea required type="text" name="description" id="description" value={formData.description} onChange={updateForm}/>
                </div>
                <div className="EditCompany-Form-Field">
                    <label htmlFor="numEmployees">Employee Count</label>
                    <input required type="number" name="numEmployees" id="numEmployees" value={formData.numEmployees} onChange={updateForm}/>
                </div>
                <div className="EditCompany-Form-Field">
                    <label htmlFor="logoUrl">Logo</label>
                    <input type="text" name="logoUrl" id="logoUrl" value={formData.logoUrl} onChange={updateForm}/>
                </div>
                <button>Update</button>
                <button type="button" onClick={() => cancelForm()}>Cancel</button>
            </form>
        </div>
    )
}

export default EditCompanyForm;