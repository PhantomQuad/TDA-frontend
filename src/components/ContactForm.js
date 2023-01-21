import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = (props) => {
  console.log(`contact form props`, props);
  const [status, setStatus] = useState("");
  const [disabled, cDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    cDisabled(true);

    const toastId = toast("We are sending your email...", {
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    props.client
      .sendTheMail(
        ' "Graduatês" <blanchejohnsi0xu@gmail.com>', //from
        props.profile.email, //to
        e.target.company.value, //company
        `${e.target.name.value} from ${e.target.company.value} has sent you a message.`, //subject
        e.target.message.value //message
      )
      .then(() => {
        toast.update(toastId, {
          render: "Great news, your email has been sent!",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
        cDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        cDisabled(false);
        toast.error(toastId, {
          render: "Sorry, there's seems to have been a problem :(",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
      });
  };

  useEffect(() => {
    props.cNaviShow("hidden");
  }, []);

  return (
    <>
      <br />
      <Card style={{ padding: "1em" }}>
        <Form id="contactformmain" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">
              Contacting: {props.profile.fname} {props.profile.sname} from{" "}
              {props.profile.location}
            </Form.Label>
          </Form.Group>
          <hr />
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="company">Company:</Form.Label>
                <Form.Control
                  id="company"
                  type="text"
                  placeholder="Enter your company"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="message">Message:</Form.Label>
            <Form.Control
              rows={5}
              id="message"
              as="textarea"
              placeholder="Message..."
              required
            />
          </Form.Group>
          <Button disabled={disabled} type="submit">
            Submit
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;{status}
        </Form>
      </Card>

      <ToastContainer theme="dark" position="bottom-center" transition={Zoom} />
    </>
  );
};

export default ContactForm;
