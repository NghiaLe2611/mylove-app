import { editTrip } from '@/api/travelApi';
import FormError from '@/components/form/FormError';
import CustomModal from '@/components/modal';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, FormControl, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
    map: yup.string().nullable().optional(),
    date: yup.string().nullable().optional(),
    time: yup.string().nullable().optional(),
});

const FoodModal = ({ initData, isAdd, setIsAdd }) => {
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
        <CustomModal title='Add Food'
            isOpen={isAdd}
            onClose={() => setIsAdd(false)}
            className='md:!max-w-[600px]'>
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
        </CustomModal>
    );
};

export default FoodModal;
