import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        login: (state, action) => (state = action.payload),
        register: (state, action) => (state = action.payload),
        logout: (state) => (state = null),
    },
});

export const { login, logout, register } = userSlice.actions;

export default userSlice.reducer;