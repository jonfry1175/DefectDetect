import { useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { hideModalCreate } from "../../store/actions/showAction";
import { toast } from "sonner";
import { setLevel } from "../../store/actions/levelActions";
import axiosInstance from "../../lib/axios";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBug } from "../../store/actions/bugActions";
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme.jsx';

function ModalCreate({ handleFetchData }) {
  const reduxData = useSelector((state) => state);
  const level = reduxData.level.level;
  const dataAuth = reduxData.auth.authData;
  const dispatch = useDispatch();

  // Use theme hook for dark mode
  const { darkMode } = useTheme();

  const validateForm = z.object({
    title: z.string().min(1),
    build_version: z.string().min(1).max(30),
    image: z.string().min(1),
    expected_result: z.string().min(1),
    actual_result: z.string().min(1),
    severity_level_id: z.number().positive(
      {
        message: "level wajib diisi",
      }
    ),
    priority_level_id: z.number().positive(
      {
        message: "level wajib diisi",
      }
    ),
  });

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      build_version: "",
      image: "",
      expected_result: "",
      actual_result: "",
      severity_level_id: 0,
      priority_level_id: 0,
    },
    resolver: zodResolver(validateForm),
  });

  const getLevel = useCallback(async () => {
    try {
      const result = await axiosInstance.get("/levels");
      dispatch(setLevel(result.data));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }, [dispatch]);

  const handleClose = () => dispatch(hideModalCreate());

  const handleCreate = async (data) => {
    try {
      const result = await axiosInstance.post(
        "/bugs/create",
        {
          ...data,
          user_id: dataAuth.id,
        },
        {
          headers: {
            Authorization: `Bearer ${dataAuth.token}`,
          },
        }
      )

      if (result.status === 201) {
        dispatch(addBug(result.data))
        toast.success("success");
        form.reset();
        handleFetchData();
        handleClose();

      }
    } catch (error) {
      console.log(error.response);
      toast.error("error");
    }
  };

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  // useEffect(() => {
  //   console.log(reduxData.bug.bugs);
  // }, [reduxData.bug.bugs]);

  return (
    <>
      <Modal.Header closeButton className={`border-0 pb-0 ${darkMode ? 'text-light' : ''}`}>
        <div className="w-100">
          <h6 className={darkMode ? "text-light opacity-75 mb-1" : "text-muted mb-1"}>New Issue</h6>
          <Modal.Title className={`fw-bold ${darkMode ? 'text-light' : ''}`}>Report a Bug</Modal.Title>
        </div>
      </Modal.Header>
      <form onSubmit={form.handleSubmit(handleCreate)}>
        <Modal.Body className={`p-4 ${darkMode ? 'text-light' : ''}`}>
          <div className={`${darkMode ? 'bg-dark bg-opacity-50 border-secondary' : 'bg-light'} p-3 rounded-4 mb-4 border`}>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-info-circle text-primary me-2"></i>
              <h6 className="mb-0 fw-medium">Information</h6>
            </div>
            <p className={darkMode ? "text-light opacity-75 small mb-0" : "text-muted small mb-0"}>
              Please provide as much detail as possible to help developers understand and fix the issue.
            </p>
          </div>
          <Form className="row g-3">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="col-12">
                    <Form.Label className={`fw-medium ${darkMode ? 'text-light' : ''}`}>
                      <i className="bi bi-chat-square-text me-2 text-primary"></i>
                      Bug Title
                    </Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Enter a descriptive title"
                      autoFocus
                      isInvalid={!!fieldState.error}
                      className={`rounded-3 ${darkMode ? 'bg-dark border-secondary text-light' : 'border-secondary-subtle'}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />
            <Controller
              name="build_version"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="col-12 col-md-6">
                    <Form.Label className={`fw-medium ${darkMode ? 'text-light' : ''}`}>
                      <i className="bi bi-tag me-2 text-primary"></i>
                      Build Version
                    </Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="e.g., v1.2.3"
                      isInvalid={!!fieldState.error}
                      className={`rounded-3 ${darkMode ? 'bg-dark border-secondary text-light' : 'border-secondary-subtle'}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="col-12 col-md-6">
                    <Form.Label className={`fw-medium ${darkMode ? 'text-light' : ''}`}>
                      <i className="bi bi-image me-2 text-primary"></i>
                      Screenshot URL
                    </Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Link to screenshot or image"
                      isInvalid={!!fieldState.error}
                      className={`rounded-3 ${darkMode ? 'bg-dark border-secondary text-light' : 'border-secondary-subtle'}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />
            <Controller
              name="expected_result"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="col-12 col-md-6">
                    <Form.Label className={`fw-medium ${darkMode ? 'text-light' : ''}`}>
                      <i className="bi bi-check-circle me-2 text-primary"></i>
                      Expected Result
                    </Form.Label>
                    <Form.Control
                      {...field}
                      as="textarea"
                      rows={3}
                      placeholder="What should happen"
                      isInvalid={!!fieldState.error}
                      className={`rounded-3 ${darkMode ? 'bg-dark border-secondary text-light' : 'border-secondary-subtle'}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />

            <Controller
              name="actual_result"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="col-12 col-md-6">
                    <Form.Label className={`fw-medium ${darkMode ? 'text-light' : ''}`}>
                      <i className="bi bi-exclamation-triangle me-2 text-danger"></i>
                      Actual Result
                    </Form.Label>
                    <Form.Control
                      {...field}
                      as="textarea"
                      rows={3}
                      placeholder="What actually happens"
                      isInvalid={!!fieldState.error}
                      className={`rounded-3 ${darkMode ? 'bg-dark border-secondary text-light' : 'border-secondary-subtle'}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />

            <Controller
              name="severity_level_id"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="col-12 col-md-6">
                    <Form.Label className={`fw-medium ${darkMode ? 'text-light' : ''}`}>
                      <i className="bi bi-thermometer-half me-2 text-primary"></i>
                      Severity Level
                    </Form.Label>
                    <Form.Select
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      isInvalid={!!fieldState.error}
                      className={`rounded-3 ${darkMode ? 'bg-dark border-secondary text-light' : 'border-secondary-subtle'}`}
                    >
                      <option value={0}>Select severity</option>
                      {level
                        ?.filter((e) => e.type === "severity")
                        .map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />

            <Controller
              name="priority_level_id"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="col-12 col-md-6">
                    <Form.Label className={`fw-medium ${darkMode ? 'text-light' : ''}`}>
                      <i className="bi bi-flag me-2 text-primary"></i>
                      Priority Level
                    </Form.Label>
                    <Form.Select
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      isInvalid={!!fieldState.error}
                      className={`rounded-3 ${darkMode ? 'bg-dark border-secondary text-light' : 'border-secondary-subtle'}`}
                    >
                      <option value={0}>Select priority</option>
                      {level
                        ?.filter((e) => e.type === "priority")
                        .map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className={`border-0 pt-0 ${darkMode ? 'text-light' : ''}`}>
          <Button variant="light" onClick={handleClose} className={darkMode ? 'bg-secondary border-0 text-light' : ''}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="fw-medium">
            <i className="bi bi-plus-circle me-1"></i> Submit Bug Report
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}

ModalCreate.propTypes = {
  handleFetchData: PropTypes.func.isRequired
};

export default ModalCreate;
