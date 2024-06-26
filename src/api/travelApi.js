import axiosClient from '@/api/axiosClient';
import { travelApiEndpoint } from '@/constants';

export const getAllTrips = async () => {
	try {
		const res = await axiosClient(import.meta.env.VITE_API_URL + `${travelApiEndpoint}/travel-list`);
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
		const res = await axiosClient.post(import.meta.env.VITE_API_URL + `${travelApiEndpoint}/add`, item);
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
		const res = await axiosClient.put(import.meta.env.VITE_API_URL + `${travelApiEndpoint}/${item.id}`, item.data);
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
		const res = await axiosClient(import.meta.env.VITE_API_URL + `${travelApiEndpoint}/${id}`);
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

export const addDestination = async (item) => {
	try {
		const res = await axiosClient.post(import.meta.env.VITE_API_URL + `${travelApiEndpoint}/add/destination`, item);
		return res.data;
	} catch (err) {
		if (err.response) {
			throw err;
		} else {
			throw new Error(err);
		}
	}
};
