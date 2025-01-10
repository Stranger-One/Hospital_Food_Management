import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userData: null, 
        // {
        //     id: "ghgfhfh",
        //     name: "adfdfdgh",
        //     email: "ejfafoiw22h",
        //     role: "Food Manager"
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