import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";

const updatePasswordModel = async (userId, newPassword) => {
	const pool = await getPool();
	await pool.query("UPDATE users SET password = ? WHERE id = ?", [newPassword, userId]);
};

export default updatePasswordModel;
