import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import image from "./img/The-DevCademy-Logo-4.jpg";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(props) {
  // console.log(`register props`, props);

  const navigate = useNavigate();
  const [disabled, cDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // async function registerUser(event) {
  //   event.preventDefault();
  //   const response = await fetch("http://localhost:3001/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //       // ifEmployer,
  //       // location,
  //     }),
  //   });
  // }

  //TODO DISABLED FOR DEMO
  // const registerUser = (e) => {
  //   e.preventDefault();
  //   props.client
  //     .register(
  //       e.target.email.value,
  //       e.target.password.value,
  //       e.target.fname.value,
  //       e.target.sname.value,
  //       e.target.location.value,
  //       e.target.company.value,
  //       e.target.industry.value
  //     )
  //     .then((response) => {
  //       console.log(response.data);

  //       const toastId = toast(response.data, {
  //         autoClose: 2000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //         progress: undefined,
  //       });
  //       // navigate("/");
  //     });
  // };

  // const ifEmployer = () => {
  //   if ((document.getElementById("employer-extras").style.display = "none")) {
  //     return fname, sname;
  //   } else {
  //     return company, industry;
  //   }
  // };

  const switchType = (whichForm) => {
    if (whichForm != null) {
      if (whichForm == "grad-form") {
        document.getElementById("employer-extras").style.display = "none";
        document.getElementById("employer-extras-2").style.display = "";
        cDisabled(false);
      } else {
        document.getElementById("employer-extras").style.display = "block";
        document.getElementById("employer-extras-2").style.display = "none";
        document.getElementById("fname").value = "";
        cDisabled(true);
      }
    }
  };

  return (
    <div className="login-container">
      <Form className="login-frame">
        {" "}
        {/* onSubmit={(e) => registerUser(e)} removed for demo*/}
        <center>
          <Form.Group className="mb-3">
            <div id="title-login">
              Graduat<span style={{ color: "chocolate" }}>ê</span>s
            </div>
            <br />{" "}
            <div className="tda-logo">
              <img src={image} />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" name="radio">
            <Button
              size="sm"
              variant="default"
              className="button-orange-outline"
              onClick={() => switchType("grad-form")}
            >
              Graduate
            </Button>
            &nbsp;&nbsp;
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => switchType("empl-form")}
            >
              Employer
            </Button>
          </Form.Group>
          <hr />

          <div id="grad-form">
            <Form.Group className="mb-3">
              <div id="employer-extras-2" style={{ display: "" }}>
                <Row>
                  <Col>
                    <Form.Control
                      type="name"
                      id="fname"
                      name="fname"
                      placeholder="First Name"
                      required
                      disabled={disabled}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="name"
                      name="sname"
                      placeholder="Last Name"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="location"
                      name="location"
                      placeholder="Location"
                    />
                  </Col>
                </Row>
                <br />
              </div>
              <div id="employer-extras" style={{ display: "none" }}>
                <Row>
                  <Col>
                    <Form.Control
                      type="company"
                      name="company"
                      placeholder="Company"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="industry"
                      name="industry"
                      placeholder="Industry"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="location"
                      name="location"
                      placeholder="Location"
                    />
                  </Col>
                </Row>
                <br />
              </div>
              <Row>
                <Col>
                  <Form.Control type="email" name="email" placeholder="Email" />
                </Col>
                <Col>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Col>
              </Row>
            </Form.Group>
            <br />
          </div>
          <Form.Group className="mb-3">
            <Button
              className="button-orange"
              ref={target}
              onClick={() => setShow(!show)}
            >
              {" "}
              {/*type="submit" removed for demo */}
              Register
            </Button>
            <Overlay target={target.current} show={show} placement="top">
              {(props) => (
                <Tooltip id="disabled-overlay-message" {...props}>
                  Disabled for this demo
                </Tooltip>
              )}
            </Overlay>
            &nbsp;&nbsp;
            <Button variant="secondary" onClick={() => navigate("/")}>
              Return to Login
            </Button>
          </Form.Group>
        </center>
      </Form>
      <ToastContainer theme="dark" position="top-center" transition={Zoom} />
    </div>
  );
}

export default Register;
