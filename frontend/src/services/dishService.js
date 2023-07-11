import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const createDish = async (dish) => {
    try {
        const response = await instance.post('/dishes', dish);
        return response.data.id;
    } catch (error) {
        throw new Error(`Unable to create dish, ${error}`);
    }
};

export const deleteDish = async (id) => {
    try {
        const url = `/dishes/${id}`;
        const response = await instance.delete(url);
        return response.data;
    } catch (error) {
        throw new Error(`Unable to delete dish, ${error}`);
    }
};

export const getDishes = async (userId, date, meal) => {
    try {
        const url = `/dishes?userId=${userId}&date=${date}&meal=${meal}`;
        console.log(url)
        const response = await instance.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Unable to get dish, ${error}`);
    }
};

export const editDish = async (id, dish) => {
    try {
        const response = await instance.put(`/dishes/${id}`, dish);
        return response.data;
    } catch (error) {
        throw new Error(`Unable to eidt dish, ${error}`);
    }
};
