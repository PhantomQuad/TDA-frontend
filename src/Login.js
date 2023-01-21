import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import image from "./img/The-DevCademy-Logo-4.jpg";
import { ToastContainer, toast, Zoom } from "react-toastify";

function Login(props) {
  const [disabled, cDisabled] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    // console.log(`login input`, e.target.email.value, e.target.password.value);
    props.client
      .login(e.target.email.value, e.target.password.value)
      .then((response) => {
        console.log("response", response);
        cDisabled(false);
        props.loggedIn(response.data.token);
        props.handleShow();
      })
      .catch((err) => {
        const toastId = toast(
          "Sorry, the username does not exist or password is not right :(",
          {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );

        console.log(err);
        cDisabled(false);
      });
  };

  const loginParticipant = () => {
    setEmail(process.env.REACT_APP_LOGIN_1);
    setPassword(process.env.REACT_APP_PASSWORD);
    document.getElementById("login").classList.remove("button-orange");
    document.getElementById("login").classList.add("glow-animation");
    document.getElementById("login").classList.add("glow-animation");
  };

  const loginEmployer = () => {
    setEmail(process.env.REACT_APP_LOGIN_2);
    setPassword(process.env.REACT_APP_PASSWORD);
    document.getElementById("login").classList.remove("button-orange");
    document.getElementById("login").classList.add("glow-animation");
    document.getElementById("login").classList.add("glow-animation");
  };

  const loginAdmin = () => {
    setEmail(process.env.REACT_APP_LOGIN_3);
    setPassword(process.env.REACT_APP_PASSWORD);
    document.getElementById("login").classList.remove("button-orange");
    document.getElementById("login").classList.add("glow-animation");
    document.getElementById("login").classList.add("glow-animation");
  };

  return (
    <>
      {props.handleClose()}
      <div className="login-container">
        <Form className="login-frame" onSubmit={(e) => submitHandler(e)}>
          <Form.Group className="mb-3">
            <div id="title-login">
              Graduat<span style={{ color: "chocolate" }}>ê</span>s
            </div>
            <br />{" "}
            <div className="tda-logo">
              <img src={image} />
            </div>
          </Form.Group>
          <center>
            <Form.Group className="mb-3">
              <Form.Control
                style={{ width: "70%" }}
                type="email"
                name="email"
                placeholder="Email"
                id="loginput"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <Form.Control
                style={{ width: "70%" }}
                type="password"
                name="password"
                placeholder="Password"
                id="logpassword"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button
                type="submit"
                id="login"
                className="button-orange"
                disabled={disabled}
              >
                Login
              </Button>
              &nbsp;&nbsp;
              <Button variant="secondary" onClick={() => navigate("/register")}>
                Register
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button
                className="button-orange"
                disabled={disabled}
                onClick={() => loginParticipant()}
              >
                Login as Jobseeker
              </Button>
              &nbsp;&nbsp;
              <Button
                className="button-orange"
                disabled={disabled}
                onClick={() => loginEmployer()}
              >
                Login as Employer
              </Button>
              &nbsp;&nbsp;
              <Button
                className="button-orange"
                disabled={disabled}
                onClick={() => loginAdmin()}
              >
                Login as Admin
              </Button>
            </Form.Group>
          </center>
        </Form>
      </div>
      <ToastContainer theme="dark" position="top-center" transition={Zoom} />
    </>
  );
}

export default Login;
