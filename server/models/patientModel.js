import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
    },
    age: {
      type: Number,
      required: [true, "Patient age is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Patient gender is required"],
    },
    contactInfo: {
      type: String,
      required: [true, "Contact information is required"],
    },
    emergencyContact: {
      type: String,
      required: [true, "Emergency contact is required"],
    },
    diseases: [{ type: String }], // List of diseases
    allergies: [{ type: String }], // List of allergies
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
    },
    bedNumber: {
      type: String,
      required: [true, "Bed number is required"],
    },
    floorNumber: {
      type: String,
      required: [true, "Floor number is required"],
    },
    dietPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DietChart",
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
