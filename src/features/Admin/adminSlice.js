import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isReload: false,
    selectedKeys: [],
    selectedData: [],
};

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setIsReload: (state, action) => {
            state.isReload = !state.isReload;
        },
        setSelectKeys: (state, action) => {
            state.selectedKeys = action.payload;
        },
        setSelectedData: (state, action) => {
            state.selectedData = action.payload;
        },
    },
});

export const { setIsReload, setSelectKeys, setSelectedData } = AdminSlice.actions;

export const selectedKeysSelector = (state) => state.admin.selectedKeys;
export const selectedDataSelector = (state) => state.admin.selectedData;
export const isReloadSelector = (state) => state.admin.isReload;

export default AdminSlice.reducer;
