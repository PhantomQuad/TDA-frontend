import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Login from "./Login";
import CreatableSelect from "react-select/creatable";
import { BsGithub, BsLinkedin, BsShareFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function View(props) {
  // console.log(`Profile props`, props.token);
  // console.log("View props: ", props);
  // console.log("props.user.email", props.user.email)
  // console.log("available?", props.user.available)

  // const getViewProfile = (id) => {
  //   props.client.getUser(id).then((response) => console.log(`response data`, response.data));//cUsers(response.data));
  // const result = (document.getElementByID("searchb").style.display = "none");
  // };
  const { id } = useParams();
  const url = `${process.env.REACT_APP_PUBLIC_URL}view/`;
  const burl = process.env.REACT_APP_API_URL;

  const github = <BsGithub /> && "Git";

  // console.log("View Params: ", id)

  // const chooseProfile = () => {
  props.users.map((current) => {
    // console.log(`users map`,current)
    if (current._id == id) {
      // console.log(`current user.role=`,current.role)
      return props.cProfile(current);
    }
  });
  // }

  // const chooseProfile = () => {
  //   if (props.profile=="") {
  //     props.cProfile(props.user)
  //   }

  //     }

  const checkFile = (file, label, fullurl) => {
    if (file !== "") {
      // console.log(`label `, label);

      const GHret =
        label == "Github" ? (
          <BsGithub />
        ) : label == "Linkedin" ? (
          <BsLinkedin />
        ) : null;
      // console.log(`this `, GHret);

      return (
        <Col name="formBasicSocial">
          <Button
            size="sm"
            title={file}
            variant="default"
            className="button-orange-outline"
            style={{ width: "100%" }}
            onClick={() => window.open(fullurl, "_blank").focus()}
          >
            {GHret} {label}
          </Button>
        </Col>
      );
    }
  };

  const checkCoursesRole = () => {
    if (props.profile?.role === "employer") {
      return;
    } else {
      return (
        <Row>
          <Form.Label>My Courses</Form.Label>
          <Select
            value={props.profile?.course}
            isMulti
            placeholder="No courses."
            isDisabled={true}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
              Menu: () => null,
              MultiValueRemove: () => null,
            }}
          />{" "}
        </Row>
      );
    }
  };

  const checkRoleType = () => {
    if (props.profile?.role === "employer") {
      return <b>{props.profile?.company}</b>;
    } else {
      return (
        <span>
          {props.profile?.fname} {props.profile?.sname}
        </span>
      );
    }
  };

  const SkillsIf = () => {
    if (props.profile?.role !== "employer") {
      return "My Skills";
    } else {
      return "Skills we desire";
    }
  };

  const contactPerm = () => {
    if (props.user.role == "employer" || props.user.role == "tda") {
      return (
        <Form.Group className="mb-3" controlId="contactPerm">
          <hr />
          <Button
            variant="primary"
            className="button-orange"
            as={Link}
            to="/contact"
          >
            Contact
          </Button>
        </Form.Group>
      );
    }
  };

  const findWebsite = () => {
    if (props.profile?.portfolio !== "") {
      return (
        <div>
          <h5>
            Website:{" "}
            <a href={props.profile?.portfolio}>{props.profile?.portfolio}</a>
          </h5>
        </div>
      );
    }
  };

  useEffect(() => {
    props.cNaviShow("hidden");
  }, []);

  console.log(`view props: `, props.profile);

  return (
    <center>
      {props.token ? (
        <div className="profile-container">
          <br />
          <Card id="profileCards" className="view-container">
            <Form className="formProfile">
              {/* <Form.Header className="view-head"> */}
              <Row>
                <center>
                  <div id="view-head">
                    <div id="col-1">
                      <img
                        src={burl + `user/pic/` + props.profile?.picture}
                        className="view-container"
                      />
                    </div>
                    <div id="col-2">
                      <div id="view-name">
                        <Form.Group className="share-icons">
                          <Button
                            className="button-orange"
                            onClick={() => {
                              navigator.clipboard
                                .writeText(url + id)
                                .then(() => {
                                  const toastId = toast(
                                    "URL copied to clipboard.",
                                    {
                                      autoClose: 2000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    }
                                  );
                                });
                            }}
                          >
                            <BsShareFill />
                          </Button>
                        </Form.Group>
                        <br />

                        <h1>{checkRoleType(props)}</h1>
                        <h5>Location: {props.profile?.location}</h5>
                        {props.profile?.role == "employer"
                          ? findWebsite(props)
                          : null}
                      </div>
                    </div>
                  </div>
                </center>
              </Row>
              <br />
              {/* HEADER FINISHES */}
              <Form.Group className="mb-3" controlId="formBasicBio">
                <Form.Label>About</Form.Label>
                <Form.Control
                  readOnly
                  name="bio"
                  type="text"
                  as="textarea"
                  placeholder="Empty."
                  rows={5}
                  value={props.profile?.bio}
                />
              </Form.Group>
              <Form.Group controlId="multis">
                <Row>
                  <Form.Label>{SkillsIf(props)}</Form.Label>
                  <Select
                    value={props.profile?.skills}
                    isMulti
                    isDisabled={true}
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                      Menu: () => null,
                      MultiValueRemove: () => null,
                    }}
                  />
                </Row>
                <br />
                {checkCoursesRole(props)}
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group> */}
              <hr />{" "}
              <Row className="view-links-container">
                {checkFile(
                  props.profile?.cv,
                  "Download CV",
                  burl + `user/cv/` + props.profile?.cv
                )}
                {checkFile(
                  props.profile?.portfolio,
                  "Portfolio",
                  props.profile?.portfolio
                )}
                {checkFile(
                  props.profile?.github,
                  "Github",
                  props.profile?.github
                )}
                {checkFile(
                  props.profile?.linkedin,
                  "Linkedin",
                  props.profile?.linkedin
                )}
              </Row>
              {contactPerm(props)}
            </Form>
          </Card>
        </div>
      ) : (
        <Login client={props.client} loggedIn={props.loggedIn} />
      )}
      <ToastContainer theme="dark" position="bottom-center" />
      <br />
    </center>
  );
}

export default View;
