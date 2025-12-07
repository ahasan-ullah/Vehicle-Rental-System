import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middleware/auth";
import canEdit from "../../middleware/canEdit";

const router=Router();

router.get('/',auth("admin"), userControllers.getAllUsers);
router.put('/:userId',auth("admin","customer"),canEdit(),userControllers.updateUser)


export const userRoutes=router;