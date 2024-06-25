import React from "react";
import { Card, Form } from "react-bootstrap";
import AuthImg from "../components/AuthImg";
import Footer from "../components/Footer";
import LogoImg from "../components/LogoImg";
import BugLogo from "../assets/bugLogo.svg";

const RegisterPage = () => {
  return (
    <div className="min-vh-100">
      <div className="row ">
        <div className="col-7 d-none d-lg-block">
          <AuthImg img={BugLogo} />
        </div>
        <div className="col-12 col-lg-5 ">
          <Card className="h-100 d-flex align-items-center justify-content-center bg-danger-subtle">
            <LogoImg />
            <Card.Title>Daftar Akun Baru</Card.Title>
            <Card.Body>
              <form onSubmit={""}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="John Doe" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="example@gmail.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select>
                    <option>QA </option>
                    <option>Developer</option>
                  </Form.Select>
                </Form.Group>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
              <p>Sudah punya akun? <Card.Link href="/login">Login</Card.Link></p>

            </Card.Body>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
