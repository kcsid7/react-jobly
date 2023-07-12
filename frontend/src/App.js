import React, { useState, useContext } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import * as jose from "jose";


// Hooks
import useErrorState from "./hooks/useErrorState";
import useLocalStorage from "./hooks/useLocalStorage";

// Components
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import AlertBanner from "./components/utilComponents/AlertBanner/AlertBanner";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Jobs from "./components/Jobs/Jobs";
import Companies from "./components/Companies/Companies";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import UserProfile from "./components/UserProfile/UserProfile";


// Context

import AppContext from "./context/AppContext";


// API
import JoblyApi from "./api/api";

// Config File
import { USER_TOKEN, CUR_USER, CUR_ADMIN } from "./config";



import './App.css';
import UserList from "./components/UserList/UserList";
import JobSearch from "./components/JobSearch/JobSearch";

function App() {

  const navigate = useNavigate();

  const [token, setToken] = useLocalStorage(USER_TOKEN);
  const [localUser, setLocalUser] = useLocalStorage(CUR_USER);
  const [isAdmin, setIsAdmin] = useLocalStorage(CUR_ADMIN);



  /* 
  custom error hook state that resets the error to null after a given time
  this time also determines for how long this error will be displayed
  */
  const [error, setError] = useErrorState(5000);  // error : {messsage: "", type: ""}
  const errorMessage = (error) => {
      return error ?
      <>
          <AlertBanner width={70} message={error.message} type={error.type}/>
      </>
      : <></>
  } 



  async function login(loginData) {
    try {
      console.log("APP - Login")
      const result = await JoblyApi.loginUser(loginData); //Returns user token
      setToken(result);
      const {isAdmin, username} = jose.decodeJwt(result);
      setLocalUser(username);
      setIsAdmin(isAdmin);
      setError({message: "Login Successful", type: "success"})
      navigate(`/user/${username}`);
    } catch(e) {
      console.log("APP - Login - Error", e);
      throw e
    }

  }


  function logout() {
    console.log("Logout - App");
    setToken(null);
    setLocalUser(null);
    setIsAdmin(null);
    setError({message: "Logout Successful", type: "failure"})
    navigate("/");
  }


  async function signup(signupData) {
    try {
      console.log("APP - Signup")
      const result = await JoblyApi.signupUser(signupData); // Returns user token
      setToken(result);
      const {isAdmin, username} = jose.decodeJwt(result);
      setLocalUser(username);
      setIsAdmin(isAdmin);
      setError({message: "Welcome Signup Successful", type: "success"})
      navigate(`/user/${username}`);
    } catch(e) {
      console.log("APP - Signup - Error", e)

    }

  }


  return (
    <AppContext.Provider value={{ setError, localUser, token, isAdmin }}>
    <div className="App container">
      <Navbar logout={logout}/>
      { errorMessage(error) }
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/signup" element={<Signup signup={signup}/>} />
        <Route path="/login" element={<Login login={login}/>} />
        {/* <Route path="/jobs" element={<Jobs />} /> */}
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="users" element={<UserList />}/>
        <Route path="user/:username" element={<UserProfile />}/>
        {/* <Route path="/jobs/:jobId" element={<JobDetails />} /> */}
        {/* <Route path="/companies" element={<Companies />} /> */}
      </ Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
