import {Router} from "express"

import { login } from "../controllers/auth/login.js";
const router = Router()


router.get("/login-admin", login)

export default router
