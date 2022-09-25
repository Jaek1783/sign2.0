import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "name":"",
    "email":"",
    "password":"",
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setName : (state, action) => {
            const name = action.payload;
            state.name = name;
        },
        setEmail : (state, action) => {
            const email = action.payload;
            state.email = email;
        },
        setPassword : (state, action) => {
            const password = action.payload;
            state.password = password;
        }
    }
});

export const { setName, setEmail, setPassword } = userSlice.actions;

export default userSlice.reducer;