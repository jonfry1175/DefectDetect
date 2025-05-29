import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import PropTypes from 'prop-types';

function CardBug(props) {
  // Menentukan warna berdasarkan severity
  const getSeverityBadgeColor = () => {
    const severity = props.severityLevel?.toLowerCase();
    if (severity === "high") return "danger";
    if (severity === "medium") return "warning";
    if (severity === "low") return "info";
    return "secondary";
  };

  // Menentukan warna berdasarkan priority
  const getPriorityBadgeColor = () => {
    const priority = props.priorityLevel?.toLowerCase();
    if (priority === "high") return "danger";
    if (priority === "medium") return "warning";
    if (priority === "low") return "info";
    return "secondary";
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow rounded-lg mb-4 border-0 overflow-hidden transition-all"
      style={{ transition: "all 0.3s ease" }}>
      <div className="position-relative">
        {props.image && (
          <Card.Img
            variant="top"
            src={props.image}
            className="card-img-hover"
            style={{
              height: "180px",
              objectFit: "cover",
              transition: "transform 0.3s ease"
            }}
          />
        )}

        <div className={`position-absolute top-0 end-0 m-2 ${props.status ? 'bg-success' : 'bg-danger'} rounded-pill px-3 py-1 text-white`}>
          <small>{props.status ? "Solved" : "Unsolved"}</small>
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 text-truncate fw-bold">{props.title}</Card.Title>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <div className="bg-light rounded-circle overflow-hidden me-2" style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="bi bi-person-fill text-secondary"></i>
          </div>
          <small className="text-muted">{props.createdBy || "Unknown"}</small>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg={getPriorityBadgeColor()} className="rounded-pill px-3">
            Priority: {props.priorityLevel}
          </Badge>
          <Badge bg={getSeverityBadgeColor()} className="rounded-pill px-3">
            Severity: {props.severityLevel}
          </Badge>
        </div>

        <div className="d-flex gap-2 mt-auto pt-2">
          {props.status ? (
            <Button variant="outline-success" size="sm" disabled className="rounded-pill flex-grow-1">
              <i className="bi bi-check-circle me-1"></i> Solved
            </Button>
          ) : (
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-pill flex-grow-1"
              disabled={props.roleId === +import.meta.env.VITE_QA_ROLE_ID}
              onClick={props.onClick}
            >
              <i className="bi bi-exclamation-triangle me-1"></i> Mark as Solved
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            className="rounded-pill fw-medium flex-grow-1"
            onClick={props.onClickView}
          >
            <i className="bi bi-eye me-1"></i> View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

CardBug.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  createdBy: PropTypes.string,
  priorityLevel: PropTypes.string,
  severityLevel: PropTypes.string,
  status: PropTypes.bool.isRequired,
  roleId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickView: PropTypes.func.isRequired,
  actualResult: PropTypes.string,
  expectedResult: PropTypes.string
};

export default CardBug;
