import MealBox from '../models/mealBoxModel.js';

export default {
    createMealBox: async (req, res) => {
        const { patientId, assignedTo, mealType } = req.body;

        try {
            const mealBox = new MealBox({
                patientId,
                assignedTo,
                mealType,
                status: "Pending"
            });

            await mealBox.save();

            res.status(201).json({
                status: "success",
                data: mealBox
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    updateMealBox: async (req, res) => {
        const { id } = req.params;
        const { assignedTo, status } = req.body;

        try {
            const mealBox = await MealBox.findById(id);
            if (!mealBox) {
                return res.status(404).json({
                    message: "Meal box not found"
                });
            }

            if (assignedTo) mealBox.assignedTo = assignedTo;
            if (status) mealBox.status = status;

            await mealBox.save();

            res.status(200).json({
                status: "success",
                data: mealBox
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
};
