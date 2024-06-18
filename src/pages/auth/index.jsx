import { login } from '@/api/auth/authService';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import classes from './auth.module.scss';
import { motion } from 'framer-motion';

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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(authSchema),
	});

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		const user = {
			email: data.email,
			password: data.password,
		};
		console.log(222, user);
		login(user, dispatch, null);
	};

	return (
		<div className={classes.container}>
			<motion.div variants={fadeInUp} initial='initial' animate='animate' className='m-auto w-full'>
				<h1 className={classes.title}>
					Welcome to my app. <br /> This is app for our love.
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl className='my-6'>
						<Input
							name='email'
							size='lg'
							className='!text-base'
							{...register('email')}
							placeholder='Enter your email'
							defaultValue='nghiapro2611@gmail.com'
						/>
					</FormControl>
					<FormControl className='my-6'>
						<Input
							name='password'
							size='lg'
							className='!text-base'
							type='password'
							placeholder='Enter your password'
							{...register('password')}
						/>
					</FormControl>
					<Button type='submit' size='lg' className='w-full !bg-primary !text-white !text-base'>
						Login
					</Button>
				</form>
			</motion.div>
		</div>
	);
};

export default AuthPage;
