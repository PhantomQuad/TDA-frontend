import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { BsTrashFill, BsFillGearFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";

function Permissions(props) {
  const burl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const deleteData = (id) => {
    props.client.deleteUsers(id).then(() => props.refreshList());
  };

  const filterProfile = (data) => {
    let theProfile = props.users.filter((current) =>
      current.email.toLowerCase().includes(data)
    );
    props.cProfile(theProfile[0]);
    if (props.current.role == "employer") {
      navigate(`/employer/${props.current._id}`);
    } else {
      navigate(`/profile/${props.current._id}`);
    }
  };

  const checkFile = (file, label, fullurl) => {
    if (file !== "") {
      return (
        <Button
          className="button-orange"
          size="sm"
          variant="success"
          onClick={() => window.open(fullurl, "_blank").focus()}
        >
          {label}
        </Button>
      );
    }
  };

  function detRole() {
    if (props.user.role === "tda") {
      return (
        <div className="tda-settings-icon">
          <Button
            variant="warning"
            className="tda-edit-profile"
            onClick={() => filterProfile(props.current.email)}
          >
            <MdManageAccounts />
          </Button>
        </div>
      );
    } else if (props.user.role === "employer") {
      return (
        <div
        // className="ad-footer-emp"
        >
          <center>
            {checkFile(
              props.current.portfolio,
              "Portfolio",
              props.current.portfolio
            )}
            &nbsp;
            {checkFile(
              props.current.cv,
              "CV",
              burl + `user/cv/` + props.current.cv
            )}
          </center>
        </div>
      );
    } else {
      return;
    }
  }

  return <>{detRole()}</>;
}

export default Permissions;
