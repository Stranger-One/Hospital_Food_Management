import { createSlice } from "@reduxjs/toolkit"

const dPersonnelSlice = createSlice({
    name: "deliveryPersonnel",
    initialState: {
        assignments: [],
        currentDelivery: null,
        deliveryHistory: [],
        status: "available", // available, delivering, offline
        currentLocation: null,
        metrics: {
            deliveriesCompleted: 0,
            averageDeliveryTime: 0,
            currentRating: 0
        }
    },
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload
        },
        updateCurrentDelivery: (state, action) => {
            state.currentDelivery = action.payload
        },
        updateDeliveryHistory: (state, action) => {
            state.deliveryHistory = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        updateLocation: (state, action) => {
            state.currentLocation = action.payload
        },
        updateMetrics: (state, action) => {
            state.metrics = { ...state.metrics, ...action.payload }
        }
    }
})

export const {
    setAssignments,
    updateCurrentDelivery,
    updateDeliveryHistory,
    setStatus,
    updateLocation,
    updateMetrics
} = dPersonnelSlice.actions
export default dPersonnelSlice.reducer
