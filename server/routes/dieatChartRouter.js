import express from 'express';
import dietChartController from '../controllers/dietChartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create", authMiddleware.patientAuth, dietChartController.createDietChart);
router.get("/all", authMiddleware.patientAuth, dietChartController.getAllDietCharts);
router.get("/:id", authMiddleware.patientAuth, dietChartController.getDietChartById);
router.put("/update/:id", authMiddleware.patientAuth, dietChartController.updateDietChart);
router.delete("/delete/:id", authMiddleware.patientAuth, dietChartController.deleteDietChart);

export default router;
