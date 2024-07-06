import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { hideAction } from "../store/actions/showAction";
import { toast } from "sonner";
import { setLevel } from "../store/actions/levelActions";
import axiosInstance from "../lib/axios";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function ModalCreate() {
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

  const getLevel = async () => {
    try {
      const result = await axiosInstance.get("/levels");
      dispatch(setLevel(result.data));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleClose = () => dispatch(hideAction());

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
        toast.success("success");
        form.reset();
        handleClose();
      }
    } catch (error) {
      console.log(error.response);
      toast.error("error");
    }
  };

  useEffect(() => {
    getLevel();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Bug List</Modal.Title>
      </Modal.Header>
      <form onSubmit={form.handleSubmit(handleCreate)}>
        <Modal.Body>
          <Form>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>Bug Title</Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="title bug"
                      autoFocus
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
              name="build_version"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>Build Version</Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="version 1.0.0"
                      autoFocus
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
              name="image"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="www.example.com"
                      autoFocus
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
              name="expected_result"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>Expected Result</Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="expected result"
                      autoFocus
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
              name="actual_result"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>Actual Result</Form.Label>
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="expected result"
                      autoFocus
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
              name="severity_level_id"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Form.Group className="mb-3">
                    <Form.Label>Severity Level</Form.Label>
                    <Form.Select 
                    {...field}
                    isInvalid={!!fieldState.error}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value))
                    }}>
                      <option value={0} disabled>Select Severity Level</option>
                      {level.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Priotity Level</Form.Label>
                    <Form.Select
                     {...field}
                     isInvalid={!!fieldState.error}
                     onChange={(e) => {
                       field.onChange(parseInt(e.target.value))
                     }}
                    >
                      <option value={0} disabled>Select Priority Level</option>
                      {level.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}

export default ModalCreate;
