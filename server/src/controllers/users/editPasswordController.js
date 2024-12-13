import bcrypt from "bcrypt";
import { selectUserByIdModel, updatePasswordModel } from "../../models/users/index.js";

const editPasswordController = async (req, res, next) => {
	try {
		const userId = req.user.id;
		let { currentPassword, newPassword } = req.body;

		const user = await selectUserByIdModel(userId);

		const validPass = await bcrypt.compare(currentPassword, user.password);

		if (!validPass) {
			invalidCredentialsError();
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 12);

		await updatePasswordModel(userId, hashedNewPassword);

		res.send({
			status: "ok",
			message: "Contraseña actualizada",
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export default editPasswordController;
