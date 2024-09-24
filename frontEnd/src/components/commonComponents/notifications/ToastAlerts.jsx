import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

export const Success = (message) => toast.success(message);
export const Error = (message) => toast.error(message);
export const ContentToast = (message) => {
  toast((t) => (
    <span>
      {message}
      <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
    </span>
  ));
};

export default function ToastAlerts({ position = "top-center", reverseOrder = false }) {
  return (
    <Toaster position={position} reverseOrder={reverseOrder} />
  )
}

// Define prop types
ToastAlerts.propTypes = {
  position: PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']),
  reverseOrder: PropTypes.bool,
};