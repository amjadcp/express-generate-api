import mongoose from "mongoose";

import { appConfig } from "./env.utils";

const connect = async (): Promise<void> => {
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
