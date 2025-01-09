import PantryStaff from "../models/pantryStaffModel.js";

export default {
  registerPantryStaff: async (req, res) => {
    const { name, email, password, contactInfo, shift } = req.body;
    if (!name || !email || !password || !contactInfo || !shift) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    try {
      const existingStaff = await PantryStaff.findOne({ email });
      if (existingStaff) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }

      const pantryStaff = new PantryStaff({
        name,
        email,
        password,
        contactInfo,
        shift,
      });

      const token = pantryStaff.generateAuthToken();
      if (!token) {
        return res.status(500).json({
          message: "Failed to generate token",
        });
      }

      await pantryStaff.save();
      pantryStaff.password = undefined;

      res.status(201).cookie("token", token).json({
        status: "success",
        token,
        data: pantryStaff,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  loginPantryStaff: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    try {
      const pantryStaff = await PantryStaff.findOne({ email }).select("+password");
      if (!pantryStaff) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await pantryStaff.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = pantryStaff.generateAuthToken();
      pantryStaff.password = undefined;

      res.status(200).cookie("token", token).json({
        status: "success",
        message: "Login successful",
        token,
        data: pantryStaff,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
