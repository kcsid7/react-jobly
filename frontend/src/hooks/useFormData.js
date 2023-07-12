import React, {useState} from "react";


function useFormData(fieldObj) {

    const [formData, setFormData] = useState(fieldObj);
       
    const updateForm = (e) => {
        e.preventDefault();
        setFormData( data => ({
            ...data,
            [e.target.name]: e.target.value
        }))
    }

    return [formData, updateForm, setFormData]
}

export default useFormData;