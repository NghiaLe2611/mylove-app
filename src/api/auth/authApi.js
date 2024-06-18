import axiosClient from '@/api/axiosClient';

export const authLogin = (user) => {
	return axiosClient.post(
		'/api/auth/login',
		user,
		// {
		//     withCredentials: true,
		// }
	);
};

export const authLogout = (email) => {
	return axiosClient.post(
		'/api/auth/logout',
		{
			email,
		},
		// {
		// 	withCredentials: true,
		// },
	);
};
