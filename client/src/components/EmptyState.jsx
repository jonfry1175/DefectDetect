import PropTypes from 'prop-types';

/**
 * EmptyState Component
 * 
 * Reusable component untuk menampilkan state ketika data kosong
 * 
 * @param {string} icon - Bootstrap icon class (default: "bi-bug-fill")
 * @param {string} title - Judul yang ditampilkan (default: "Data tidak ditemukan")
 * @param {string} description - Deskripsi yang ditampilkan (default: "Belum ada data yang tersedia saat ini.")
 * @param {string} textColor - CSS class untuk warna text (default: "text-light")
 */
const EmptyState = ({
    icon = "bi-bug-fill",
    title = "Data tidak ditemukan",
    description = "Belum ada data yang tersedia saat ini.",
    textColor = "text-light"
}) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="text-center">
                <div className="bg-dark bg-opacity-25 rounded-circle p-4 mb-4 shadow-sm"
                    style={{ width: '100px', height: '100px', margin: 'auto' }}>
                    <i className={`bi ${icon} display-1 ${textColor}`}></i>
                </div>
                <h3 className={`${textColor} fw-bold mb-3`}>{title}</h3>
                <p className={`${textColor} opacity-75 mb-4 mx-auto`} style={{ maxWidth: "500px" }}>
                    {description}
                </p>
                <div className="border-top border-secondary opacity-25 pt-4 mt-2 w-50 mx-auto"></div>
            </div>
        </div>
    );
};

EmptyState.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    textColor: PropTypes.string
};

export default EmptyState;
