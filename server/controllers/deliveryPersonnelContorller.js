import DeliveryPersonnel from "../models/deliveryPersonnelModel.js";

export default {
  registerDeliveryPersonnel: async (req, res) => {
    const { name, email, password, contactInfo } = req.body;
    if (!name || !email || !password || !contactInfo) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    try {
      const existingPersonnel = await DeliveryPersonnel.findOne({ email });
      if (existingPersonnel) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }

      const deliveryPersonnel = new DeliveryPersonnel({
        name,
        email,
        password,
        contactInfo,
      });

      const token = deliveryPersonnel.generateAuthToken();
      if (!token) {
        return res.status(500).json({
          message: "Failed to generate token",
        });
      }

      await deliveryPersonnel.save();
      deliveryPersonnel.password = undefined;

      res.status(201).cookie("token", token).json({
        status: "success",
        token,
        data: {
          id: deliveryPersonnel._id,
          name: deliveryPersonnel.name,
          email: deliveryPersonnel.email,
          contactInfo: deliveryPersonnel.contactInfo,
          role: deliveryPersonnel.role
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  loginDeliveryPersonnel: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    try {
      const deliveryPersonnel = await DeliveryPersonnel.findOne({ email }).select(
        "+password"
      );
      if (!deliveryPersonnel) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await deliveryPersonnel.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = deliveryPersonnel.generateAuthToken();
      deliveryPersonnel.password = undefined;

      res.status(200).cookie("token", token).json({
        status: "success",
        message: "Login successful",
        token,
        data: deliveryPersonnel,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
