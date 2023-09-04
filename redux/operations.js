import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL =
	"https://damp-sierra-19444-ce61428c5941.herokuapp.com/api";

export const fetchEvents = createAsyncThunk(
	"events/fetchAll",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get("/events");
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const addEvents = createAsyncThunk(
	"events/addEvents",
	async (credentials, thunkAPI) => {
		try {
			const response = await axios.post("/events", { credentials });
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const deleteEvent = createAsyncThunk(
	"events/deleteEvent",
	async (eventId, thunkAPI) => {
		try {
			const response = await axios.delete(`/events/${eventId}`);
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const fetchEventById = createAsyncThunk(
	"events/fetchEventById",
	async (eventId, thunkAPI) => {
		try {
			const response = await axios.get(`/events/${eventId}`);
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const updateEvent = createAsyncThunk(
	"events/updateEvent",
	async (eventId, credentials, thunkAPI) => {
		try {
			const response = await axios.put(`/events/${eventId}`, credentials);
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);
