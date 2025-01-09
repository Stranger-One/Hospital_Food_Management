import mongoose from "mongoose";

const mealBoxSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  mealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: [true, "Meal type is required"],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPersonnel",
  },
  status: { type: String, enum: ["Pending", "In Progress", "Prepared", "Out For Delivery", "Delivered"], default: "Pending" },
});

const MealBox = mongoose.model("MealBox", mealBoxSchema);
export default MealBox;
