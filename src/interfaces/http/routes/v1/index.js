import { Router } from "express";
import assignmentRoute from "./assignmentRoute";

const router = Router();

router.use("/assignments", assignmentRoute);

export default router;
