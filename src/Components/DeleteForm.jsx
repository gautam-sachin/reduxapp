import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteUser } from "./UserSlice";

function DeleteForm({ index }) {
  const dispatach = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  
  const handleClickDelete = () => {
    setShow(false);
    dispatach(
      deleteUser({
        id: index,
      })
    );
  };

  return (
    <div>
      <DeleteIcon onClick={handleShow} />
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cencel
          </Button>
          <Button variant="primary" onClick={handleClickDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteForm;
