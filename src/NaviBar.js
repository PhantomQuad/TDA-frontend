import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate, Link, useNavigate, NavLink } from "react-router-dom";
import {
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlineOtherHouses,
  MdCode,
  MdRefresh,
  MdLocationPin,
  MdAdminPanelSettings,
} from "react-icons/md";
import { BsFillNutFill } from "react-icons/bs";
const url = process.env.REACT_APP_API_URL;

function NaviBar(props) {
  // console.log(`navibar props`, props);

  const [searchVal, setSearchValue] = useState({ value: "email" });
  const [hideStats, cHideStats] = useState("hidden");
  const handleSearchChange = (e) => {
    // console.log(`e = `, e)
    setSearchValue(e);
    props.refreshList();
  };

  const checkRole = () => {
    if (props.user.role == "tda") {
      cHideStats("visible");
    }
  };

  const searchCrit = [
    {
      value: "email",
      label: [<MdOutlineEmail key="crit-email" />, "\xa0\xa0\xa0\xa0", "Email"],
    },
    {
      value: "name",
      label: [
        <MdDriveFileRenameOutline key="crit-name" />,
        "\xa0\xa0\xa0\xa0",
        "Name",
      ],
    },
    {
      value: "location",
      label: [
        <MdOutlineOtherHouses key="crit-location" />,
        "\xa0\xa0\xa0\xa0",
        "Location",
      ],
    },
    {
      value: "skill",
      label: [<MdCode key="crit-skill" />, "\xa0\xa0\xa0\xa0", "Skill"],
    },
  ];

  useEffect(() => {
    checkRole();
  }, [props]);

  let theview = `/view/${props.user._id}`;
  let theprofile = `/profile/${props.user._id}`;
  let thestats = `/chart/`;

  const buildNavi = () => {
    return props.show == true ? (
      <Navbar bg="light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Graduat<span style={{ color: "chocolate" }}>ê</span>s
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Nav.Link as={Link} to="/" style={{ marginTop: "4px" }}>
                Dashboard
              </Nav.Link> */}
              <Nav.Link as={Link} to={theprofile}>
                {" "}
                <img
                  src={url + `user/pic/` + props.user.picture}
                  className="nav-picture"
                />{" "}
              </Nav.Link>
              <NavDropdown
                title={props.user.email}
                id="navbarScrollingDropdown"
                style={{ marginTop: "4px" }}
              >
                <NavDropdown.Item as={Link} to={theprofile}>
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={theview}>
                  View Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => props.logOut()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Nav.Link className="nav-location" as={Link} to={theprofile}>
                <MdLocationPin /> {props.user.location}
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link
                className="nav-location"
                as={Link}
                to={thestats}
                style={{ visibility: hideStats }}
              >
                <MdAdminPanelSettings /> Statistics
              </Nav.Link>
            </Nav>
            <div style={{ visibility: props.naviShow }}>
              <Select
                style={{ visibility: props.naviShow }}
                className="search-crit"
                options={searchCrit}
                onChange={handleSearchChange}
                defaultValue={{
                  label: [
                    <MdOutlineEmail key="crit-email" />,
                    "\xa0\xa0\xa0\xa0",
                    "Email",
                  ],
                  value: { searchVal },
                }}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              ></Select>
            </div>
            <Form
              style={{ visibility: props.naviShow }}
              onSubmit={(e) => props.buildsearch(e)}
              className="d-flex searchBar"
            >
              <FormControl
                type="search"
                name="search"
                placeholder="Search Profiles"
                className="me-2"
                aria-label="Search"
                id={searchVal.value}
              />
              <Button
                variant="default"
                className="button-orange-outline"
                type="submit"
              >
                Search
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="default"
                className="button-orange"
                id="searchb"
                onClick={() => props.refreshList()}
              >
                <MdRefresh />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    ) : null;
  };
  return buildNavi();
}

export default NaviBar;
