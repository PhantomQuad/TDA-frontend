import axios from "axios";
const url = process.env.REACT_APP_API_URL;

export class ApiClient {
  constructor(token, employer, tda, email) {
    this.token = token;
  }

  apiCall(method, url, data) {
    console.log(url);
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.token,
      },
      data,
    }).catch((error) => {
      if (error.response.status == 403) {
        console.log("Uh-ohh, Login Error: ", error);
        this.logoutHandler();
        return Promise.reject;
      } else {
        throw error;
      }
    });
  }

  login(email, password) {
    // console.log(`apiclient login`,username,password)
    return this.apiCall("post", `${url}auth`, {
      email: email,
      password: password,
    });
  }

  register(email, password, fname, sname, location, company, industry) {
    return this.apiCall("post", `${url}register`, {
      email: email,
      password: password,
      fname: fname,
      sname: sname,
      location: location,
      company: company,
      industry: industry,
    });
  }

  getUsers() {
    return this.authenticatedCall("get", url);
  }

  deleteUsers(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateUsers(
    id,
    fname,
    sname,
    bio,
    cv,
    github,
    linkedin,
    portfolio,
    available,
    availabledate,
    email,
    location,
    picture,
    course,
    skills
  ) {
    return this.authenticatedCall("put", `${url}${id}`, {
      fname,
      sname,
      bio,
      cv,
      github,
      linkedin,
      portfolio,
      available,
      availabledate,
      email,
      location,
      picture,
      course,
      skills,
    });
  }

  updateEmployer(
    id,
    company,
    industry,
    bio,
    linkedin,
    portfolio,
    email,
    location,
    picture,
    skills
  ) {
    return this.authenticatedCall("put", `${url}employer/${id}`, {
      company,
      industry,
      bio,
      linkedin,
      portfolio,
      email,
      location,
      picture,
      skills,
    });
  }

  postImage(name, file) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("myfile", file);
    console.log(formData);
    return this.authenticatedCall("post", `${url}user/pic/new`, formData);
  }

  postCv(name, file) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("myfile", file);
    console.log(formData);
    return this.authenticatedCall("post", `${url}user/cv/new`, formData);
  }

  sendTheMail(from, to, company, subject, text) {
    return this.apiCall("post", `${url}sendmail`, {
      from,
      to,
      company,
      subject,
      text,
    });
  }
}
