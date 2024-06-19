import { login } from '@/api/auth/authService';
import { Button, FormControl, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import classes from './auth.module.scss';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import useCustomToast from '@/hooks/useCustomToast';
import classNames from 'classnames';

const authSchema = yup.object().shape({
	email: yup.string().required('Email is required'),
	password: yup.string().required('Password is required'),
});

const fadeInUp = {
	initial: {
		y: 80,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

const AuthPage = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(authSchema),
	});

	const dispatch = useDispatch();
	const showToast = useCustomToast();

	const onSubmit = (data) => {
		const user = {
			email: data.email,
			password: data.password,
		};
		login(user, dispatch, null, showToast);
	};

	if (isLoggedIn) {
		return <Navigate to='/' />;
	}

	console.log(errors['email']);

	return (
		<div className={`${classes.container} background`}>
			<motion.div variants={fadeInUp} initial='initial' animate='animate' className='m-auto w-full'>
				<h1 className={classes.title}>
					Welcome to my app. <br /> This is app for our love.
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-10'>
						<FormControl className='my-6'>
							<Input
								name='email'
								size='lg'
								className={classNames('!text-base')}
								isInvalid={Boolean(errors['email'])}
								errorBorderColor='red.500'
								{...register('email')}
								placeholder='Enter your email'
								defaultValue='nghiapro2611@gmail.com'
							/>
							<FormHelperText className='!text-red-600 font-medium'>{errors['email']?.message}</FormHelperText>
						</FormControl>
						<FormControl className='my-6'>
							<Input
								name='password'
								size='lg'
								className={classNames('!text-base')}
								isInvalid={Boolean(errors['email'])}
								errorBorderColor='red.500'
								type='password'
								placeholder='Enter your password'
								{...register('password')}
							/>
							<FormHelperText className='!text-red-600 font-medium'>{errors['password']?.message}</FormHelperText>
						</FormControl>
					</div>
					<Button type='submit' size='lg' className='w-full !bg-primary !text-white !text-base'>
						Login
					</Button>
				</form>
			</motion.div>
		</div>
	);
};

export default AuthPage;
