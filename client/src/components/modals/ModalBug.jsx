import { Button, Modal, ModalHeader, ModalTitle } from "react-bootstrap";

export const ModalBug = (props) => {
  return (
    <>
      <ModalHeader>
        <ModalTitle>testing111</ModalTitle>
      </ModalHeader>
      <Modal.Body>ini body</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose}>
            close
        </Button>
      </Modal.Footer>
    </>
  );
};
