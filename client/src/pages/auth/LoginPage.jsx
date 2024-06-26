import React from "react";
import { Card, Form } from "react-bootstrap";
import AuthImg from "../../components/AuthImg";
import Footer from "../../components/Footer";
import LogoImg from "../../components/LogoImg";
import BugLogo from "../../assets/bugLogo.svg";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../lib/axios";

const validateForm = z.object({
  email: z.string().email({
    message: "Format email tidak valid",
  }),
  password: z.string().min(1, {
    message: "Password wajib diisi",
  }),
});

const LoginPage = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validateForm),
  });

  const submitLogin = (data) => {
    console.log(data);
  };
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
              <form onSubmit={form.handleSubmit(submitLogin)}>
               
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          {...field}
                          type="email"
                          placeholder="Enter email"
                          isInvalid={!!fieldState.error}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    );
                  }}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          {...field}
                          type="password"
                          placeholder="Password"
                          isInvalid={!!fieldState.error}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    );
                  }}
                />
                
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
              <p>
                Belum punya akun? <Card.Link href="/register">Daftar</Card.Link>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
