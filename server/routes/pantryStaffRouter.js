import express from 'express';
import pantryStaffController from '../controllers/pantryStaffController.js';

const router = express.Router();

router.post("/register", pantryStaffController.registerPantryStaff);
router.post("/login", pantryStaffController.loginPantryStaff);

export default router;
