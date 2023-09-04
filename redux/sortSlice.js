import { createSlice } from "@reduxjs/toolkit";
import { statusSort } from "./constants";

const filtersInitialState = {
	status: statusSort.name_asc,
};

const sortSlice = createSlice({
	name: "sort",
	initialState: filtersInitialState,
	reducers: {
		setSortSlice(state, action) {
			state.status = action.payload;
		},
	},
});

export const { setSortSlice } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
