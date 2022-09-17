import { Router } from "express";
import UserRoutes from "./userRoutes"

const router = Router();

router.use(UserRoutes);

export default router;