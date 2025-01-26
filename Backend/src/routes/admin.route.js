import express from "express";

import { adminRoute } from "../middlewares/admin.middleware.js";
import { approveOwner, getOwnerRequests, getUsers } from "../controllers/admin.controller.js";
// import { } from "../controllers/auth.controller.js";

const router=express.Router();

router.get("/get-owner-requests",adminRoute,getOwnerRequests);
router.put("/approve-owner/:id",adminRoute,approveOwner);
router.get("/get-users",adminRoute,getUsers);
// router.get("/get-rides",adminRoute,getRides);
// router.get("/get-flaged-rides",adminRoute,getFlagedRides);
// router.get("/get-ride/:id",adminRoute,getRide);
// router.get("/get-audio/:id",adminRoute,listenAudio);



export default router;
