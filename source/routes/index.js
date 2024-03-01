import express from "express";
import motorRoutes from "./motorRoutes.js";
import tutorialRoutes from "./tutorialRoutes.js";
const router = express.Router();

router.use("/motor", motorRoutes);
router.use("/tut", tutorialRoutes);

export default router;
