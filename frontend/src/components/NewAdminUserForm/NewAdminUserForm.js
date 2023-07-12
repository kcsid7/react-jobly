import React, {useContext} from "react";

import { Link } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";

import AppContext from "../../context/AppContext";

import JoblyApi from "../../api/api";


import "./NewAdminUserForm.css";

function NewAdminUserForm() {

    const { token, localUser } = useContext(AppContext);

    const initialData = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        isAdmin: false
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
            console.log("NewAdminUser - handleSubmit")
            JoblyApi.token = token;
            const res = await JoblyApi.adminAddUser(formData);
            resetForm(s => initialData); // Reset form data
            setError({message: `User ${res.user.username} added!`, type: "success"})

        } catch(e) {
            // resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="NewAdminUser">
            <h1>New User - Admin Only</h1>
            {
                errorMessage(error)
            }
            <form className="NewAdminUser-Form" onSubmit={handleSubmit}>
                <div className="NewAdminUser-Form-Field">
                    <label htmlFor="firstName">First Name</label>
                    <input required type="text" name="firstName" id="firstName" value={formData.firstName} onChange={updateForm}/>
                </div>
                <div className="NewAdminUser-Form-Field">
                    <label htmlFor="lastName">Last Name</label>
                    <input required type="text" name="lastName" id="lastName" value={formData.lastName} onChange={updateForm}/>
                </div>
                <div className="NewAdminUser-Form-Field">
                    <label htmlFor="username">Username</label>
                    <input required type="text" name="username" id="username" value={formData.username} onChange={updateForm}/>
                </div>
                <div className="NewAdminUser-Form-Field">
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" value={formData.password} onChange={updateForm}/>
                </div>
                <div className="NewAdminUser-Form-Field">
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" value={formData.email} onChange={updateForm}/>
                </div>
                <div className="NewAdminUser-Form-Field">
                    <label htmlFor="isAdmin">isAdmin</label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" value={formData.isAdmin} onChange={e => resetForm(s => ({...s, isAdmin: e.target.checked}))}/>
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default NewAdminUserForm;