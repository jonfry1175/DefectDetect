import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { IsAuth } from "../hoc/checkAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CardBug from "../components/cards/CardBug";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import {
  hideModalBugdetail,
  hideModalCreate,
  showModalBugdetail,
  showModalCreate
} from "../store/actions/showAction";
import { Modal, Button, Pagination } from "react-bootstrap";
import ModalCreate from "../components/modals/ModalCreate";
import { toast } from "sonner";
import showConfirmAlert from "../lib/confirmALert";
import { ModalBug } from "../components/modals/ModalBug";
import NavBar from "../components/NavBar";
// Import custom hooks
import { useBugOperations } from "../hooks/useBugOperations";
import { useFilterAndPagination } from "../hooks/useFilterAndPagination";
import { useDarkMode } from "../hooks/uiHooks";
import { FILTER_OPTIONS, ITEMS_PER_PAGE } from "../constants";

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

  // Use dark mode hook
  const { darkMode } = useDarkMode();

  // Use bug operations hook
  const { getAllBugs, getBugDetails, changeStatus: changeBugStatus } = useBugOperations(token, setIsLoading);

  // Use filter and pagination hook
  const {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
    clearFilters,
    isFilterActive,
    currentPage,
    handlePageChange,
    totalPages,
    currentItems: currentBugs,
    totalFilteredItems
  } = useFilterAndPagination(dataBug, ITEMS_PER_PAGE);

  const handleShowBugModal = async (id) => {
    try {
      const bugData = await getBugDetails(id);
      if (bugData) {
        setBugDetail(bugData);
        dispatch(showModalBugdetail());
      }
    } catch (error) {
      console.error("Error showing bug details:", error);
      toast.error("Server error saat mengambil detail bug");
    }
  };

  const handleCloseBugModal = () => {
    dispatch(hideModalBugdetail());
    setBugDetail(null);
  };

  const handleClose = () => {
    dispatch(hideModalCreate());
  };

  const handleShow = () => dispatch(showModalCreate());

  const handleLogout = () => {
    toast.success("Logout berhasil");
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
    const success = await changeBugStatus(id);
    if (success) {
      handleCloseBugModal();
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
    getAllBugs();
  }, [getAllBugs]);

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <NavBar />
      <div className="container py-4">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <h1 className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'} mb-2`}>
              <i className="bi bi-grid-1x2-fill me-2"></i>
              Dashboard
            </h1>
            <p className={`${darkMode ? 'text-light' : 'text-dark'} opacity-75 mb-3`}>
              {matchDev
                ? "Monitor and manage reported bugs"
                : "Track and submit bugs for your projects"}
            </p>
          </div>

          <div className="d-flex gap-2">
            {!matchDev && (
              <Button
                variant="primary"
                size="lg"
                className="rounded-pill fw-medium shadow-sm"
                onClick={handleShow}
              >
                <i className="bi bi-plus-circle me-2"></i> Report New Bug
              </Button>
            )}
            <Button
              variant={darkMode ? "outline-light" : "outline-dark"}
              className="rounded-pill fw-medium border-0"
              onClick={confirmLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card bg-primary bg-opacity-10 border-0 rounded-4 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-primary bg-opacity-25 p-3 rounded-circle me-3">
                  <i className="bi bi-bug text-primary fs-4"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold text-primary">{dataBug.length}</h3>
                  <p className="mb-0 text-muted">Total Bugs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card bg-danger bg-opacity-10 border-0 rounded-4 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-danger bg-opacity-25 p-3 rounded-circle me-3">
                  <i className="bi bi-exclamation-triangle text-danger fs-4"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold text-danger">
                    {dataBug.filter(bug => !bug.is_solved).length}
                  </h3>
                  <p className="mb-0 text-muted">Unsolved Bugs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card bg-success bg-opacity-10 border-0 rounded-4 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-success bg-opacity-25 p-3 rounded-circle me-3">
                  <i className="bi bi-check-circle text-success fs-4"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold text-success">
                    {dataBug.filter(bug => bug.is_solved).length}
                  </h3>
                  <p className="mb-0 text-muted">Solved Bugs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className={`${darkMode ? 'bg-dark bg-opacity-25' : 'bg-light bg-opacity-75'} p-3 rounded-4 mb-4 shadow-sm`}>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-auto">
              <label className={`${darkMode ? 'text-light' : 'text-dark'} mb-0 me-2`}>Filter by:</label>
            </div>
            <div className="col-6 col-md-auto">
              <select
                className="form-select form-select-sm rounded-pill"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value={FILTER_OPTIONS.ALL}>All Statuses</option>
                <option value={FILTER_OPTIONS.SOLVED}>Solved</option>
                <option value={FILTER_OPTIONS.UNSOLVED}>Unsolved</option>
              </select>
            </div>
            <div className="col-6 col-md-auto">
              <select
                className="form-select form-select-sm rounded-pill"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value={FILTER_OPTIONS.ALL}>All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="col-md ms-md-auto text-md-end">
              <div className="input-group input-group-sm">
                <span className={`input-group-text bg-transparent border-end-0 ${darkMode ? 'text-light' : 'text-dark'}`}>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-transparent border-start-0"
                  placeholder="Search bugs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Show filter results summary if filtering is active */}
        {isFilterActive && (
          <div className={`mb-3 ${darkMode ? 'bg-dark bg-opacity-50' : 'bg-light bg-opacity-75'} p-2 px-3 rounded-pill d-inline-flex align-items-center shadow-sm`}>
            <span className={darkMode ? 'text-light' : 'text-dark'}>
              <i className="bi bi-funnel-fill me-2 text-primary"></i>
              Showing {totalFilteredItems} results
            </span>
            <button
              className={`btn btn-sm ${darkMode ? 'text-light' : 'text-dark'} ms-3`}
              onClick={clearFilters}
            >
              <i className="bi bi-x-circle"></i> Clear filters
            </button>
          </div>
        )}

        {/* Modal create bug */}
        <Modal show={modalCreate} onHide={handleClose} size="lg">
          <ModalCreate handleFetchData={getAllBugs} />
        </Modal>

        {/* Modal view bug */}
        <Modal show={bugModalDetail} onHide={handleCloseBugModal} size="lg">
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
            <div className="d-flex justify-content-center align-items-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </Modal>

        {/* Bug List Section */}
        <div className="mb-4">
          {isLoading ? (
            <Loader />
          ) : currentBugs.length === 0 ? (
            <div className="text-center py-5">
              <EmptyState
                icon="bi-bug-fill"
                title={isFilterActive
                  ? "Tidak ada bug yang sesuai dengan filter"
                  : "Belum ada bug ditemukan"}
                description={isFilterActive
                  ? "Coba ubah filter untuk melihat hasil yang berbeda"
                  : matchDev
                    ? "Belum ada bug yang dilaporkan untuk saat ini."
                    : "Mulai dengan membuat laporan bug pertama Anda."
                }
                textColor={darkMode ? "text-light" : "text-dark"}
              />
            </div>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {currentBugs.map((data) => (
                  <div className="col" key={data.id}>
                    <CardBug
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
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />

                    {[...Array(totalPages).keys()].map(number => (
                      <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => handlePageChange(number + 1)}
                      >
                        {number + 1}
                      </Pagination.Item>
                    ))}

                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const WrappedDashboardPage = IsAuth(DashboardPage);
export default WrappedDashboardPage;
