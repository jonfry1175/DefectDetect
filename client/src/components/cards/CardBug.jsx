import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PropTypes from 'prop-types';
import BadgeStatus from './BadgeStatus';
import { useTheme } from '../../hooks/useTheme.jsx';

/**
 * Card component for displaying bug information
 * @param {Object} props - Component props
 */
function CardBug(props) {
  const {
    title,
    image,
    status,
    priorityLevel,
    severityLevel,
    createdBy,
    roleId,
    onClick,
    onClickView
  } = props;

  // Use theme hook for dark mode
  const { darkMode } = useTheme();

  return (
    <Card className={`h-100 shadow-sm hover-shadow rounded-lg mb-4 border-0 overflow-hidden transition-all ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
      style={{ transition: "all 0.3s ease" }}>
      <div className="position-relative">
        {image && (
          <Card.Img
            variant="top"
            src={image}
            className="card-img-hover"
            style={{
              height: "180px",
              objectFit: "cover",
              transition: "transform 0.3s ease"
            }}
          />
        )}

        <div className="position-absolute top-0 end-0 m-2">
          <BadgeStatus type="status" value={status} />
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className={`mb-0 text-truncate fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{title}</Card.Title>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <div className={`${darkMode ? 'bg-secondary' : 'bg-light'} rounded-circle overflow-hidden me-2`} style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className={`bi bi-person-fill ${darkMode ? 'text-dark' : 'text-secondary'}`}></i>
          </div>
          <small className="text-muted-adaptive">{createdBy || "Unknown"}</small>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <BadgeStatus type="priority" value={priorityLevel} />
          <BadgeStatus type="severity" value={severityLevel} />
        </div>

        <div className="d-flex gap-2 mt-auto pt-2">
          {status ? (
            <Button variant={darkMode ? "outline-success" : "outline-success"} size="sm" disabled className="rounded-pill flex-grow-1">
              <i className="bi bi-check-circle me-1"></i> Solved
            </Button>
          ) : (
            <Button
              variant={darkMode ? "outline-danger" : "outline-danger"}
              size="sm"
              className="rounded-pill flex-grow-1"
              disabled={roleId === +import.meta.env.VITE_QA_ROLE_ID}
              onClick={onClick}
            >
              <i className="bi bi-exclamation-triangle me-1"></i> Mark as Solved
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            className="rounded-pill fw-medium flex-grow-1"
            onClick={onClickView}
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
