import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';

import foodManagerRouter from './routes/foodManagerRouter.js'
import patientRouter from './routes/patientRouter.js'
import pantryStaffRouter from './routes/pantryStaffRouter.js'
import deliveryPersonnelRouter from './routes/deliveryPersonnelRouter.js'
import mealBoxRouter from './routes/mealBoxRouter.js'
import dietChartRouter from './routes/dieatChartRouter.js'


const app = express();
const PORT = process.env.PORT || 5000;

// connect to database
connectDB()

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);

app.use(cookieParser())
app.use(express.json())

// routers
app.get('/', (_, res)=>{
    res.send('Hello World')
})

app.use("/api/food-manager", foodManagerRouter)
app.use("/api/patient", patientRouter)
app.use("/api/pantry-staff", pantryStaffRouter)
app.use("/api/delivery-personnel", deliveryPersonnelRouter)
app.use("/api/meal-box", mealBoxRouter)
app.use("/api/diet-chart", dietChartRouter)

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))