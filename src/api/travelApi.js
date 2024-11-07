import axiosClient from '@/axios/axiosClient';
import { photoApiEndpoint, travelApiEndpoint } from '@/constants';
import { getDirectoryPhotoPath } from '@/utils';

// const API_URL = import.meta.env.VITE_API_URL;

export const getAllTrips = async () => {
    try {
        const res = await axiosClient(`${travelApiEndpoint}/list`);
        const { status_code, data } = res.data;
        if (status_code === 200) {
            return data;
        }

        return [];
    } catch (err) {
        if (err.response) {
            throw err;
        } else {
            throw new Error(err);
        }
    }
};

export const addTrip = async (item) => {
    try {
        const res = await axiosClient.post(`${travelApiEndpoint}/add`, item);
        return res.data;
    } catch (err) {
        if (err.response) {
            throw err;
        } else {
            throw new Error(err);
        }
    }
};

export const editTrip = async (item) => {
    try {
        const res = await axiosClient.put(`${travelApiEndpoint}/${item.id}`, item.data);
        return res.data;
    } catch (err) {
        if (err.response) {
            throw err;
        } else {
            throw new Error(err);
        }
    }
};

export const getDetailTrip = async (id) => {
    try {
        const res = await axiosClient(`${travelApiEndpoint}/${id}`);
        const { status_code, data } = res.data;
        if (status_code === 200) {
            return data;
        }

        throw new Error(`API Error: ${status_code}`);
    } catch (err) {
        if (err.response) {
            throw err;
        } else {
            throw new Error(err);
        }
    }
};

export const deleteTrip = async (id) => {
    try {
        const res = await axiosClient.delete(`${travelApiEndpoint}/${id}`);
        return res.data;
    } catch (err) {
        if (err.response) {
            throw err;
        } else {
            throw new Error(err);
        }
    }
};

export const getTripPhotos = async (name) => {
    const directory = getDirectoryPhotoPath(name);
    try {
        const res = await axiosClient(`${photoApiEndpoint}/${directory}`);
        return res.data;
    } catch (err) {
        if (err.response) {
            throw err;
        } else {
            throw new Error(err);
        }
    }
};

// export const addDestination = async (item) => {
// 	try {
// 		const res = await axiosClient.post(API_URL + `${travelApiEndpoint}/add/destination`, item);
// 		return res.data;
// 	} catch (err) {
// 		if (err.response) {
// 			throw err;
// 		} else {
// 			throw new Error(err);
// 		}
// 	}
// };
