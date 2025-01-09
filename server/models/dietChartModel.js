import mongoose from "mongoose";


const dietChartSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  mealPlans: [
    {
      mealType: { type: String, enum: ['Morning', 'Evening', 'Night'], required: true },
      ingredients: [String], // List of ingredients for the meal
      instructions: { type: String }, // Specific instructions like "low sugar", "no salt"
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const DietChart = mongoose.model('DietChart', dietChartSchema);
export default DietChart
