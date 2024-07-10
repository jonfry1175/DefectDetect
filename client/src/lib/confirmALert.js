import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const showConfirmAlert = (title, message, onConfirm, onCancel) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: 'Yes',
        onClick: onConfirm
      },
      {
        label: 'No',
        onClick: onCancel
      }
    ]
  });
};

export default showConfirmAlert;
