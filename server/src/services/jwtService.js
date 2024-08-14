import jwt from "jsonwebtoken";
import { SECRET } from "../../env.js";

export const generateToken = (payload) => {
	const options = {
		expiresIn: "7d",
	};

	return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token) => {
	return jwt.verify(token, SECRET);
};
