import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userData: null, 
        // userData: {
        //     id: "ghgfhfh",
        //     name: "adfdfdgh",
        //     email: "ejfafoiw22h",
        //     role: "Pantry Staff"
        // }
    },
    reducers:{
        setUserData: (state, action) =>{
            state.userData = action.payload
        }
    }
})

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;