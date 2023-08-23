import axios from "axios";

axios.defaults.baseURL =
	"https://damp-sierra-19444-ce61428c5941.herokuapp.com/api";

export const fetchEvents = async () => {
	try {
		const { data } = await axios.get("/events");

		return data;
	} catch (error) {
		console.log(error);
	}
};
