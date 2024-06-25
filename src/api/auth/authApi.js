import axiosClient from '@/api/axiosClient';

export const authLogin = (email) => {
	return axiosClient.post(
		`${import.meta.env.VITE_API_URL}/api/auth/login`,
		email,
		// {
		//     withCredentials: true,
		// }
	);
};

export const authLogout = (email) => {
	return axiosClient.post(
		`${import.meta.env.VITE_API_URL}/api/auth/logout`,
		{
			email,
		},
		// {
		// 	withCredentials: true,
		// },
	);
};
