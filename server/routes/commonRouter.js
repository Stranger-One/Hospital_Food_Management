import express from "express";
import commonLoginController from "../controllers/commonLoginController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", commonLoginController.login);
router.get("/check-auth", authMiddleware.getUserId);

export default router;
