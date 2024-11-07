import { editTrip } from '@/api/travelApi';
import FormError from '@/components/form/FormError';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, Card, CardBody, FormControl, Input, Link } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { formatDate } from '@/utils';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
    map: yup.string().nullable().optional(),
    date: yup.string().nullable().optional(),
    time: yup.string().nullable().optional(),
});

const Foods = ({ initData }) => {
    const [isAdd, setIsAdd] = useState(false);
    const showToast = useCustomToast();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: editTrip,
        onSuccess: (data) => {
            const { message } = data;
            showToast(message, null, 'bottom');
            queryClient.invalidateQueries(['detail_destination', initData?._id]);
            setIsAdd(false);
        },
        onError: (error, variables, context) => {
            const errMsg = error.response?.data?.message || error.message;
            alert(errMsg);
            showToast(errMsg, 'error', 'bottom');
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        mutation.mutate({
            id: initData._id,
            data: {
                foods: data,
                action: 'add',
            },
        });
    };

    return (
        <div>
            <div className='text-center md:text-left'>
                <Button
                    onClick={() => setIsAdd((prev) => !prev)}
                    colorScheme='green'
                    className='!rounded-full !h-16 !w-16 !min-w-auto !p-2'>
                    <MdAdd size={42} />
                </Button>
            </div>
            <div className='my-4 grid md:grid-cols-2 gap-4'>
                {initData?.foods.length ? (
                    initData.foods.map((item) => (
                        <div key={item.name} className='w-full'>
                            <Card className='h-full'>
                                <CardBody className='relative'>
                                    <div className='space-y-2'>
                                        <p>Name: {item?.name}</p>
                                        <p>Address: {item?.address}</p>
                                        <p>Date: {item?.date ? formatDate(item.date) : null} {item?.time ? `- ${item.time}` : null}</p>
                                        <p>
                                            <Link href={item.map} target='_blank' className='inline-flex items-center !text-blue-600'>
                                                Map <FaMapMarkedAlt className='ml-1' />
                                            </Link>
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>There is no food now. Please add one.</p>
                )}
            </div>
            {isAdd && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-10'>
                        <FormControl className='my-2'>
                            <Input
                                name='name'
                                className='!text-sm'
                                isInvalid={Boolean(errors['name'])}
                                errorBorderColor='red.500'
                                {...register('name')}
                                placeholder='Name'
                            />
                            <FormError message={errors['name']?.message} />
                        </FormControl>
                        <FormControl className='my-2'>
                            <Input
                                name='address'
                                className='!text-sm'
                                isInvalid={Boolean(errors['address'])}
                                errorBorderColor='red.500'
                                {...register('address')}
                                placeholder='Address'
                            />
                            <FormError message={errors['address']?.message} />
                        </FormControl>
                        <FormControl className='my-2'>
                            <Input
                                name='date'
                                className='!text-sm'
                                isInvalid={Boolean(errors['date'])}
                                errorBorderColor='red.500'
                                placeholder='Date'
                                type='date'
                                {...register('date')}
                            />
                            <FormError message={errors['date']?.message} />
                        </FormControl>
                        <FormControl className='my-2'>
                            <Input
                                name='time'
                                className='!text-sm'
                                isInvalid={Boolean(errors['time'])}
                                errorBorderColor='red.500'
                                placeholder='Time of day'
                                {...register('time')}
                            />
                            <FormError message={errors['time']?.message} />
                        </FormControl>
                        <FormControl className='my-2'>
                            <Input
                                name='map'
                                className='!text-sm'
                                isInvalid={Boolean(errors['map'])}
                                errorBorderColor='red.500'
                                {...register('map')}
                                placeholder='Map URL'
                            />
                            <FormError message={errors['map']?.message} />
                        </FormControl>
                    </div>
                    <Button type='submit' className='w-full !bg-primary !text-white !text-base' disabled={mutation.isLoading}>
                        Add
                    </Button>
                </form>
            )}
            <div className='my-4 grid md:grid-cols-2 gap-4'>
                {initData?.foods.length ? (
                    initData.foods.map((item) => (
                        <div key={item.name} className='w-full'>
                            <Card className='h-full'>
                                <CardBody className='relative'>
                                    <div className='space-y-2'>
                                        <p>Name: {item?.name}</p>
                                        <p>Address: {item?.address}</p>
                                        <p>Date: {item?.date ? formatDate(item.date) : null} {item?.time ? `- ${item.time}` : null}</p>
                                        <p>
                                            <Link href={item.map} target='_blank' className='inline-flex items-center !text-blue-700'>
                                                Map <FaMapMarkedAlt className='ml-1' />
                                            </Link>
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>There is no food now. Please add one.</p>
                )}
            </div>
        </div>
    );
};

export default Foods;
