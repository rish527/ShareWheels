import express from "express";

import {protectedRoute} from "../middlewares/auth.middleware.js"
import { login, logout, signup, checkAuth, OwnerRegister } from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",logout);
router.get("/check",protectedRoute,checkAuth);
router.post("/owner-register",protectedRoute,OwnerRegister);


export default router;
