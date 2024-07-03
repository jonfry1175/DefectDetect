import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardBug(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        // variant="top"
        src={props.image}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          expected result : {props.expectedResult}
        </Card.Text>
        <Card.Text>
          actual result : {props.actualResult}
        </Card.Text>
        <Card.Text>
          status : {props.status ? "solved" : "unsolved"}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardBug;
