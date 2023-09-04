import axios from "axios";

export const filterEvents = async (page, limit, category) => {
	try {
		const { data } = await axios.get(
			`/events/filter?category=${category}&page=${page}&limit=${limit}`
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};
