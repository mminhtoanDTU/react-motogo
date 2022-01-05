import { configureStore } from '@reduxjs/toolkit';
import MotoReducer from '../features/MainMoto/motoSlice';
import AuthReducer from '../features/Auth/authSlice';
import AdminReducer from '../features/Admin/adminSlice';

export const store = configureStore({
    reducer: {
        moto: MotoReducer,
        auth: AuthReducer,
        admin: AdminReducer,
    },
});
