import { Button, Modal, ModalHeader, ModalTitle, Row, Col } from "react-bootstrap";
import PropTypes from 'prop-types';
import BadgeStatus from '../cards/BadgeStatus';
import { useTheme } from '../../hooks/useTheme.jsx';

/**
 * Modal component for detailed bug information display
 * @param {Object} props - Component props
 */
export const ModalBug = ({
  title,
  image = '',
  createdBy = 'Unknown',
  buildVersion = 'N/A',
  expectedResult = 'N/A',
  actualResult = 'N/A',
  priorityLevel = 'N/A',
  severityLevel = 'N/A',
  status,
  roleId,
  onClick,
  onClose
}) => {
  // Use theme hook for dark mode
  const { darkMode } = useTheme();

  return (
    <>
      <ModalHeader closeButton className={`border-0 pb-0 ${darkMode ? 'text-light' : ''}`}>
        <div className="d-flex justify-content-between align-items-start w-100">
          <div>
            <h6 className="text-muted-adaptive mb-1">Bug Report</h6>
            <ModalTitle className={`fw-bold ${darkMode ? 'text-light' : ''}`}>{title}</ModalTitle>
          </div>
          <div>
            <BadgeStatus
              type="status"
              value={status}
              className="py-2"
            />
          </div>
        </div>
      </ModalHeader>

      <Modal.Body className={`pt-2 ${darkMode ? 'text-light' : ''}`}>
        <div className={`${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-light'} rounded-4 p-1 mb-4`}>
          {image && (
            <img
              src={image}
              alt="Bug screenshot"
              className="img-fluid rounded-3 w-100"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          )}
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <div className={`${darkMode ? 'bg-secondary' : 'bg-light'} rounded-circle overflow-hidden me-2`} style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className={`bi bi-person-fill ${darkMode ? 'text-light' : 'text-dark'}`}></i>
            </div>
            <div>
              <small className="text-muted-adaptive">Reported by</small>
              <p className="mb-0 fw-medium">{createdBy}</p>
            </div>
            <div className="ms-auto">
              <small className="text-muted-adaptive">Build Version</small>
              <p className="mb-0 fw-medium">{buildVersion}</p>
            </div>
          </div>
        </div>

        <Row className="mb-4 g-3">
          <Col xs={12} lg={6}>
            <div className={`border rounded-3 p-3 h-100 ${darkMode ? 'border-secondary bg-dark bg-opacity-50' : ''}`}>
              <h6 className="text-primary mb-3">
                <i className="bi bi-check-circle me-2"></i>
                Expected Result
              </h6>
              <p className="text-muted-adaptive">{expectedResult}</p>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className={`border rounded-3 p-3 h-100 ${darkMode ? 'border-secondary bg-dark bg-opacity-50' : ''}`}>
              <h6 className="text-danger mb-3">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Actual Result
              </h6>
              <p className="text-muted-adaptive">{actualResult}</p>
            </div>
          </Col>
        </Row>

        <div className="d-flex gap-2 mb-3">
          <BadgeStatus
            type="priority"
            value={priorityLevel}
            className="py-2"
          />
          <BadgeStatus
            type="severity"
            value={severityLevel}
            className="py-2"
          />
        </div>
      </Modal.Body>

      <Modal.Footer className={`border-0 ${darkMode ? 'border-dark' : ''}`}>
        {status ? (
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
            disabled={roleId === +import.meta.env.VITE_QA_ROLE_ID}
            onClick={onClick}
          >
            <i className="bi bi-check-circle me-2"></i> Mark as Solved
          </Button>
        )}
        <Button
          variant={darkMode ? "outline-light" : "outline-secondary"}
          className="rounded-pill px-4 py-2 fw-medium"
          onClick={onClose}
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
