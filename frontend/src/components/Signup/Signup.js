import React from "react";

import { Link } from "react-router-dom";

import useFormData from "../../hooks/useFormData";
import useErrorState from "../../hooks/useErrorState";

import AlertBanner from "../utilComponents/AlertBanner/AlertBanner";


import "./Signup.css";

function Signup({signup}) {

    const initialData = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
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
            <AlertBanner width={70} message={error.response.data.message} type="failure"/>
        </>
        : <></>
    }


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            await signup(formData);
            resetForm(s => initialData); // Reset form data

        } catch(e) {
            // resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="Signup">
            <h1>Signup</h1>
            {
                errorMessage(error)
            }
            <form className="Signup-Form" onSubmit={handleSubmit}>
                <div className="Signup-Form-Field">
                    <label htmlFor="firstName">First Name</label>
                    <input required type="text" name="firstName" id="firstName" value={formData.firstName} onChange={updateForm}/>
                </div>
                <div className="Signup-Form-Field">
                    <label htmlFor="lastName">Last Name</label>
                    <input required type="text" name="lastName" id="lastName" value={formData.lastName} onChange={updateForm}/>
                </div>
                <div className="Signup-Form-Field">
                    <label htmlFor="username">Username</label>
                    <input required type="text" name="username" id="username" value={formData.username} onChange={updateForm}/>
                </div>
                <div className="Signup-Form-Field">
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="password" value={formData.password} onChange={updateForm}/>
                </div>
                <div className="Signup-Form-Field">
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" value={formData.email} onChange={updateForm}/>
                </div>
                <button disabled={!Object.values(formData).every(d => d !== "")}>Signup</button>
            </form>
        </div>
    )
}

export default Signup;