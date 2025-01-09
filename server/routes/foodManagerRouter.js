import express from 'express'
import foodManagerController from '../controllers/foodManagerController.js';


const router = express.Router()


router.post("/register", foodManagerController.registerFoodManager)
router.post("/login", foodManagerController.loginFoodManager)



export default router;