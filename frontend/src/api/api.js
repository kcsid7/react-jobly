import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:5001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }


  // Get All Companies
  static async getAllCompanies() {
    let res = await this.request(`companies`);
    return res.companies
  }

  // Get All Users
  static async getAllUsers() {
    const res = await this.request(`users`);
    return res.users
  }


  // Get All Jobs
  static async getAllJobs() {
    try {
      let res = await axios.get(`${BASE_URL}/jobs`);
      return res.data
    } catch(e) {
      console.log(e);
    }
  }

  // Search for job by term
  static async searchForJobByTerm(term) {
    try {
      let res = await axios.get(`${BASE_URL}/jobs?title=${term}`);
      return res.data
    } catch(e) {
      console.log(e);
    }
  }

  // Get Job
  static async getJobDetails(jobId) {
    try {
      let res = await axios.get(`${BASE_URL}/jobs/${jobId}`)
      return res.data;
    } catch(e) {
      console.log("JoblyAPI - getJobDetails", e);
    }
  }

  // Auth - Login
  static async loginUser(data) {
    try {
      console.log("JoblyAPI - loginUser");
      const res = await this.request("auth/token", data, "post")
      return res.token;
    } catch(e) {
      console.log("JoblyAPI - loginUser error", e);
      throw e
    }
  }


  // Admin Add User
  static async adminAddUser(data) {
    try {
      console.log("JoblyAPI - adminAddUser");
      const res = await this.request("users", data, "post");
      return res
    } catch(e) {
      console.log("JoblyAPI - adminAddUser error", e)
    }
  }


  // Register User
  static async signupUser(data) {
    try {
      console.log("JoblyAPI - singupUser");
      const res = await this.request("auth/register", data, "post");
      return res.token;
    } catch(e) {
      console.log("JoblyAPI - signupUser error", e);
    }
  }

  // Get User
  static async getUser(username) {
    try {
      const res = await this.request(`users/${username}`)
      return res.user;
    } catch(e) {
      console.log("JoblyAPI - getUser error", e);
    }
  }

  // Apply To Job
  static async applyToJob(username, jobId) {
    try { 
      console.log("JoblyAPI - applyToJob");
      const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
      return res
    } catch(e) {
      console.log("JoblyAPI - applyToJob error", e)
    }
  }

  // Update Job
  static async updateJob(jobId, data) {
    try { 
      console.log("JoblyAPI - updateJob");
      const res = await this.request(`jobs/${jobId}`, data, "patch");
      return res.job
    } catch(e) {
      console.log("JoblyAPI - updateJob error", e)
    }
  }


  // Remove Job


  // Add Job
  static async addJob(jobData) {
    try { 
      console.log("JoblyAPI - addJob");
      const res = await this.request(`jobs`, jobData, "post");
      return res.job
    } catch(e) {
      console.log("JoblyAPI - addJob error", e)
    }
  }


  // Add Company
  static async addCompany(data) {
    try { 
      console.log("JoblyAPI - addCompany");
      const res = await this.request(`companies`, data, "post");
      return res
    } catch(e) {
      console.log("JoblyAPI - addCompany error", e)
    }
  }

  // Update Company
  static async updateCompany(handle, data) {
    try { 
      console.log("JoblyAPI - updateCompany");
      const res = await this.request(`companies/${handle}`, data, "patch");
      return res.company
    } catch(e) {
      console.log("JoblyAPI - updateCompany error", e)
    }
  }


  // Delete Company
  static async deleteCompany(handle) {
    try { 
      console.log("JoblyAPI - deleteCompany");
      const res = await this.request(`companies/${handle}`, {}, "delete");
      return res.deleted
    } catch(e) {
      console.log("JoblyAPI - deleteCompany error", e)
    }
  }



  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
