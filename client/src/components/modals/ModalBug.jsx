import { Button, Card, Modal, ModalHeader, ModalTitle } from "react-bootstrap";

export const ModalBug = (props) => {
  return (
    <>
      <ModalHeader>
        <ModalTitle>Bug Detail</ModalTitle>
      </ModalHeader>
      <Modal.Body>
        <Card>
          <Card.Img
            // variant="top"
            src={props.image}
          />
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>Created by : {props.createdBy}</Card.Text>
          <Card.Text>Expected Result: {props.expectedResult}</Card.Text>
          <Card.Text>Actual Result: {props.actualResult}</Card.Text>
          <Card.Text>Build Version: {props.buildVersion}</Card.Text>
          <Card.Text>Priority level: {props.priorityLevel}</Card.Text>
          <Card.Text>Severity level: {props.severityLevel}</Card.Text>
          <Card.Text>Status: {props.status ? "Solved" : "Unsolved"}</Card.Text>

        </Card>
      </Modal.Body>
      <Modal.Footer>
      {props.status ? (
          <Button variant="success" disabled>Solved</Button>
        ) : (
          <Button variant="danger" 
          disabled={props.roleId === +import.meta.env.VITE_QA_ROLE_ID}
          onClick={props.onClick}>Unsolved</Button>
        )}
        <Button onClick={props.onClose}>close</Button>
      </Modal.Footer>
    </>
  );
};
