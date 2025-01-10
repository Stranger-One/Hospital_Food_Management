import { createSlice } from "@reduxjs/toolkit"

const managerSlice = createSlice({
    name: "manager",
    initialState: {
        patients: [],
        dietCharts: [],
        deliveryStatus: [],
        notifications: [],
        analytics: {
            totalDeliveriesToday: 0,
            pendingDeliveries: 0,
            totalPatients: 0,
            activeAlerts: 0
        },
        pantryPerformance: {
            preparationTime: 0,
            qualityRatings: 0,
            activeStaff: 0
        }
    },
    reducers: {
        setPatients: (state, action) => {
            state.patients = action.payload
        },
        updateDietCharts: (state, action) => {
            state.dietCharts = action.payload
        },
        updateDeliveryStatus: (state, action) => {
            state.deliveryStatus = action.payload
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload
        },
        updateAnalytics: (state, action) => {
            state.analytics = { ...state.analytics, ...action.payload }
        },
        updatePantryPerformance: (state, action) => {
            state.pantryPerformance = { ...state.pantryPerformance, ...action.payload }
        }
    }
})

export const {
    setPatients,
    updateDietCharts,
    updateDeliveryStatus,
    setNotifications,
    updateAnalytics,
    updatePantryPerformance
} = managerSlice.actions
export default managerSlice.reducer
