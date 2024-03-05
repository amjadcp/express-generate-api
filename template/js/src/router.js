import { Router } from "express";

import { healthCheck } from "./controller/app.controller.js";
import { getS3Urls } from "./controller/s3.controller.js";
import { auth } from "./middleware/auth.middleware.js";

import authRouter from "./app/auth/auth.router.js";
import { addFCMToken, deleteFCMToken } from "./controller/fcm.controller.js";

const router = Router();
// general routes
router.get("/", healthCheck);
router.post("/s3url", auth(), getS3Urls);
router.post("/fcm", auth(), addFCMToken);
router.delete("/fcm", auth(), deleteFCMToken);

router.use("/auth", authRouter);

export default router;
