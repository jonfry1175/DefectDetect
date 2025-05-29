import { Button, Badge, Modal, ModalHeader, ModalTitle, Row, Col } from "react-bootstrap";
import PropTypes from 'prop-types';

export const ModalBug = (props) => {
  // Determine badge colors for priority and severity
  const getPriorityBadgeColor = () => {
    const priority = props.priorityLevel?.toLowerCase();
    if (priority === "high") return "danger";
    if (priority === "medium") return "warning";
    if (priority === "low") return "info";
    return "secondary";
  };

  const getSeverityBadgeColor = () => {
    const severity = props.severityLevel?.toLowerCase();
    if (severity === "high") return "danger";
    if (severity === "medium") return "warning";
    if (severity === "low") return "info";
    return "secondary";
  };

  return (
    <>
      <ModalHeader closeButton className="border-0 pb-0">
        <div className="d-flex justify-content-between align-items-start w-100">
          <div>
            <h6 className="text-muted mb-1">Bug Report</h6>
            <ModalTitle className="fw-bold">{props.title}</ModalTitle>
          </div>
          <div>
            <Badge
              bg={props.status ? "success" : "danger"}
              className="rounded-pill px-3 py-2"
            >
              {props.status ? "Solved" : "Unsolved"}
            </Badge>
          </div>
        </div>
      </ModalHeader>

      <Modal.Body className="pt-2">
        <div className="bg-light rounded-4 p-1 mb-4">
          {props.image && (
            <img
              src={props.image}
              alt="Bug screenshot"
              className="img-fluid rounded-3 w-100"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          )}
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-light rounded-circle overflow-hidden me-2" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="bi bi-person-fill text-dark"></i>
            </div>
            <div>
              <small className="text-muted">Reported by</small>
              <p className="mb-0 fw-medium">{props.createdBy}</p>
            </div>
            <div className="ms-auto">
              <small className="text-muted">Build Version</small>
              <p className="mb-0 fw-medium">{props.buildVersion}</p>
            </div>
          </div>
        </div>

        <Row className="mb-4 g-3">
          <Col xs={12} lg={6}>
            <div className="border rounded-3 p-3 h-100">
              <h6 className="text-primary mb-3">
                <i className="bi bi-check-circle me-2"></i>
                Expected Result
              </h6>
              <p className="text-muted">{props.expectedResult}</p>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="border rounded-3 p-3 h-100">
              <h6 className="text-danger mb-3">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Actual Result
              </h6>
              <p className="text-muted">{props.actualResult}</p>
            </div>
          </Col>
        </Row>

        <div className="d-flex gap-2 mb-3">
          <Badge bg={getPriorityBadgeColor()} className="rounded-pill px-3 py-2">
            <i className="bi bi-flag me-1"></i> Priority: {props.priorityLevel}
          </Badge>
          <Badge bg={getSeverityBadgeColor()} className="rounded-pill px-3 py-2">
            <i className="bi bi-exclamation-circle me-1"></i> Severity: {props.severityLevel}
          </Badge>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0">
        {props.status ? (
          <Button
            variant="success"
            className="rounded-pill px-4 py-2 fw-medium"
            disabled
          >
            <i className="bi bi-check-circle me-2"></i> Solved
          </Button>
        ) : (
          <Button
            variant="danger"
            className="rounded-pill px-4 py-2 fw-medium"
            disabled={props.roleId === +import.meta.env.VITE_QA_ROLE_ID}
            onClick={props.onClick}
          >
            <i className="bi bi-check-circle me-2"></i> Mark as Solved
          </Button>
        )}
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4 py-2 fw-medium"
          onClick={props.onClose}
        >
          <i className="bi bi-x me-1"></i> Close
        </Button>
      </Modal.Footer>
    </>
  );
};

ModalBug.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  createdBy: PropTypes.string,
  expectedResult: PropTypes.string,
  actualResult: PropTypes.string,
  buildVersion: PropTypes.string,
  priorityLevel: PropTypes.string,
  severityLevel: PropTypes.string,
  status: PropTypes.bool.isRequired,
  roleId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

ModalBug.defaultProps = {
  image: '',
  createdBy: 'Unknown',
  expectedResult: 'N/A',
  actualResult: 'N/A',
  buildVersion: 'N/A',
  priorityLevel: 'N/A',
  severityLevel: 'N/A'
};
