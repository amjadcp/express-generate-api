import { Router } from "express";
import { login, signup } from "./auth.controller";
import JoiValidator from "../../middleware/joi.middleware";
import { loginSchema, signupSchema } from "./auth.joi";

const router = Router();

router.post("/admin/signup", JoiValidator(signupSchema), signup);
router.post("/admin/login", JoiValidator(loginSchema), login);

export default router;