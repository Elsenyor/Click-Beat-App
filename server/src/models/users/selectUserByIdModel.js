import getPool from "../../db/getPool.js";
import { notFoundError } from "../../services/errorService.js";

const selectUserByIdModel = async (userId) => {
	const pool = await getPool();

	const [users] = await pool.query("SELECT username, avatar, role, created_at FROM users WHERE id = ?", [userId]);

	users.length < 1 && notFoundError();

	return users[0];
};

export default selectUserByIdModel;
