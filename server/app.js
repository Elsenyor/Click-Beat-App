import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import routes from "./src/routes/index.js";
import { notFoundController, errorController } from "./src/controllers/errors/index.js";
import { PORT, UPLOADS_DIR, FRONTEND_URL } from "./env.js";

const app = express();

app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	})
);
app.use(
	fileUpload({
		createParentPath: true,
		limits: {
			fileSize: 50 * 1024 * 1024,
		},
		abortOnlimit: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(UPLOADS_DIR));

app.use(morgan("dev"));

app.use(routes);

app.use(notFoundController);

app.use(errorController);

app.listen(PORT, () => {
	console.log(`server listening on http://localhost:${PORT}`);
});
