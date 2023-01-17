const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const root_dir = __dirname.split("src")[0];
dotenv.config({ path: path.join(root_dir, `.env`) });
const cors = require("cors")
const db = require(`${__dirname}/src/utils/dbConnection`); // import db connection feature from util folder
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const notFoundMiddleware = require("./middleware/not-found");
const fileUpload = require("express-fileupload");

const swaggerUI = require("swagger-ui-express")
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load(`${__dirname}/documentation/api.yml`)



db.connect();

const whitelist = ["http://127.0.0.1:3000", "localhost", "http://localhost:3000"];

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
app.use(mongoSanitize());
app.use(morgan("tiny"));
app.use(fileUpload({ 
	createParentPath: true,
	limits: { fileSize: 50 * 1024 * 1024 }
}));

// api doc
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))
app.use('/api/v1', errorWrapper(require('./routes/index')))
app.use(notFoundMiddleware);
app.use(require("./middleware/errorHandler"));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server Running on " + `${port}`));