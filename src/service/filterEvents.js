import axios from 'axios';

export const filterEvents = async (page = 1, limit, category) => {
    try {
        const response = await axios.get(
            `/events/filter?category=${category}&page=${page}&limit=${limit}`
        );
        if (response.status === 200) {
            return response.data;
        } else {
            return { data: [], total: 0 };
        }
    } catch (error) {
        if (error.response.status === 404) {
            return { data: [], total: 0 };
        }
    }
};
