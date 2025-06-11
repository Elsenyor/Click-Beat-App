import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type = "default") => {
	toast(message, {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		type: type,
		theme: "dark",
		transition: Bounce,
	});
};

export { showToast };
