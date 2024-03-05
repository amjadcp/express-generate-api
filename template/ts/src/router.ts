import { Router } from "express";

import { healthCheck } from "./controller/app.controller";
import { getS3Urls } from "./controller/s3.controller";
import { auth } from "./middleware/auth.middleware";

import authRouter from "./app/auth/auth.router";
import { addFCMToken, deleteFCMToken } from "./controller/fcm.controller";

const router = Router();
// general routes
router.get("/", healthCheck);
router.post("/s3url", auth(), getS3Urls);
router.post("/fcm", auth(), addFCMToken);
router.delete("/fcm", auth(), deleteFCMToken);

router.use("/auth", authRouter);

export default router;
