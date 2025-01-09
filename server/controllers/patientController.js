import Patient from "../models/patientModel.js";

export default {
  addPatient: async (req, res) => {
    const patientDetails = req.body;
    try {
      const patient = new Patient(patientDetails);
      await patient.save();

      res.status(201).json({
        success: true,
        message: "Patient added successfully",
        data: patient,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error adding patient",
        message: error.message,
      });
    }
  },
  updatePatient: async (req, res) => {
    const { id } = req.params;
    const patientDetails = req.body;

    try {
      const updatedPatient = await Patient.findByIdAndUpdate(
        id,
        patientDetails,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedPatient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Patient updated successfully",
        data: updatedPatient,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  deletePatient: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedPatient = await Patient.findByIdAndDelete(id);

      if (!deletedPatient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Patient deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getAllPatients: async (req, res) => {
    try {
      const patients = await Patient.find();
      res.status(200).json({
        success: true,
        message: "Patients retrieved successfully",
        data: patients,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
