import express from 'express';
import deliveryPersonnelController from '../controllers/deliveryPersonnelContorller.js';

const router = express.Router();

router.post("/register", deliveryPersonnelController.registerDeliveryPersonnel);
router.post("/login", deliveryPersonnelController.loginDeliveryPersonnel);

export default router;
