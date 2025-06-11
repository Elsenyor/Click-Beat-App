import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig = () => (
	<ToastContainer
		position="bottom-right"
		autoClose={3000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="dark"
		transition={Bounce}
	/>
);

export default ToastConfig;
