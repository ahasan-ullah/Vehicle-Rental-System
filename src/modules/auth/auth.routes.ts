import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router=Router();

router.post('/signup',authControllers.createUser);


export const authRoutes=router;