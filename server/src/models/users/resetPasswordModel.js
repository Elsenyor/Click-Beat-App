import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import { recoveryCodeError } from "../../services/errorService.js";

const resetPasswordModel = async (recoverPassCode, newPassword) => {
	const pool = await getPool();
	const [user] = await pool.query("SELECT id FROM users WHERE recover_pass_code = ?", [recoverPassCode]);

	if (!user[0].length) {
		recoveryCodeError();
	}
	const hashedPass = await bcrypt.hash(newPassword, 12);

	await pool.query("UPDATE users SET password = ?, recoverPassCode = NULL WHERE id = ?", [hashedPass, user[0].id]);
};

export default resetPasswordModel;
