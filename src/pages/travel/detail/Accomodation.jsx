import { editTrip } from '@/api/travelApi';
import FormError from '@/components/form/FormError';
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
});

const Accomodation = ({ initData }) => {
	const showToast = useCustomToast();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: editTrip,
		onSuccess: (data) => {
			const { message } = data;
			showToast(message, null, 'bottom');
			queryClient.invalidateQueries(['detail_destination', initData?._id]);
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
		setValue,
	} = useForm({
		reValidateMode: 'onChange',
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		mutation.mutate({
			id: initData._id,
			data: {
				place: {
					name: data.name,
					address: data.address,
					map: data.map,
				},
			},
		});
	};

	return (
		<div>
			{initData?.place && Object.keys(initData.place) ? (
				<div className='space-y-1 text-sm lg:text-base'>
                    <p>Name: {initData.place.name}</p>
                    <p>Address: {initData.place.address}</p>
                    <div dangerouslySetInnerHTML={{ __html: initData.place.map }} className='!mt-4 max-w-full'></div>
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-10'>
						<FormControl className='my-2'>
							<Input
								name='name'
								className='!text-sm'
								isInvalid={Boolean(errors['name'])}
								errorBorderColor='red.500'
								{...register('name')}
								placeholder='Destination name'
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
						Save
					</Button>
				</form>
			)}
		</div>
	);
};

export default Accomodation;
