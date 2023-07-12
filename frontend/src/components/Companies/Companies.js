import React, { useState, useEffect } from "react";



// Components
import CompanyCard from "../CompanyCard/CompanyCard.js";

// API
import JoblyApi from "../../api/api.js";

// CSS
import "./Companies.css";


function Companies() {

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        async function getCompanies() {
            try {
                const result = await JoblyApi.getAllCompanies();
                setCompanies(result);
            } catch(e) {
                console.log("Get Companies Error", e)
            }
        }
        getCompanies();
    }, [])


    const companiesHTML = (compList) => {
        return (
            <div className="Companies">
                <h2>Company List</h2>
                <div className="Companies-List">
                    {
                    compList.map(c => <CompanyCard key={c.handle} name={c.name} handle={c.handle} logo={c.logoUrl} numEmployees={c.numEmployees}/>)
                    }
                </div>
            </div>
        )
    } 



    return (
        companies ? companiesHTML(companies) : <></>
    )

}

export default Companies