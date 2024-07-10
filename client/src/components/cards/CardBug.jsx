import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardBug(props) {
  return (
    <div className="row">
      <div className="col-6">
      <Card style={{ width: "18rem" }}>
      <Card.Img
        // variant="top"
        src={props.image}
      />
      
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
        Created by : {props.createdBy}
        </Card.Text>
        <Card.Text>
          Priority level: {props.priorityLevel}
        </Card.Text>
        <Card.Text>
          Severity level: {props.severityLevel}
        </Card.Text>
        {props.status ? (
          <Button variant="success" disabled>Solved</Button>
        ) : (
          <Button variant="danger" 
          disabled={props.roleId === +import.meta.env.VITE_QA_ROLE_ID}
          onClick={props.onClick}>Unsolved</Button>
        )}
        <Button variant="primary" onClick={props.onClickView}>View</Button>
        
        
      </Card.Body>
    </Card>
      </div>
    </div>
   
  );
}

export default CardBug;
