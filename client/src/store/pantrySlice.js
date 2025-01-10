import { createSlice } from "@reduxjs/toolkit"

const pantrySlice = createSlice({
    name: "pantry",
    initialState: {
        tasks: [],
        mealPreparation: [],
        inventory: [],
        deliveryPersonnel: [],
        activeIssues: [],
        metrics: {
            totalTasksToday: 0,
            completedDeliveries: 0,
            pendingDeliveries: 0,
            mealBoxesPrepared: 0
        }
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        updateMealPreparation: (state, action) => {
            state.mealPreparation = action.payload
        },
        updateInventory: (state, action) => {
            state.inventory = action.payload
        },
        setDeliveryPersonnel: (state, action) => {
            state.deliveryPersonnel = action.payload
        },
        updateIssues: (state, action) => {
            state.activeIssues = action.payload
        },
        updateMetrics: (state, action) => {
            state.metrics = { ...state.metrics, ...action.payload }
        }
    }
})

export const { 
    setTasks, 
    updateMealPreparation, 
    updateInventory, 
    setDeliveryPersonnel,
    updateIssues,
    updateMetrics 
} = pantrySlice.actions
export default pantrySlice.reducer
