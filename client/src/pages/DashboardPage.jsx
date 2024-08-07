import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { IsAuth } from "../hoc/checkAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axiosInstance from "../lib/axios";
import { setBug } from "../store/actions/bugActions";
import CardBug from "../components/cards/CardBug";
import Loader from "../components/Loader";
import { hideModalBugdetail, hideModalCreate, showModalBugdetail, showModalCreate } from "../store/actions/showAction";
import { Modal, Button } from "react-bootstrap";
import ModalCreate from "../components/modals/ModalCreate";
import { toast } from "sonner";
import showConfirmAlert from "../lib/confirmALert";
import { ModalBug } from "../components/modals/ModalBug";

const DashboardPage = () => {
  const globalState = useSelector((state) => state);
  const dataBug = globalState.bug.bugs;
  const dataAuth = globalState.auth;
  const show = globalState.show;
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = dataAuth.authData?.role_id;
  const bugModalDetail = show.showBugModal;
  const modalCreate = show.showBugModalCreate;

  const QA_ID = +import.meta.env.VITE_QA_ROLE_ID;
  const DEV_ID = +import.meta.env.VITE_DEV_ROLE_ID;
  const matchQA = roleId === QA_ID;
  const matchDev = roleId === DEV_ID;

  const token = dataAuth.authData?.token;

  const getAllBug = async () => {
    try {
      const result = await axiosInstance.get(`/bugs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setBug(result.data));
    } catch (error) {
      console.log(error);
      toast.error("server error");
    }
  };

  const [bugDetail, setBugDetail] = useState(null);

  const getBugDetailById = async (id) => {
    try {
      const result = await axiosInstance.get(`/bugs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setBugDetail(result.data)
    } catch (error) {
      console.log(error.message)
      toast.error("server error");
    }
  }

  const handleShowBugModal = (id) => {
    getBugDetailById(id)
    dispatch(showModalBugdetail());
  };
  const handleCloseBugModal = () => {
    dispatch(hideModalBugdetail())
    setBugDetail(null)
  };
  const handleClose = () => {
    dispatch(hideModalCreate())
  };
  const handleShow = () => dispatch(showModalCreate());

  const handleLogout = () => {
    toast.success("logout succes");
    setTimeout(() => {
      dispatch(logout());
      navigate("/login");
    }, 1000);
  };

  const confirmLogout = () => {
    showConfirmAlert(
      "Are you sure?",
      "Do you want to logout?",
      () => handleLogout(),
      () => {}
    );
  };

  const changeStatus = async (id) => {
    try {
      const result = await axiosInstance.put(
        `/bugs/status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        getAllBug();
        toast.success("success");
      }
      console.log(result);
    } catch (error) {
      console.log(error.response);
      toast.error("server error");
    }
  };

  const confirmChangeStatus = (id) => {
    showConfirmAlert(
      "Are you sure?",
      "Do you want to solve this bug?",
      () => changeStatus(id),
      () => {}
    );
  };

  useEffect(() => {
    getAllBug();
    // console.log(dataBug.length)
    // console.log(globalState);
    // console.log(matchDev);
    // console.log(dataBug);
    // console.log(dataBug);
    // console.log(bugDetail)
    // console.log(dataBug.length)

  }, []);

  useEffect(() => {
    // getAllBug();
    console.log(dataBug.length)
  }, [dataBug]);


  return (
    <div>
      <div className=" min-vh-100">
        <h1 className="fw-bold">Dashboard</h1>
        <Button
          variant="primary"
          className={matchDev ? "d-none" : "d-block"}
          onClick={handleShow}
        >
          create bug
        </Button>
        <Button variant="danger" onClick={confirmLogout}>
          logout
        </Button>
         {/* modal create bug */}
        <Modal show={modalCreate} onHide={handleClose}>
          <ModalCreate handleFetchData={getAllBug} />
        </Modal>
        {/* modal view bug */}
        <Modal show={bugModalDetail} onHide={handleCloseBugModal}>
          <ModalBug 
          onClose={handleCloseBugModal} 
          title={bugDetail?.title}
          image={bugDetail?.image}
          actualResult={bugDetail?.actual_result}
          expectedResult={bugDetail?.expected_result}
          createdBy={bugDetail?.User?.name}
          buildVersion={bugDetail?.build_version}
          priorityLevel={bugDetail?.PriorityLevel?.name}
          severityLevel={bugDetail?.SeverityLevel?.name}
          status={bugDetail?.is_solved}
          roleId={roleId}
          onClick={() => confirmChangeStatus(bugDetail?.id)}
          />
        </Modal>
        <div className="">
          <div className="">
            {
            dataBug.length === 0 ? (
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
                  priorityLevel={data.PriorityLevel?.name}
                  createdBy={data.User?.name}
                  severityLevel={data.SeverityLevel?.name}
                  onClick={() => confirmChangeStatus(data.id)}
                  onClickView={() => handleShowBugModal(data.id)}
                  roleId={roleId}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IsAuth(DashboardPage);
