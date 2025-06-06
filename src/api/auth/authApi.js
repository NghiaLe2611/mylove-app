import axiosClient from '@/axios/axiosClient';

export const authLogin = (data) => {
    return axiosClient.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
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
