import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import AppContext from "../../context/AppContext";

import JoblyApi from "../../api/api";

import "./UserList.css";

function UserList() {

    const { token, localUser, setError, isAdmin } = useContext(AppContext);

    const navigate = useNavigate();

    const [ users, setUsers ] = useState(null);

    useEffect(() => {

        if (!isAdmin) {
            setError({message: "Unauthorized", type: "warning"});
            navigate("/")
        }

        async function getAllUsers(token) {
            JoblyApi.token = token;
            const result = await JoblyApi.getAllUsers();
            console.log(result);
            setUsers(result)
        }

        if (token) getAllUsers(token);
    }, [])


    const userListHTML = (users) => {
        return (
            <>
                <div className="UserList">
                <h1>User List</h1>
                <table className="UserList-List">
                    <thead className="UserList-List-Head">
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>isAdmin</th>
                        </tr>
                    </thead>
                    <tbody className="UserList-List-Body">
                    {
                        users.map(u => {
                            return (
                                <tr key={u.username} className="UserList-List-Item">
                                    <td>{u.firstName} {u.lastName}</td>
                                    <td>{u.username}</td>
                                    <td>{u.isAdmin ? "Admin" : "Not Admin"}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                </div>
            </>
        )
    }

    return (
        <>
        {users ? userListHTML(users) : <></>}
        </>
    )
}

export default UserList;