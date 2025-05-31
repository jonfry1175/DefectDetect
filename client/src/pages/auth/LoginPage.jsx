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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/authActions";
import { NotAuth } from "../../hoc/checkAuth";
import { jwtDecode } from "jwt-decode";

const validateForm = z.object({
  email: z.string().email({
    message: "Format email tidak valid",
  }),
  password: z.string().min(1, {
    message: "Password wajib diisi",
  }),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validateForm),
  });

  const submitLogin = async (data) => {
    try {
      const result = await axiosInstance.post("/users/login", data);
      if (result.status === 200) {
        toast.success("Login success");
        const decoded = jwtDecode(result.data)
        const combined = {
          ...decoded,
          token: result.data
        }
        dispatch(login(combined));
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      } else {
        console.log(error.message);
        toast.error("server error");
      }
    }
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
            <Card.Title>Masuk Dashboard</Card.Title>
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
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
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

const AuthGuard = NotAuth(LoginPage);
export default AuthGuard;
