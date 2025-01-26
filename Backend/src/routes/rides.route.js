import express from 'express';
import { ownerRoute } from '../middlewares/ride.middleware.js';
import { createRide } from '../controllers/ride.controller.js';


const router=express.Router();

router.post("/create-ride",ownerRoute,createRide);

export default router;