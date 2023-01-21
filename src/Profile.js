import React, { useState, useEffect, useCallback } from "react";
import CreatableSelect from "react-select/creatable";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Login from "./Login";
import { Link, useParams } from "react-router-dom";
import { BsGithub, BsLinkedin, BsSlack, BsCloudUpload } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";
import DatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = process.env.REACT_APP_PUBLIC_URL;
const urlb = process.env.REACT_APP_API_URL;

function Profile(props) {
  console.log(`profile props`, props);
  // console.log(`profile pic`, props.profile.picture);
  const [availableDate, cAvailableDate] = useState(props.profile.availabledate);
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

  const [selectedPhoto, cSelectedPhoto] = useState();
  const [newPhoto, cNewPhoto] = useState(props.profile.picture);

  const [selectedCv, cSelectedCv] = useState(props.profile.cv);

  const [courseDate, setCourseDate] = useState(new Date());
  const [courseName, setCourseName] = useState();
  const [courseSelect, setCourseSelect] = useState([
    { value: "web", label: "web" },
  ]);

  const handleSkillChange = useCallback(
    (inputValue) => setSkills(inputValue),
    []
  );

  const handleCourseChange = useCallback(
    (inputValue) => setCourseSelect(inputValue),
    []
  );

  const handleCourseCreate = () => {
    const newwValue = {
      key: Date.now(),
      value:
        courseName.label.toLowerCase() +
        " " +
        moment(courseDate).format("MMMM YYYY"),
      label: courseName.label + " " + moment(courseDate).format("MMMM YYYY"),
    };
    setCourseSelect([...courseSelect, newwValue]);
    // console.log(`full course output`, courseSelect);
  };

  const handleSkillCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setSkillOptions([...skilloptions, newValue]);
      setSkills([...skills, newValue]);
    },
    [skilloptions]
  );

  // const [courseVal, setCourseValue] = useState({
  //   label: "June 2021",
  //   value: 0,
  // });
  // const handleCourseChange = (e) => {
  //   // console.log(`e = `, e)
  //   setCourseValue(e);
  // };

  const { id } = useParams();
  props.users.map((current) => {
    if (current._id == id) {
      return props.cProfile(current);
    }
  });

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

  const changeCvHandler = async (event) => {
    cSelectedCv(event.target.files[0]);
  };

  const submitCv = () => {
    // console.log(`picture attempt `, selectedPhoto);
    const getFormat = "." + selectedCv.name.split(".").pop();
    // console.log(`format attempt `, props.profile._id + getFormat);
    const newFileName = props.profile._id + getFormat;

    props.client.postCv(props.profile._id, selectedCv).then(() => {
      // console.log("getformat ", getFormat);
      cSelectedCv(newFileName);
      const toastId = toast(
        "Thanks, your CV has been uploaded, remember to update!",
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

  const courseNameOptions = [
    {
      label: "Software Developer",
      value: "web",
    },
    {
      label: "Data Science",
      value: "data",
    },
  ];

  // const setSelectVal = () => {
  //   const tstVal = props.profile?.course;
  //   const typeOf = typeof tstVal;
  //   // console.log(`tstVal `, tstVal)
  //   // console.log(typeOf)

  //   return tstVal;
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    props.client
      .updateUsers(
        props.profile._id,
        e.target.fname.value,
        e.target.sname.value,
        e.target.bio.value,
        selectedCv,
        e.target.github.value,
        e.target.linkedin.value,
        e.target.portfolio.value,
        e.target.available.checked,
        availableDate,
        e.target.email.value,
        e.target.location.value,
        newPhoto,
        courseSelect,
        skills
      )
      .then(() => {
        const toastId = toast("Thanks, your profile has been updated.", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    // updateCourseDets();
    setSkills(props.profile.skills);
    setCourseSelect(props.profile.course);
    props.cNaviShow("hidden");
  }, [props]);

  return (
    <div className="profile-container">
      <br />

      {props.token ? (
        <div className="card profile-padding">
          <Form onSubmit={(e) => submitHandler(e)} className="formProfile">
            <div>
              <div id="col-1" style={{ position: "absolute" }}>
                <div>
                  <img
                    src={urlb + `user/pic/` + props.user.picture}
                    style={{
                      height: "8.5em",
                      width: "9em",
                      marginLeft: "3em",
                      border: "1px solid rgba(0, 0, 0, 0.225)",
                    }}
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
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          name="fname"
                          type="name"
                          placeholder="Your first name"
                          defaultValue={props.profile?.fname}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicfName">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                          name="sname"
                          type="name"
                          placeholder="Your surname"
                          defaultValue={props.profile?.sname}
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

            <Form.Group className="mb-3" controlId="formBasicBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                name="bio"
                type="text"
                as="textarea"
                placeholder="Tell us about yourself."
                rows={5}
                defaultValue={props.profile?.bio}
              />
            </Form.Group>

            <Row>
              <Form.Group className="mb-3" controlId="formBasicSkills">
                <Form.Label>Skills</Form.Label>
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
            <div className="bootcamp-profile">
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="formBasicCourse">
                    <Form.Label>Bootcamp Name</Form.Label>
                    <Select
                      isClearable
                      // value={skills}
                      options={courseNameOptions}
                      onChange={(course) => setCourseName(course)}
                      style={{ width: "100%" }}
                      // onCreateOption={handleSkillCreate}
                      // isMulti
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCourse">
                    <Form.Label>Bootcamp Start Date</Form.Label>
                    <span style={{ display: "flex" }}>
                      <DatePicker
                        className="datepicker-select"
                        selected={courseDate}
                        defaultValue={"Choose date"}
                        placeholderText={"Choose date"}
                        // onSelect={handleCourseSelect}
                        dateFormat="MMMM yyyy"
                        onChange={(date) => setCourseDate(date)}
                      />
                      <Col xs={4}>
                        <Button
                          className="button-orange"
                          variant="primary"
                          onClick={handleCourseCreate}
                          // style={{ border: "1px solid rgba(255, 255, 255.125)" }}
                        >
                          <MdCheckCircle /> Add course
                        </Button>
                      </Col>
                    </span>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formCourses">
                  <Form.Label>Attended Courses</Form.Label>
                  <CreatableSelect
                    isClearable={false}
                    placeholder="Courses will display here"
                    value={courseSelect}
                    // options={skilloptions}
                    onChange={handleCourseChange}
                    isMulti
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                      Menu: () => null,
                    }}
                  />
                </Form.Group>
              </Row>
            </div>
            <br />

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group> */}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPortfolio">
                  <Form.Label>Portfolio</Form.Label>
                  <Form.Control
                    name="portfolio"
                    type="link"
                    placeholder="Enter Website"
                    defaultValue={props.profile?.portfolio}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicGithub">
                  <Form.Label>
                    <BsGithub /> Github
                  </Form.Label>
                  <Form.Control
                    name="github"
                    type="link"
                    placeholder="Enter Github"
                    defaultValue={props.profile?.github}
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
            <Form.Group className="mb-3" controlId="forumUploadDoc">
              <Row>
                <Col>
                  <Form.Label>Upload Your CV</Form.Label>
                  <br />
                  <Form.Control
                    type="file"
                    accept=".doc, .docx, .pdf"
                    onChange={changeCvHandler}
                  />
                </Col>
                <Col>
                  <Form.Label>
                    You must submit changes before you update.
                  </Form.Label>
                  <br />
                  <Button
                    variant="default"
                    className="button-orange-outline"
                    onClick={submitCv}
                  >
                    Submit
                  </Button>{" "}
                </Col>
              </Row>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Are you available for hire?</Form.Label>
              <Row className="skill-badges card-text">
                <Col xs={9}>
                  <b>Warning:</b> Changing this setting will permanently
                  re-order your place in the dashboard.
                  <br />
                  Employers will see others before you therefore reducing your
                  chance at being contacted.
                </Col>
                <Col>
                  <Form.Check
                    name="available"
                    type="checkbox"
                    label="Yes, I am AVAILABLE."
                    defaultChecked={props.profile?.available}
                    onClick={() => cAvailableDate(Date.now())}
                  />
                </Col>
              </Row>
            </Form.Group>
            <hr />
            <center>
              <Button className="button-orange" variant="primary" type="submit">
                {" "}
                Update Profile{" "}
              </Button>
            </center>
          </Form>
        </div>
      ) : (
        <Login client={props.client} loggedIn={props.loggedIn} />
      )}
      <br />
      <ToastContainer theme="dark" position="bottom-center" transition={Zoom} />
    </div>
  );
}

export default Profile;
