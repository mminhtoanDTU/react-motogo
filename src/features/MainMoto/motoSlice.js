import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    searchInfo: {
        location: 'dn',
    },
    vehicleInfo: {},
    branchInfo: {},
};

export const motoSlice = createSlice({
    name: 'moto',
    initialState,
    reducers: {
        setBranchInfo: (state, action) => {
            state.branchInfo = { ...state.branchInfo, ...action.payload };
        },
        setVehicleInfo: (state, action) => {
            state.vehicleInfo = action.payload;
        },
        setSearchInfo: (state, action) => {
            state.searchInfo = { ...state.searchInfo, ...action.payload };
            // state.branchInfo = initialState.branchInfo;
        },
    },
});

export const { setBranchInfo, setCountBranch, setVehicleInfo, setSearchInfo } = motoSlice.actions;

export const branchInfoSelector = (state) => state.moto.branchInfo;
export const vehicleInfoSelector = (state) => state.moto.vehicleInfo;
export const searchInfoSelector = (state) => state.moto.searchInfo;

export default motoSlice.reducer;
