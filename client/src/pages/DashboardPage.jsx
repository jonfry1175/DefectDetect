import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { IsAuth } from "../hoc/checkAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axiosInstance from "../lib/axios";
import { setBug } from "../store/actions/bugActions";
import CardBug from "../components/cards/CardBug";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
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

  const [bugDetail, setBugDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = dataAuth.authData?.role_id;
  const bugModalDetail = show.showBugModal;
  const modalCreate = show.showBugModalCreate;

  const DEV_ID = +import.meta.env.VITE_DEV_ROLE_ID;
  const matchDev = roleId === DEV_ID;

  const token = dataAuth.authData?.token;

  const getAllBug = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.get(`/bugs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setBug(result.data));
    } catch (error) {
      console.log(error);
      toast.error("server error");
    } finally {
      setIsLoading(false);
    }
  }, [token, dispatch]);


  const handleShowBugModal = async (id) => {
    try {
      const result = await axiosInstance.get(`/bugs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setBugDetail(result.data)
      dispatch(showModalBugdetail());
    } catch (error) {
      console.log(error.message)
      toast.error("server error");
    }
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
      () => { }
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
      () => { }
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

  }, [getAllBug]);

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
          {bugDetail ? (
            <ModalBug
              onClose={handleCloseBugModal}
              title={bugDetail.title}
              image={bugDetail.image}
              actualResult={bugDetail.actual_result}
              expectedResult={bugDetail.expected_result}
              createdBy={bugDetail.User?.name}
              buildVersion={bugDetail.build_version}
              priorityLevel={bugDetail.PriorityLevel?.name}
              severityLevel={bugDetail.SeverityLevel?.name}
              status={bugDetail.is_solved}
              roleId={roleId}
              onClick={() => confirmChangeStatus(bugDetail.id)}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </Modal>

        <div className="">
          <div className="">
            {isLoading ? (
              <Loader />
            ) : dataBug.length === 0 ? (
              <EmptyState
                icon="bi-bug-fill"
                title="Belum ada bug ditemukan"
                description={matchDev
                  ? "Belum ada bug yang dilaporkan untuk saat ini."
                  : "Mulai dengan membuat laporan bug pertama Anda."
                }
                textColor="text-light"
              />
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

const WrappedDashboardPage = IsAuth(DashboardPage);
export default WrappedDashboardPage;
