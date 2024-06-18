import { authActions } from '@/redux/features/auth/authSlice';
import { authLogin } from './authApi';

// Handle user login
export const login = async (user, dispatch, navigate, alertFn) => {
	try {
		const res = await authLogin({
			email: user.email,
			password: user.password,
		});

        console.log(123, res.status);

		const { message } = res.data;
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

			if (navigate) {
				navigate();
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
