import DietChart from '../models/dietChartModel.js';

export default {
    createDietChart: async (req, res) => {
        try {
            const dietChart = await DietChart.create(req.body);
            res.status(201).json({
                success: true,
                data: dietChart
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    getAllDietCharts: async (req, res) => {
        try {
            const dietCharts = await DietChart.find().populate('patientId');
            res.status(200).json({
                success: true,
                data: dietCharts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    getDietChartById: async (req, res) => {
        try {
            const dietChart = await DietChart.findById(req.params.id).populate('patientId');
            if (!dietChart) {
                return res.status(404).json({
                    success: false,
                    message: 'Diet chart not found'
                });
            }
            res.status(200).json({
                success: true,
                data: dietChart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    updateDietChart: async (req, res) => {
        try {
            const dietChart = await DietChart.findByIdAndUpdate(
                req.params.id,
                { ...req.body, updatedAt: Date.now() },
                { new: true }
            );
            if (!dietChart) {
                return res.status(404).json({
                    success: false,
                    message: 'Diet chart not found'
                });
            }
            res.status(200).json({
                success: true,
                data: dietChart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    deleteDietChart: async (req, res) => {
        try {
            const dietChart = await DietChart.findByIdAndDelete(req.params.id);
            if (!dietChart) {
                return res.status(404).json({
                    success: false,
                    message: 'Diet chart not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Diet chart deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};
