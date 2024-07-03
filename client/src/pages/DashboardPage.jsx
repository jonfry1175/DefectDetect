import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { IsAuth } from "../hoc/checkAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axiosInstance from "../lib/axios";
import { addBug } from "../store/actions/bugActions";
import CardBug from "../components/CardBug";
import Loader from "../components/Loader";
import { hideAction, showAction } from "../store/actions/showAction";
import {Modal, Button} from "react-bootstrap"
import ModalCreate from "../components/ModalCreate";

const DashboardPage = () => {
  const globalState = useSelector((state) => state);
  const bug = globalState.bug;
  const dataBug = bug.bugs;
  const dataAuth = globalState.auth;
  const show = globalState.show.show;

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = dataAuth.authData?.role_id;
  const QA_ID = +import.meta.env.VITE_QA_ROLE_ID;
  const DEV_ID = +import.meta.env.VITE_DEV_ROLE_ID;
  const matchQA = roleId === QA_ID;
  const matchDev = roleId === DEV_ID;

  const getAllBug = async () => {
    try {
      const result = await axiosInstance.get(`/bugs`, {
        headers: {
          Authorization: `Bearer ${dataAuth.authData.token}`,
        },
      });
      dispatch(addBug(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => dispatch(hideAction());
  const handleShow = () => dispatch(showAction());

  useEffect(() => {
    getAllBug();
    console.log(show)
  }, [show]);

  return (
    <div>
      <div className="text-center min-vh-100">
        <h1 className="fw-bold">Dashboard</h1>
        <Button variant="primary" onClick={handleShow}>
        create bug
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalCreate/>
      </Modal>
        {dataBug.length === 0 ? (
          <Loader />
        ) : (
          dataBug.map((data) => (
            <CardBug
              key={data.id}
              title={data.title}
              actualResult={data.actual_result}
              expectedResult={data.expected_result}
              image={data.image}
              status={data.is_solved}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IsAuth(DashboardPage);
