import { toast } from "react-toastify";

export const showToast = (message, type, delay) => {
  toast(message, {
    autoClose: delay || 3000,
    progress: 0,
    type: type || "default",
    position: "top-center",
    hideProgressBar: true,
    pauseOnHover: true,
    theme: "light",
    className: "text-2xl",
  });
};
