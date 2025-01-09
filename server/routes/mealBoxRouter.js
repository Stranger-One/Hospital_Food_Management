import express from 'express';
import mealBoxController from '../controllers/mealBoxController.js';

const router = express.Router();

router.post('/create', mealBoxController.createMealBox);
router.put('/update/:id', mealBoxController.updateMealBox);

export default router;
