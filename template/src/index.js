import express from "express";
const app = express();
import path from "path";
import dotenv from "dotenv";
const root_dir = new URL("..", import.meta.url).pathname;
dotenv.config({ path: path.join(root_dir, `.env`) });
import dbConnect from './utils/dbConnection.js'; // import db connection feature from util folder
import cors from "cors"
import morgan from "morgan";
// const rateLimiter = require("express-rate-limit");
import helmet from "helmet";
import xss from "xss-clean";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js"
import indexRouter from "./routers/index.js"

dbConnect();

const whitelist = process.env.WHITELIST.split(",");

app.set("trust proxy", 1); // trust first proxy

const corsOptions = {
	// eslint-disable-next-line consistent-return
	origin(origin, callback) {
		if (!origin) { // for mobile app and postman client
			return callback(null, true);
		}
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({
	type: ["application/json", "text/plain"],
}));
app.use(helmet());
app.use(xss());
app.use(morgan("tiny"));

app.use('/api/v1', indexRouter)
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server Running on " + `${port}`));