import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middleware/auth";

const router=Router();

router.get('/',auth("admin"), userControllers.getAllUsers);
router.put('/:userId',userControllers.updateUser)


export const userRoutes=router;