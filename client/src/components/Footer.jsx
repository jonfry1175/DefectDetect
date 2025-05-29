const Footer = () => {
  return (
    <footer className='py-3 mt-auto bg-dark bg-gradient border-top border-secondary border-opacity-25'>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2 mb-md-0">
              <i className="bi bi-bug-fill text-danger me-2"></i>
              <span className="fw-bold text-light">DefectDetect</span>
              <span className="badge bg-secondary text-dark ms-2" style={{ fontSize: '0.6rem' }}>BETA</span>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="text-light opacity-75 mb-0">
              &copy; {new Date().getFullYear()} - Developed by <a href="https://www.linkedin.com/in/jonfry-agung-marbun/" className="link-danger text-decoration-none fw-medium">Jonfry</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer