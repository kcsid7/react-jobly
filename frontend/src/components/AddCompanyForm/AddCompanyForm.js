import React, {useContext} from "react";

import { Link, useNavigate } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

import AppContext from "../../context/AppContext";

import JoblyApi from "../../api/api";


import "./AddCompanyForm.css";

function AddCompanyForm() {



    const { token, localUser } = useContext(AppContext);

    const navigate = useNavigate();

    const initialData = {
        handle: "",
        name: "",
        description: "",
        numEmployees: "",
        logoUrl: ""
    }

    // Form Data Hook
    const [formData, updateForm, resetForm] = useFormData(initialData);

    /* 
    custom error hook state that resets the error to null after a given time
    this time also determines for how long this error will be displayed
    */
    const [error, setError] = useErrorState(7000); 

    const errorMessage = (error) => {
        return error ?
        <>
            <AlertBanner width={70} message={error.message} type="success"/>
        </>
        : <></>
    }


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            console.log("AddCompany - handleSubmit")
            JoblyApi.token = token;
            const res = await JoblyApi.addCompany({...formData, numEmployees: +formData.numEmployees});
            resetForm(s => initialData); // Reset form data
            console.log("New Company Added", res);
            setError({message: `Company ${res.company.name} added!`, type: "success"})
            navigate(`/company/${res.company.handle}`)
        } catch(e) {
            resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="AddCompany">
            <h1>New Company - Admin Only</h1>
            {
                errorMessage(error)
            }
            <form className="AddCompany-Form" onSubmit={handleSubmit}>
                <div className="AddCompany-Form-Field">
                    <label htmlFor="name">Name</label>
                    <input required type="text" name="name" id="name" value={formData.name} onChange={updateForm}/>
                </div>
                <div className="AddCompany-Form-Field">
                    <label htmlFor="handle">Handle</label>
                    <input required type="text" name="handle" id="handle" value={formData.handle} onChange={updateForm}/>
                </div>
                <div className="AddCompany-Form-Field">
                    <label htmlFor="description">Description</label>
                    <input required type="text" name="description" id="description" value={formData.description} onChange={updateForm}/>
                </div>
                <div className="AddCompany-Form-Field">
                    <label htmlFor="numEmployees">Employee Count</label>
                    <input required type="number" name="numEmployees" id="numEmployees" value={formData.numEmployees} onChange={updateForm}/>
                </div>
                <div className="AddCompany-Form-Field">
                    <label htmlFor="logoUrl">Logo</label>
                    <input type="text" name="logoUrl" id="logoUrl" value={formData.logoUrl} onChange={updateForm}/>
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddCompanyForm;