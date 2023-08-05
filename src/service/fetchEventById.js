import axios from "axios";

export const fetchEventById = async (id) => {
	try {
		const { data } = await axios.get(`/events/${id}`);

		return data.data.result;
	} catch (error) {
		console.log(error);
	}
};
