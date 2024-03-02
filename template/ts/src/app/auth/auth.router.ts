import { Router } from "express";
import { login, signup, forgotPassword, resetPassword, _setupOrg, verifyAccount, resendverifyAccountLink } from "./auth.controller";
import JoiValidator from "../../middleware/joi.middleware";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema, setupOrgSchema, signupSchema } from "./auth.joi";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.post("/admin/signup", JoiValidator(signupSchema), signup);
router.post("/admin/login", JoiValidator(loginSchema), login);
router.post("/team/login", JoiValidator(loginSchema), login);
router.post("/forgot-password", JoiValidator(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", JoiValidator(resetPasswordSchema), resetPassword);
router.get("/verify/", auth(true), resendverifyAccountLink);
router.patch("/verify/:key", verifyAccount);
router.post("/admin/set-org", auth(true), JoiValidator(setupOrgSchema), _setupOrg);

export default router;