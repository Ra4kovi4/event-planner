import axios from 'axios';

axios.defaults.baseURL =
    'https://damp-sierra-19444-ce61428c5941.herokuapp.com/api';

export const fetchEvents = async (page, limit) => {
    try {
        const { data } = await axios.get(`/events?page=${page}&limit=${limit}`);

        return data;
    } catch (error) {
        console.log(error);
    }
};
