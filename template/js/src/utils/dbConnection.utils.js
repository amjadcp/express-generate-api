import mongoose from "mongoose";

import { appConfig } from "./env.utils.js";

const connect = async () => {
  await mongoose
    .connect(appConfig.mongoUri)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connect;
