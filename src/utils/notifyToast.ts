import { ToastOptions, toast } from "react-toastify";

const notifyToast = (msg: string, type: string) => {
  const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  if (type === "success") {
    toast.success(msg, toastConfig);
  } else if (type === "error") {
    toast.error(msg, toastConfig);
  } else {
    console.error("Only support success and error toasts");
  }
};

export default notifyToast;
