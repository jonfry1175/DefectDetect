import { Navbar, Container, Button, Nav, Badge, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/authActions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme.jsx";

/**
 * Navigation bar component for the application
 */
const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.authData);

  // Use theme hook for dark mode
  const { darkMode, toggleDarkMode } = useTheme();

  // State for mobile menu
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const logOut = () => {
    dispatch(logout())
    toast.success("Logout Success")
    handleCloseOffcanvas()
  }

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  // Check if viewport is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Navbar className="bg-gradient shadow-sm" style={{ background: 'linear-gradient(135deg, #e53935 0%, #e35d5b 100%)' }} expand="lg" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold d-flex align-items-center">
          <i className="bi bi-bug-fill me-2"></i>
          <span>DefectDetect</span>
          <Badge bg="light" text="dark" pill className="ms-2" style={{ fontSize: '0.6rem' }}>BETA</Badge>
        </Navbar.Brand>

        {isMobile ? (
          <>
            <Button
              variant="outline-light"
              className="border-0 p-1"
              onClick={handleShowOffcanvas}
            >
              <i className="bi bi-list fs-4"></i>
            </Button>

            <Offcanvas
              show={showOffcanvas}
              onHide={handleCloseOffcanvas}
              placement="end"
              className={darkMode ? "bg-dark text-light" : "bg-light"}
            >
              <Offcanvas.Header closeButton closeVariant={darkMode ? "white" : undefined}>
                <Offcanvas.Title className="d-flex align-items-center">
                  <i className="bi bi-bug-fill me-2 text-danger"></i>
                  <span className="fw-bold">DefectDetect</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="d-flex flex-column gap-3">
                  {auth && (
                    <div className="d-flex align-items-center mb-3 p-3 rounded-3 bg-dark bg-opacity-10">
                      <div className="bg-primary rounded-circle overflow-hidden me-3" style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="bi bi-person-fill fs-4 text-light"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{auth.name || "User"}</h6>
                        <small className={darkMode ? "text-light opacity-75" : "text-muted"}>Logged in</small>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={toggleDarkMode}
                    variant={darkMode ? "light" : "dark"}
                    className="rounded-pill w-100 fw-medium py-2 d-flex align-items-center justify-content-center"
                  >
                    {darkMode ? (
                      <><i className="bi bi-sun-fill me-2"></i> Switch to Light Mode</>
                    ) : (
                      <><i className="bi bi-moon-fill me-2"></i> Switch to Dark Mode</>
                    )}
                  </Button>

                  {auth ? (
                    <Button
                      onClick={logOut}
                      variant="danger"
                      className="rounded-pill w-100 fw-medium py-2 d-flex align-items-center justify-content-center"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </Button>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-primary rounded-pill w-100 fw-medium py-2 d-flex align-items-center justify-content-center"
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i> Login
                    </Link>
                  )}
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              <Nav.Item className="my-1 my-lg-0 me-lg-3">
                <Button
                  onClick={toggleDarkMode}
                  variant="outline-light"
                  size="sm"
                  className="rounded-pill px-3 fw-medium border-0"
                >
                  {darkMode ? (
                    <><i className="bi bi-sun-fill me-1"></i> Light Mode</>
                  ) : (
                    <><i className="bi bi-moon-fill me-1"></i> Dark Mode</>
                  )}
                </Button>
              </Nav.Item>

              {auth ? (
                <>
                  <Nav.Item className="my-1 my-lg-0 d-flex align-items-center">
                    <div className="d-inline-flex align-items-center me-3">
                      <div className="bg-light rounded-circle overflow-hidden me-2" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="bi bi-person-fill text-dark"></i>
                      </div>
                      <Navbar.Text className="text-light">
                        <span className="d-none d-md-inline">Logged in as:</span> <span className="fw-bold">{auth.name || "User"}</span>
                      </Navbar.Text>
                    </div>
                  </Nav.Item>
                  <Nav.Item className="my-1 my-lg-0 ms-lg-2">
                    <Button
                      onClick={logOut}
                      variant="light"
                      size="sm"
                      className="rounded-pill px-3 fw-medium shadow-sm border-0"
                    >
                      <i className="bi bi-box-arrow-right me-1"></i> Logout
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item className="my-1 my-lg-0 ms-lg-2">
                  <Link
                    to="/login"
                    className="btn btn-light btn-sm rounded-pill px-3 fw-medium shadow-sm border-0"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
