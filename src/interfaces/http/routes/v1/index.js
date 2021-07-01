import { Router } from "express";
import assignmentRoute from "./assignmentRoute";
import userRoute from "./userRoute";

const router = Router();

router.use("/assignments", assignmentRoute);
router.use("/users", userRoute);

export default router;
