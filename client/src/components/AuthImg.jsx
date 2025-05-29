import PropTypes from 'prop-types';

const AuthImg = (props) => {
  return (
    <img
      className='w-100 h-100 d-block mx-auto'
      src={props.img} alt="AuthImg" />
  )
}

AuthImg.propTypes = {
  img: PropTypes.string.isRequired
};

export default AuthImg