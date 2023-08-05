import axios from "axios";

axios.defaults.baseURL = "https://event-panner-service.onrender.com/api";

export const fetchEvents = async () => {
	try {
		const { data } = await axios.get("/events");

		return data;
	} catch (error) {
		console.log(error);
	}
};
