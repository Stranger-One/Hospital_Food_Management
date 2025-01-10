import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import managerSlice from "./managerSlice.js"
import pantrySlice from "./pantrySlice.js"
import dPersonnelSlice from "./dPersonnelSlice.js"


const store = configureStore({
    reducer:{
        auth: authSlice,
        manager: managerSlice,
        pantry: pantrySlice,
        dPersonnel: dPersonnelSlice
    }
})

export default store