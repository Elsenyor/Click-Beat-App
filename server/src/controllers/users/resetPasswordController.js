const resetPasswordController = async (req, res, next) => {
	try {
		const { recoverPassCode } = req.params;
		const { newPassword } = req.body;
		//await validateSchema(resetPasswordSchema, { recoverPassCode, newPassword });
		await resetPasswordModel(recoverPassCode, newPassword);

		res.send({
			status: "ok",
			message: "Contraseña actualizada correctamente",
		});
	} catch (err) {
		next(err);
	}
};

export default resetPasswordController;
