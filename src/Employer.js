import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import CreatableSelect from "react-select/creatable";
import { Link, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import toastr from "toastr";
import Login from "./Login";
import { BsGithub, BsLinkedin, BsCloudUpload } from "react-icons/bs";
import "./style.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

function Employer(props) {
  // console.log("Employer props", props);
  // console.log("Employer picture", props.profile.picture);
  const navigate = useNavigate();

  const { id } = useParams();
  props.users.map((current) => {
    if (current._id == id) {
      return props.cProfile(current);
    }
  });
  const [selectedPhoto, cSelectedPhoto] = useState();
  const [newPhoto, cNewPhoto] = useState(props.profile.picture);

  const [skills, setSkills] = useState();
  const [skilloptions, setSkillOptions] = useState([
    { value: "html", label: "HTML" },
    {
      value: "cascading style sheets (css)",
      label: "Cascading Style Sheets (CSS)",
    },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "javascript", label: "Javascript" },
    { value: "visual studio code", label: "Visual Studio Code" },
    { value: "debugging", label: "Debugging" },
    { value: "problem solving", label: "Problem Solving" },
    { value: "react.js", label: "React.js" },
    { value: "sass", label: "SASS" },
    { value: "api development", label: "API Development" },
    { value: "agile methodologies", label: "Agile Methodologies" },
    { value: "linux", label: "Linux" },
    { value: "github", label: "GitHub" },
    { value: "bash shell", label: "Bash Shell" },
    { value: "css flexbox", label: "CSS Flexbox" },
    { value: "regular expressions", label: "Regular Expressions" },
    {
      value: "object-oriented programming (oop)",
      label: "Object-Oriented Programming (OOP)",
    },
    { value: "test driven development", label: "Test Driven Development" },
    { value: "pair programming", label: "Pair Programming" },
    { value: "redux.js", label: "Redux.js" },
    { value: "express.js", label: "Express.js" },
    { value: "mongodb", label: "MongoDB" },
  ]);

  const handleSkillChange = useCallback(
    (inputValue) => setSkills(inputValue),
    []
  );

  const handleSkillCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setSkillOptions([...skilloptions, newValue]);
      setSkills([...skills, newValue]);
    },
    [skilloptions]
  );

  const changePhotoHandler = async (event) => {
    cSelectedPhoto(event.target.files[0]);
  };

  const submitPhoto = () => {
    // console.log(`picture attempt `, selectedPhoto);
    const getFormat = "." + selectedPhoto.name.split(".").pop();
    // console.log(`format attempt `, props.profile._id + getFormat);
    const newFileName = props.profile._id + getFormat;

    props.client.postImage(props.profile._id, selectedPhoto).then(() => {
      // console.log("getformat ", getFormat);
      cNewPhoto(newFileName);
      const toastId = toast(
        "Thanks, your photo has been uploaded, remember to update!",
        {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
      // console.log(`selected file`, selectedPhoto.name);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.client
      .updateEmployer(
        props.profile._id,
        e.target.company.value,
        e.target.industry.value,
        e.target.bio.value,
        e.target.linkedin.value,
        e.target.website.value,
        e.target.email.value,
        e.target.location.value,
        newPhoto,
        skills
      )
      .then(() => {
        const toastId = toast("Thanks, your profile has been updated.", {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
    // .then(() => {
    //   navigate(`/`);
    // });
  };

  useEffect(() => {
    setSkills(props.profile?.skills);
    props.cNaviShow("hidden");
  }, [props]);

  return (
    <>
      {props.token ? (
        <div className="profile-container">
          <br />
          <Card id="profileCards" className="view-container">
            <Form onSubmit={(e) => submitHandler(e)} className="formProfile">
              <div>
                <div id="col-1" style={{ position: "absolute" }}>
                  <div>
                    <img
                      src={url + `user/pic/` + props.profile.picture}
                      style={{ height: "8.2em", width: "9em" }}
                    />
                  </div>
                  <div style={{ marginLeft: "3.4em" }}>
                    <label
                      for="photo-fex"
                      className="button-orange-outline choose-file"
                      // onClick={document.getElementById("photo-fex").click}
                    >
                      Choose File
                    </label>
                    &nbsp;
                    <Button size="sm" variant="warning" onClick={submitPhoto}>
                      <BsCloudUpload />
                    </Button>
                  </div>
                </div>
                <div id="col-2">
                  <div id="view-name">
                    <Row>
                      <Col xs={3}></Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formBasicfName">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            name="company"
                            type="name"
                            placeholder="Name of your company"
                            defaultValue={props.profile?.company}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formBasicfName">
                          <Form.Label>Industry</Form.Label>
                          <Form.Control
                            name="industry"
                            type="name"
                            placeholder="Your industry"
                            defaultValue={props.profile?.industry}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={3}></Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            defaultValue={props.profile?.email}
                          />
                          <Form.Text className="text-muted">
                            We'll never share your email.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicLocation"
                        >
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            name="location"
                            type="name"
                            placeholder="Enter Location"
                            defaultValue={props.profile?.location}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicBio">
                  <Form.Label>Overview</Form.Label>
                  <Form.Control
                    name="bio"
                    type="text"
                    as="textarea"
                    placeholder="Details about your business"
                    rows={5}
                    defaultValue={props.profile?.bio}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSkills">
                  <Form.Label>Skills you desire</Form.Label>
                  {/* <Multi /> */}
                  <CreatableSelect
                    isClearable
                    value={skills}
                    options={skilloptions}
                    onChange={handleSkillChange}
                    onCreateOption={handleSkillCreate}
                    isMulti
                  />
                </Form.Group>
              </Row>

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPortfolio">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      name="website"
                      type="link"
                      placeholder="Enter Website"
                      defaultValue={props.profile?.portfolio}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicLinkedin">
                    <Form.Label>
                      <BsLinkedin /> Linkedin
                    </Form.Label>
                    <Form.Control
                      name="linkedin"
                      type="link"
                      placeholder="Enter Linkedin"
                      defaultValue={props.profile?.linkedin}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="forumUploadDoc">
                <Row style={{ display: "none" }}>
                  <Col>
                    <Form.Label>Upload Your Profile Photo</Form.Label>
                    <br />
                    <input
                      id="photo-fex"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={changePhotoHandler}
                    />{" "}
                  </Col>
                  <Col>
                    <Form.Label>
                      You must submit changes before you update.
                    </Form.Label>
                    <br />
                    <Button
                      variant="default"
                      className="button-orange-outline"
                      onClick={submitPhoto}
                    >
                      Submit
                    </Button>{" "}
                  </Col>
                </Row>
              </Form.Group>

              <Button variant="primary" type="submit">
                {" "}
                Update Profile{" "}
              </Button>
            </Form>
          </Card>
          <ToastContainer
            theme="dark"
            position="top-center"
            transition={Zoom}
          />
        </div>
      ) : (
        <Login client={props.client} loggedIn={props.loggedIn} />
      )}
    </>
  );
}

export default Employer;
