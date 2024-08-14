import { notFoundError } from "../../services/errorService.js";

const notFoundController = (req, res, next) => {
	next(notFoundError("ruta"));
};

export default notFoundController;
