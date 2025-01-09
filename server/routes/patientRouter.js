import express from 'express'
import patientController from '../controllers/patientController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router()

router.post("/add", authMiddleware.patientAuth, patientController.addPatient)
router.put("/update/:id", authMiddleware.patientAuth, patientController.updatePatient)
router.delete("/delete/:id", authMiddleware.patientAuth, patientController.deletePatient)
router.get("/all", authMiddleware.patientAuth, patientController.getAllPatients)



export default router;