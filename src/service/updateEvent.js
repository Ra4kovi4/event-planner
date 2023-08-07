import axios from "axios";

export const updateEvent = async (id, credentials) => {
	try {
		const { data } = await axios.put(`/events/${id}`, credentials);

		return data.data;
	} catch (error) {
		console.log(error);
	}
};
