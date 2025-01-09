import FoodManager from "../models/foodManagerModel.js";

export default {
  registerFoodManager: async (req, res) => {
    const { name, email, password, contactInfo } = req.body;
    if (!name || !email || !password || !contactInfo) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    try {
      const existingManager = await FoodManager.findOne({ email });
      if (existingManager) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }

      const foodManager = new FoodManager({
        name,
        email,
        password,
        contactInfo,
      });

      const token = await foodManager.generateAuthToken();
      if (!token) {
        return res.status(500).json({
          message: "Failed to generate token",
        });
      }

      await foodManager.save();
      foodManager.password = undefined;

      res.status(201).cookie("token", token).json({
        status: "success",
        token,
        data: foodManager,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  loginFoodManager: async (req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password",
        });
    }

    try {
        const foodManager = await FoodManager.findOne({ email }).select("+password");
        if (!foodManager) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await foodManager.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password", 
            });
        }

        const token = await foodManager.generateAuthToken();
        foodManager.password = undefined;

        res.status(200).cookie("token", token).json({
            status: "success",
            message: "Login successfully.",
            token,
            data: foodManager,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }

  },
};
