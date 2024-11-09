import { login } from '@/api/auth/authService';
import FadeInDown from '@/components/animations/FadeInDown';
import FadeInUp from '@/components/animations/FadeInUp';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, FormControl, FormHelperText, Image, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import classes from './auth.module.scss';
import FormError from '@/components/form/FormError';

const authSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});

const AuthPage = () => {
    const { isLoggedIn, isLogging } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
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
    
    return (
        <div className={`${classes.container} background`}>
            <FadeInDown>
                <Image src='/images/love-img.png' alt='image' width={100} className='mx-auto mb-10' />
            </FadeInDown>
            <FadeInUp>
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
                            <FormError message={errors['email']?.message} />
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
                            <FormError message={errors['password']?.message} />
                        </FormControl>
                    </div>
                    <Button type='submit' size='lg'
                        isDisabled={isLogging}
                        className='w-full !bg-primary !text-white !text-base'>
                        Login
                    </Button>
                </form>
            </FadeInUp>
        </div>
    );
};

export default AuthPage;
