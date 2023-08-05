import axios from "axios";

export const deleteEvent = async (id) => {
	try {
		const { data } = await axios.delete(`/events/${id}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};
