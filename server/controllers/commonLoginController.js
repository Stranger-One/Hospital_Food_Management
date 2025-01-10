import FoodManager from "../models/foodManagerModel.js";
import PantryStaff from "../models/pantryStaffModel.js";
import DeliveryPersonnel from "../models/deliveryPersonnelModel.js";

export default {
  login: async (req, res) => {
    const { email, password, role } = req.body;
    console.log({ email, password, role });
    

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please provide email, password and role",
      });
    }

    try {
      let user;
      // Select user model based on role
      switch (role) {
        case "Food Manager":
          user = await FoodManager.findOne({ email }).select("+password");
          break;
        case "Pantry Staff":
          user = await PantryStaff.findOne({ email }).select("+password");
          break;
        case "Delivery Personnel":
          user = await DeliveryPersonnel.findOne({ email }).select("+password");
          break;
        default:
          return res.status(400).json({
            message: "Invalid role specified",
          });
      }

      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = await user.generateAuthToken();
      user.password = undefined;
      console.log("user", user);
      

      // Set cookie and send response
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        })
        .json({
          status: "success",
          message: "Login successful",
          token,
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            contactInfo: user.contactInfo,
            role: user.role
          },
        });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token").json({
        status: "success",
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Logout failed",
        error: error.message,
      });
    }
  },
};
