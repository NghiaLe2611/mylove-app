import { authActions } from '@/redux/features/auth/authSlice';
import { authLogin } from './authApi';
import Cookies from 'js-cookie';

// Handle user login
export const login = async (user, dispatch, navigate, alertFn) => {
	try {
		const res = await authLogin({
			email: user.email,
			password: user.password,
		});

		console.log(123, res.status);

		const { message, access_token } = res.data;
		if (res.status === 200) {
			console.log(message);
			// alert({
			// 	severity: 'success',
			// 	message: 'Login successfully !',
			// 	callback: () => {
			// 		dispatch(
			// 			authActions.loginSuccess({
			// 				email: user.email,
			// 			}),
			// 		);
			// 	},
			// });

			dispatch(authActions.loginSuccess({ email: user.email, access_token }));
            Cookies.set('access_token', access_token);

			if (navigate) {
				navigate('/');
			}
		} else {
			console.log('error');
			// alert({ severity: 'error', message: message || 'Login failed !' });
		}
	} catch (err) {
		console.log('error', err);
		// dispatch(authActions.loginFailed());
		// const message = err.response?.data?.message || 'Login failed !';
		// alert({ severity: 'error', message: message });
	}
};
