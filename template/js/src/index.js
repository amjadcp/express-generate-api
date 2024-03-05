import express from "express";
import dbConnect from "./utils/dbConnection.utils.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import indexRouter from "./router.js";
import { appConfig } from "./utils/env.utils.js";
// import firebaseAdmin from "firebase-admin";


const app = express();

dbConnect();

const whitelist = appConfig.whiteList.split(",");

app.set("trust proxy", 1); // trust first proxy

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      // for mobile app and postman client
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1 || whitelist.includes("*")) {
      callback(null, true);
    } else {
      console.log(origin, "origin");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  }),
);
app.use(helmet());
app.use(morgan("tiny"));

app.use("/api/v1", indexRouter);
app.use(notFound);
app.use(errorHandler);

// const serviceAccount = appConfig.firebaseKey;
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(JSON.parse(serviceAccount)),
// });

const port = appConfig.port || 5000;
app.listen(port, () => {
  console.log("Server Running on " + `${port}`);
  return true;
});
