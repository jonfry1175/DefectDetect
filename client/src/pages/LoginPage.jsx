import React from "react";
import { Card, Form } from "react-bootstrap";
import AuthImg from "../components/AuthImg";
import Footer from "../components/Footer";
import LogoImg from "../components/LogoImg";
import BugLogo from "../assets/bugLogo.svg";

const LoginPage = () => {
  return (
    <div className="min-vh-100 ">
      <div className="row ">
        <div className="col-7 d-none d-lg-block">
          <AuthImg img={BugLogo} />
        </div>
        <div className="col-12 col-lg-5 ">
          <Card className="h-100 d-flex align-items-center justify-content-center bg-danger-subtle">
            <LogoImg />
            <Card.Title>Masuk Dashboard </Card.Title>
            <Card.Body>
              <form onSubmit={""}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="example@gmail.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
              <p>Belum punya akun? <Card.Link href="/register">Daftar</Card.Link></p>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
