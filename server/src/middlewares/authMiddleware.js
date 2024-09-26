import { verifyToken } from "../services/jwtService.js";
import { notAuthenticatedError, invalidTokenError } from "../services/errorService.js";
const authUserMiddleware = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			notAuthenticatedError();
		}
		let tokenInfo;

		try {
			tokenInfo = verifyToken(authorization);
			req.user = tokenInfo;
			next();
		} catch (err) {
			console.log(err);
			invalidTokenError();
		}
	} catch (err) {
		next(err);
	}
};

export default authUserMiddleware;
