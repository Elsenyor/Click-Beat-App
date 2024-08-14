import { validateUserModel } from "../../models/users/index.js";

const validateUserController = async (req, res, next) => {
	try {
		const { registrationCode } = req.params;

		await validateUserModel(registrationCode);

		res.send({
			status: "ok",
			message: "Usuario validado correctamente.",
		});
	} catch (err) {
		next(err);
	}
};

export default validateUserController;
