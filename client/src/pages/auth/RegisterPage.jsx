import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import AuthImg from "../../components/AuthImg";
import Footer from "../../components/Footer";
import LogoImg from "../../components/LogoImg";
import BugLogo from "../../assets/bugLogo.svg";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../lib/axios";
import { toast } from "sonner";

const validateForm = z.object({
  name: z.string().min(3, {
    message: "Nama harus minimal 3 karakter",
  }).max(20, {
    message: "Nama harus kurang dari 20 karakter",
  }).regex(/^[a-zA-Z\s]*$/, {
    message: "Nama hanya boleh mengandung huruf dan spasi"
  }),
  email: z.string().email({
    message: "Format email tidak valid",
  }),
  password: z.string().min(1, {
    message: "Password wajib diisi",
  }),
  role_id: z.number().min(1, {
    message: "Role wajib dipilih",
  }).optional()
});

const RegisterPage = () => {
  const [roles, setRoles] = useState([]);
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(validateForm),
  });

  const submitRegister = async (data) => {
    try {
      const result = await axiosInstance.post("/users/register", data);
      if( result.status === 201 ) {
        toast.success("Register success")
        form.reset();
      } 
    } catch (error) {
      if(error.response) {
        const responseError = error.response
      if(responseError.data.message === "Name already exists") {
        toast.error("Nama Sudah Terdaftar")
      } else if(responseError.data.message === "Email already exists") {
        toast.error("Email Sudah Terdaftar")
      }
      } else {
        console.log(error.message);
        toast.error("server error")
      }
      console.log(error.response)
      
      
    }
  };

  const getAllRoles = async () => {
    try {
      const result = await axiosInstance.get("/roles")
      setRoles(result.data)
    } catch (error) {
      console.log(error.message);
      toast.error("server error")
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

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
              <form onSubmit={form.handleSubmit(submitRegister)}>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="John Doe"
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
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          {...field}
                          type="email"
                          placeholder="example@gmail.com"
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
                          placeholder="Example123"
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
                  name="role_id"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                          {...field}
                          isInvalid={!!fieldState.error}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        >
                          {roles.map((role) => {
                            return (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            );
                          })}
                        </Form.Select>
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
                Sudah punya akun? <Card.Link href="/login">Login</Card.Link>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
