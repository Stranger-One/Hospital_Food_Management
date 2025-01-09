import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const foodManagerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    contactInfo: {
      type: String,
      required: [true, "Contact information is required"],
      match: [/^\+?[\d\s-]+$/, "Please enter a valid phone number"],
    },
    role: {
      type: String,
      default: "Food Manager",
      enum: ["Food Manager"],
    },
  },
  { timestamps: true }
);

foodManagerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

foodManagerSchema.method('comparePassword', async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
});

foodManagerSchema.method("generateAuthToken", function () {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
});

const FoodManager = mongoose.model("FoodManager", foodManagerSchema);
export default FoodManager;
