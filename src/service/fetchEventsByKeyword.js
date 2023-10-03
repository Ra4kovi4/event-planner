import axios from 'axios';

export const fetchEventsByKeyword = async (query, page, limit) => {
    try {
        const { data } = await axios.get(
            `/events/search?query=${query}&page=${page}&limit=${limit}`
        );

        return data.data.events;
    } catch (error) {
        console.log(error);
    }
};
