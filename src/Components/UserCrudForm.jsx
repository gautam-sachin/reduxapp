import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addUser, editUser } from "./UserSlice";
import UserList from "./UserList";

function UserCrud() {
  const [firstNameError, setFirstNameError] = useState(true);
  const [lastNameError, setLastNameError] = useState(true);
  const [messageError, setMessageError] = useState(true);
  const [label, setLabel] = useState(true);
  const [show, setShow] = useState(false);
  const dispatach = useDispatch();
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const messageRef = useRef(null);
  const [inputValue, setInputValue] = useState({
    id: Math.floor(Math.random() * 100 + 1),
    firstName: "",
    lastName: "",
    message: "",
  });

  const { firstName, lastName, message } = inputValue;

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setLabel(true);
    setFirstNameError(true);
    setLastNameError(true);
    setMessageError(true);
    setInputValue({ firstName: "", lastName: "", message: "" });
  };
  
  const handleFirstNameInput = (event) => {
    const fName = event.target.value;
    if (fName.length === 0) {
      firstRef.current.style.border = "1px solid red";
      setFirstNameError(false);
    } else {
      firstRef.current.style.border = "1px solid green";
      setFirstNameError(true);
    }
    setInputValue({ ...inputValue, firstName: fName.trimStart()});
  };

  const handleLastNameInput = (event) => {
    const lName = event.target.value;
    if (lName.length === 0) {
      lastRef.current.style.border = "1px solid red";
      setLastNameError(false);
    } else {
      lastRef.current.style.border = "1px solid green";
      setLastNameError(true);
    }
    setInputValue({ ...inputValue, lastName: lName.trimStart() });
  };

  const handleMessageInput = (event) => {
    const messages = event.target.value;
    if (messages.length === 0) {
      messageRef.current.style.border = "1px solid red";
      setMessageError(false);
    } else {
      messageRef.current.style.border = "1px solid green ";
      setMessageError(true);
    }
    setInputValue({ ...inputValue, message: messages.trimStart() });
  };

  const handleClickSaveData = () => {
    if (!firstName) {
      setShow(true);
      setFirstNameError(false);
      firstRef.current.style.border = "1px solid red";
      if (!lastName) {
        setLastNameError(false);
        lastRef.current.style.border = "1px solid red";
      }
      if (!message) {
        messageRef.current.style.border = "1px solid red";
        setMessageError(false);
      }
    } else if (!lastName) {
      setShow(true);
      setLastNameError(false);
      lastRef.current.style.border = "1px solid red";
      if (!message) {
        setMessageError(false);
        messageRef.current.style.border = "1px solid red";
      }
    } else if (!message) {
      setShow(true);
      setMessageError(false);
      messageRef.current.style.border = "1px solid red";
      if (!lastName) {
        setLastNameError(false);
        lastRef.current.style.border = "1px solid red";
      }
    } else {
      dispatach(
        addUser({
          id: Math.floor(Math.random() * 100 + 1),
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          message: inputValue.message,
        })
      );
      setShow(false);
      setFirstNameError(true);
      setLastNameError(true);
      setMessageError(true);
      setInputValue({ firstName: "", lastName: "", message: "" });
    }
    setLabel(true);
  };

  const handleClickUpdateData = () => {
    dispatach(
      editUser({
        id: inputValue.id,
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        message: inputValue.message,
      })
    );
    setShow(false);
    setInputValue({ firstName: "", lastName: "", message: "" });
    setLabel(true);
  };

  return (
    <>
      <div className="maindiv">
        <div className="innerdiv">
          <h3>User list</h3>
          <Button className=" Add btn btn-primary" onClick={handleShow}>
            Add User
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title> User {label ? "Add" : "Update"} Form </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label className="col-form-label">First Name:</label>
                <input
                  type="text"
                  ref={firstRef}
                  className="form-control"
                  value={inputValue.firstName}
                  onChange={handleFirstNameInput}
                />
                {firstNameError ? (
                  ""
                ) : (
                  <span style={{ color: "red" }}>
                    Please provide a valid firstName
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label className="col-form-label">Last Name:</label>
                <input
                  type="text"
                  ref={lastRef}
                  className="form-control"
                  value={inputValue.lastName}
                  onChange={handleLastNameInput}
                />
                {lastNameError ? (
                  ""
                ) : (
                  <span style={{ color: "red" }}>
                    Please provide a valid lastName
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label className="col-form-label">Message:</label>
                <textarea
                  className="form-control"
                  id="message-text"
                  ref={messageRef}
                  value={inputValue.message}
                  onChange={handleMessageInput}
                ></textarea>
                {messageError ? (
                  ""
                ) : (
                  <span style={{ color: "red" }}>
                    Please provide a valid message
                  </span>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cencel
              </Button>
              {label ? (
                <Button variant="primary" onClick={handleClickSaveData}>
                  Save
                </Button>
              ) : (
                <Button variant="primary" onClick={handleClickUpdateData}>
                  Update
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <UserList
        handleShowForm={handleShow}
        setInputValue={setInputValue}
        setLabel={setLabel}
      />
    </>
  );
}

export default UserCrud;
