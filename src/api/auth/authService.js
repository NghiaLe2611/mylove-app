import { authActions } from '@/redux/features/auth/authSlice';
import { authLogin } from './authApi';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

// Handle user login
export const login = async (user, dispatch, navigate, toast) => {
	try {
		const res = await authLogin({
			email: user.email,
			password: user.password,
		});

		const { message, access_token } = res.data;
        const decodedToken = jwt.decode(access_token);
		if (res.status === 200) {
			dispatch(
				authActions.loginSuccess({
					email: user.email,
					access_token,
                    username: decodedToken ? decodedToken.username : 'User'
				}),
			);
			Cookies.set('access_token', access_token);

			if (toast) toast(message, 'success');
			if (navigate) navigate('/');
		} else {
			console.log('error');
			if (toast) toast(message || 'Login failed !', 'error');
		}
	} catch (err) {
		dispatch(authActions.loginFailed());
		const message = err.response?.data?.message || err?.message || 'Login failed !';
		if (toast) toast(message, 'error');
	}
};

export const logout = async (user, dispatch) => {
    dispatch(authActions.logoutSuccess());
    Cookies.remove('access_token');
};

export const getExpireTime = (token) => {
	const decodedToken = jwt.decode(token);
	if (!decodedToken) return null;

	const expireTime = decodedToken?.exp;

    // false is expired
	return new Date().getTime() < expireTime * 1000;
};
