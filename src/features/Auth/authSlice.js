import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
        },
        logout: (state) => {
            return initialState;
        },
    },
});

export const { setUserInfo, logout } = authSlice.actions;

export const userInfoSelector = (state) => state.auth.userInfo;

export default authSlice.reducer;
