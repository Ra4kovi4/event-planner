import axios from 'axios';

export const addEvent = async credentials => {
    try {
        const response = await axios.post('/events', credentials);
        return response;
    } catch (error) {
        console.log(error);
    }
};
