import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import Employer from "./Employer";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import NaviBar from "./NaviBar";
import View from "./View";
import Chart from "./Chart";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactForm from "./components/ContactForm";

import image from "./img/The-DevCademy-Logo-4.jpg";
import "./style.css";

const App = () => {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const [user, cUser] = useState([]);
  const [profile, cProfile] = useState([]);
  const [users, cUsers] = useState([]);
  const [skillUsers, cSkillUsers] = useState([]);
  const [show, setShow] = useState(true);

  const [naviShow, cNaviShow] = useState("hidden");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loggedIn = (newToken) => {
    window.localStorage.setItem("token", newToken);
    changeToken(newToken);
  };

  const logOut = () => {
    window.localStorage.removeItem("token");
    changeToken("");
  };

  const client = new ApiClient(token);

  const buildsearch = (e) => {
    e.preventDefault();
    cSkillUsers([]);
    // console.log(`Searched for`, e.target.search.value);
    // console.log(`datas`, datas);
    // console.log(`searchbar props`, e.target.search.id);
    switch (e.target.search.id) {
      case "email":
        var filtered = users.filter((current) =>
          current.email
            .toLowerCase()
            .includes(e.target.search.value.toLowerCase())
        );
        cUsers(filtered);
        break;
      case "name":
        var filtered = users.filter((current) =>
          current.fname
            .toLowerCase()
            .includes(e.target.search.value.toLowerCase())
        );
        cUsers(filtered);
        break;
      case "location":
        var filtered = users.filter((current) =>
          current.location
            .toLowerCase()
            .includes(e.target.search.value.toLowerCase())
        );
        cUsers(filtered);
        break;
      // SKILLS SEARCH /! IN PROGRESS
      case "skill":
        users.map((current) => {
          current.skills.map((current1) => {
            if (current1.value.includes(e.target.search.value.toLowerCase())) {
              // console.log(`current search`, current);
              skillUsers.push(current);
            }
          });
        });
        console.log(`current search`, skillUsers);
        cUsers(skillUsers);
        break;
    }
  };

  const refreshList = () => {
    client.getUsers().then((response) => cUsers(response.data));
  };

  const refreshUser = () => {
    users.map((current) => {
      // console.log(`users map`,current)
      if (current.token == token) {
        // console.log(`current user.role=`,current.role)
        return cUser(current);
      }
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    refreshUser();
  }, [users]);

  return (
    <>
      <BrowserRouter>
        <NaviBar
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          profile={profile}
          cProfile={cProfile}
          user={user}
          users={users}
          buildsearch={buildsearch}
          refreshList={refreshList}
          logOut={() => logOut()}
          naviShow={naviShow}
          cNaviShow={cNaviShow}
        />
        <Container className="app">
          <Routes>
            <Route path="/chart" element={<Chart cNaviShow={cNaviShow} />} />
            <Route path="/register" element={<Register client={client} />} />
            <Route
              path="/contact"
              element={<ContactForm client={client} profile={profile} />}
            />

            <Route
              path="/profile/:id"
              element={
                user.role == "employer" ? (
                  <Employer
                    token={token}
                    user={user}
                    profile={profile}
                    users={users}
                    cProfile={cProfile}
                    client={client}
                    loggedIn={loggedIn}
                    cNaviShow={cNaviShow}
                  />
                ) : user.role == "participant" || user.role == "tda" ? (
                  <Profile
                    profile={profile}
                    cProfile={cProfile}
                    token={token}
                    users={users}
                    user={user}
                    client={client}
                    loggedIn={loggedIn}
                    cNaviShow={cNaviShow}
                  />
                ) : (
                  "Loading...."
                )
              }
            />
            <Route
              path="/view/:id"
              element={
                user.role == "employer" ||
                user.role == "participant" ||
                user.role == "tda" ? (
                  <View
                    profile={profile}
                    cProfile={cProfile}
                    token={token}
                    users={users}
                    user={user}
                    client={client}
                    loggedIn={loggedIn}
                    cNaviShow={cNaviShow}
                  />
                ) : (
                  "Loading...."
                )
              }
            />
            <Route
              path="/employer/:id"
              element={
                user.role == "employer" || user.role == "tda" ? (
                  <Employer
                    token={token}
                    profile={profile}
                    cProfile={cProfile}
                    user={user}
                    users={users}
                    client={client}
                    loggedIn={loggedIn}
                    cNaviShow={cNaviShow}
                  />
                ) : (
                  <Dashboard
                    profile={profile}
                    cProfile={cProfile}
                    client={client}
                    logOut={() => logOut()}
                    user={user}
                    users={users}
                    refreshList={refreshList}
                    buildsearch={buildsearch}
                    cNaviShow={cNaviShow}
                  />
                )
              }
            />
            <Route
              index
              element={
                token ? (
                  <Dashboard
                    profile={profile}
                    cProfile={cProfile}
                    client={client}
                    logOut={() => logOut()}
                    user={user}
                    users={users}
                    refreshList={refreshList}
                    buildsearch={buildsearch}
                    cNaviShow={cNaviShow}
                  />
                ) : (
                  <Login
                    handleShow={handleShow}
                    handleClose={handleClose}
                    client={client}
                    loggedIn={loggedIn}
                  />
                )
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
      <footer className="footer">
        <h2>
          <span className="tda-logo-footer">
            <img src={image} />
          </span>
          &nbsp;Graduat<span style={{ color: "chocolate" }}>ê</span>s
        </h2>
        Bradley Ashton -{" "}
        <a
          href="https://github.com/enitial"
          target="_new"
          className="footer-links"
        >
          @eNITIAL
        </a>
        <br /> Nathan Anderson -{" "}
        <a
          href="https://github.com/PhantomQuad"
          target="_new"
          className="footer-links"
        >
          @PhantomQuad
        </a>
      </footer>
    </>
  );
};

export default App;
