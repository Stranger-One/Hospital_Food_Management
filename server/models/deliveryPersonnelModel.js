import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const deliveryPersonnelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Use bcrypt for hashing
    contactInfo: { type: String, required: true },
    role: { type: String, default: "Delivery Personnel" },
    currentAssignments: [
      {
        mealBoxId: { type: mongoose.Schema.Types.ObjectId, ref: "MealBox" },
        status: {
          type: String,
          enum: ["Assigned", "Delivered"],
          default: "Assigned",
        },
      },
    ], // Tracks assigned meal boxes and their delivery status
  },
  { timestamps: true }
);

deliveryPersonnelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

deliveryPersonnelSchema.method(
  "comparePassword",
  async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
);

deliveryPersonnelSchema.method("generateAuthToken", function () {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
});

const DeliveryPersonnel = mongoose.model(
  "DeliveryPersonnel",
  deliveryPersonnelSchema
);
export default DeliveryPersonnel;
