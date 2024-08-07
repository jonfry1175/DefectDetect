import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { useDispatch,  } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/authActions";
import { toast } from "sonner";

const NavBar = () => {
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(logout())
    toast.success("Logout Success")
  }
  return (
    <Navbar className="bg-danger" expand="lg" variant="">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-center">
          DefectDetect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="text-center">
            <Nav.Item className="my-1 my-lg-0">
              <Navbar.Text>
                Signed in as: <span className="fw-bold">Mark Otto</span>
              </Navbar.Text>
            </Nav.Item>
            <Nav.Item className="my-1 my-lg-0 ms-lg-2">
              <Button 
                onClick={logOut}
                variant="outline-dark"
                className=" w-100 w-lg-auto d-lg-inline-block d-block"
              >
                Logout
              </Button>
            </Nav.Item>
            <Nav.Item className="my-1 my-lg-0 ms-lg-2">
              <Link
                to="/login"
                className="btn btn-outline-dark w-100 w-lg-auto d-lg-inline-block d-block"
              >
                Login
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
