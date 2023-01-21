import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Permissions from "./components/FilePermissions";
import ContactForm from "./components/ContactForm";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import {
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlineOtherHouses,
  MdCode,
  MdRefresh,
  MdLocationPin,
} from "react-icons/md";

import moment from "moment";
import "./style.css";
import {
  BsLinkedin,
  BsGithub,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsFillEnvelopeFill,
  BsTrashFill,
  BsCursor,
  BsCurrencyBitcoin,
  BsStarFill,
} from "react-icons/bs";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { MdOutlineEventAvailable, MdRotateLeft } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
const burl = process.env.REACT_APP_API_URL;

function Dashboard(props) {
  // console.log("Dashboard props: ", props);

  let navigate = useNavigate();

  const [theshow, cTheShow] = useState(true);

  useEffect(() => {
    props.refreshList();
    props.cNaviShow("visible");
  }, []);

  const multiSelectStyles = {
    control: (base, state) => ({
      ...base,
      "&:hover": { borderColor: "chocolate" }, // border style on hover
      border: "1px solid chocolate", // default border color
      boxShadow: "none", // no box-shadow
      color: "red",
      padding: ".5em",
    }),
  };

  // const isAvailable = (current) => {
  //   if (current.role == "employer") {
  //     return <span className="ad-employer">EMPLOYER</span>;
  //   } else {
  //     if (current.available == false) {
  //       return <span className="ad-not-available">HIRED</span>;
  //     }
  //   }
  // };

  const isAvailable = (current) => {
    if (current.role == "employer") {
      return (
        <div className="status-shape-employer">
          <AiFillSafetyCertificate /> EMPLOYER
        </div>
      );
    } else {
      if (current.available == false) {
        return (
          <div className="status-shape">
            &nbsp;
            <BsStarFill /> HIRED
          </div>
        );
      }
    }
  };

  const industryOrNotLabel = (current) => {
    if (current.role == "employer") {
      return "Industry:";
    } else {
      return "Available Since:";
    }
  };

  const industryOrNot = (current) => {
    if (current.role == "employer") {
      return (
        <span style={{ float: "right", fontWeight: "bold" }}>
          {current.industry}
        </span>
      );
    } else {
      return (
        <span style={{ float: "right", fontWeight: "bold" }}>
          {moment(current.availabledate).format("DD MMMM YYYY")}
        </span>
      );
    }
  };

  const filterProfile = (data) => {
    let theProfile = props.users.filter((current) =>
      current.email.toLowerCase().includes(data)
    );
    props.cProfile(theProfile[0]);
    // console.log(`profile being passed`,theProfile);
    navigate(`/view/${theProfile[0]._id}`);
  };

  const buildcards = () => {
    if (props.user.role == "employer") {
      return props.users
        .sort((a) =>
          a.location.toUpperCase() !== props.user.location.toUpperCase()
            ? 1
            : -1
        )
        .sort((b, c) =>
          new Date(b.availabledate) < new Date(c.availabledate) ? -1 : 1
        )
        .map((current) =>
          current.available == false ? null : (
            <Card key={current._id} id="profileCards" className="ad-container">
              <Card.Header>
                <Card.Text as="h1">
                  <div className="avatar-container">
                    <img src={burl + `user/pic/` + current.picture} />
                  </div>
                </Card.Text>
                <Card.Text className="available-indicator float-right">
                  {isAvailable(current)}
                </Card.Text>
              </Card.Header>
              <Card.Text
                className="dash-names"
                onClick={() => filterProfile(current.email)}
              >
                {current.role == "employer"
                  ? current.company
                  : current.fname + " " + current.sname}
              </Card.Text>
              <br />
              <Card.Text className="dash-location">
                <Form.Group className="mb-3">
                  Location:
                  <span style={{ float: "right", fontWeight: "bold" }}>
                    {current.location}
                  </span>
                  <hr />
                </Form.Group>
                <Form.Group className="mb-3">
                  {industryOrNotLabel(current)}
                  {industryOrNot(current)}
                </Form.Group>
              </Card.Text>
              <Select
                value={current?.skills}
                isMulti
                styles={multiSelectStyles}
                isDisabled={true}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                  Menu: () => null,
                  MultiValueRemove: () => null,
                }}
              />{" "}
              <div style={{ height: "10px" }}></div>
              <Permissions
                refreshList={props.refreshList}
                client={props.client}
                user={props.user}
                current={current}
                profile={props.profile}
                cProfile={props.cProfile}
                users={props.users}
              />
            </Card>
          )
        );
    } else if (props.user.role == "tda" || props.user.role == "participant") {
      return props.users.map((current) => {
        let skillsList = current?.skills.map((skills) => {
          return <span className="skillsList">{skills.label}</span>;
        });

        return (
          <>
            <Card key={current._id} id="profileCards" className="ad-container">
              <Card.Header className="ad-userdetails">
                <Card.Text as="h1">
                  <div className="avatar-container">
                    <img src={burl + `user/pic/` + current.picture} />
                  </div>
                </Card.Text>
                <Card.Text className="available-indicator  float-right">
                  {isAvailable(current)}
                </Card.Text>
              </Card.Header>
              <Card.Text
                className="dash-names"
                onClick={() => filterProfile(current.email)}
              >
                {current.role == "employer"
                  ? current.company
                  : current.fname + " " + current.sname}
              </Card.Text>
              <br />
              <Card.Text className="dash-location">
                <Form.Group className="mb-3">
                  Location:
                  <span style={{ float: "right", fontWeight: "bold" }}>
                    {current.location}
                  </span>
                  <hr />
                </Form.Group>
                <Form.Group className="mb-3">
                  {industryOrNotLabel(current)}
                  {industryOrNot(current)}
                </Form.Group>
              </Card.Text>
              <Permissions
                refreshList={props.refreshList}
                client={props.client}
                user={props.user}
                current={current}
                profile={props.profile}
                cProfile={props.cProfile}
                users={props.users}
              />
              <Select
                value={current?.skills}
                isMulti
                isDisabled={true}
                styles={multiSelectStyles}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                  Menu: () => null,
                  MultiValueRemove: () => null,
                }}
              />{" "}
            </Card>
          </>
        );
      });
    } else {
      <b>"Loading......"</b>;
    }
  };

  return (
    <>
      <br />
      <div className="body-container">{buildcards()}</div>
    </>
  );
}
export default Dashboard;
