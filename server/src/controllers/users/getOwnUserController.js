import { selectUserByIdModel } from "../../models/users/index.js";

const getOwnUserController = async (req, res, next) => {
	try {
		const userId = req.user.id;

		const user = await selectUserByIdModel(userId);

		res.send({
			status: "ok",
			message: "Usuario recuperado",
			data: {
				user,
			},
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export default getOwnUserController;
