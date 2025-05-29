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

function ModalCreate({ handleFetchData }) {
  const reduxData = useSelector((state) => state);
  const level = reduxData.level.level;
  const dataAuth = reduxData.auth.authData;
  const dispatch = useDispatch();

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
      <Modal.Header closeButton className="border-0 pb-0">
        <div className="w-100">
          <h6 className="text-muted mb-1">New Issue</h6>
          <Modal.Title className="fw-bold">Report a Bug</Modal.Title>
        </div>
      </Modal.Header>
      <form onSubmit={form.handleSubmit(handleCreate)}>
        <Modal.Body className="p-4">
          <div className="bg-light p-3 rounded-4 mb-4 border">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-info-circle text-primary me-2"></i>
              <h6 className="mb-0 fw-medium">Information</h6>
            </div>
            <p className="text-muted small mb-0">
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
                    <Form.Label className="fw-medium">
                      <i className="bi bi-chat-square-text me-2 text-primary"></i>
                      Bug Title
                    </Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Enter a descriptive title"
                      autoFocus
                      isInvalid={!!fieldState.error}
                      className="rounded-3 border-secondary-subtle"
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
                  <Form.Group className="col-md-4">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-tags me-2 text-primary"></i>
                      Build Version
                    </Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="e.g., v1.0.0"
                      isInvalid={!!fieldState.error}
                      className="rounded-3 border-secondary-subtle"
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
                  <Form.Group className="col-md-8">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-image me-2 text-primary"></i>
                      Image Link
                    </Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="URL to screenshot or image"
                      isInvalid={!!fieldState.error}
                      className="rounded-3 border-secondary-subtle"
                    />
                    <Form.Text className="text-muted">
                      Add a screenshot to help illustrate the issue
                    </Form.Text>
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
                  <Form.Group className="col-md-6">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-check-circle me-2 text-success"></i>
                      Expected Result
                    </Form.Label>
                    <Form.Control
                      {...field}
                      as="textarea"
                      rows={3}
                      placeholder="What should happen"
                      isInvalid={!!fieldState.error}
                      className="rounded-3 border-secondary-subtle"
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
                  <Form.Group className="col-md-6">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-exclamation-triangle me-2 text-danger"></i>
                      Actual Result
                    </Form.Label>
                    <Form.Control
                      {...field}
                      as="textarea"
                      rows={3}
                      placeholder="What actually happens"
                      isInvalid={!!fieldState.error}
                      className="rounded-3 border-secondary-subtle"
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
                  <Form.Group className="col-md-6">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-exclamation-circle me-2 text-warning"></i>
                      Severity Level
                    </Form.Label>
                    <Form.Select
                      {...field}
                      isInvalid={!!fieldState.error}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value))
                      }}
                      className="rounded-3 border-secondary-subtle"
                    >
                      <option value={0} disabled>Select Severity Level</option>
                      {level.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Text className="text-muted">
                      How severely does this bug impact functionality
                    </Form.Text>
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
                  <Form.Group className="col-md-6">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-flag me-2 text-danger"></i>
                      Priority Level
                    </Form.Label>
                    <Form.Select
                      {...field}
                      isInvalid={!!fieldState.error}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value))
                      }}
                      className="rounded-3 border-secondary-subtle"
                    >
                      <option value={0} disabled>Select Priority Level</option>
                      {level.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Text className="text-muted">
                      How urgent it is to fix this bug
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {fieldState.error?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                );
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="rounded-pill px-4 py-2"
          >
            <i className="bi bi-x me-1"></i> Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="rounded-pill px-4 py-2 fw-medium"
          >
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
