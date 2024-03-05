import { Router } from "express";
import { login, signup } from "./auth.controller.js";
import JoiValidator from "../../middleware/joi.middleware.js";
import { loginSchema, signupSchema } from "./auth.joi.js";

const router = Router();

router.post("/admin/signup", JoiValidator(signupSchema), signup);
router.post("/admin/login", JoiValidator(loginSchema), login);

export default router;