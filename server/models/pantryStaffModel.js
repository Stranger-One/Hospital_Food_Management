import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const pantryStaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
      default: "Pantry Staff",
      enum: ["Pantry Staff"],
    },
  },
  { timestamps: true }
);

pantryStaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

pantryStaffSchema.method('comparePassword', async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
});

pantryStaffSchema.method("generateAuthToken", function () {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
});

const PantryStaff = mongoose.model("PantryStaff", pantryStaffSchema);
export default PantryStaff;
