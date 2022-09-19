import { Router } from "express";
import UserRoutes from "./userRoutes";
import TestRoutes from "./testRoutes";

const router = Router();

router.use(UserRoutes);
router.use(TestRoutes);

export default router;