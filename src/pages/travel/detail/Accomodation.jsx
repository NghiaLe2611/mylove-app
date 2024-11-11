import { editTrip } from '@/api/travelApi';
import FormError from '@/components/form/FormError';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
	name: yup.string().required('Name is required'),
	address: yup.string().required('Address is required'),
	vehicle: yup.string().nullable().optional(),
	map: yup.string().nullable().optional(),
	vehicleMap: yup.string().nullable().optional(),
});

const Accomodation = ({ initData }) => {
	const [isEdit, setIsEdit] = useState(false);
	const showToast = useCustomToast();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: editTrip,
		onSuccess: (data) => {
			const { message } = data;
			showToast(message, null, 'bottom');
			queryClient.setQueryData(['detail_destination', initData?._id], data.data);
			setIsEdit(false);
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
		defaultValues: {
			name: '',
			address: '',
			vehicle: '',
			map: '',
			vehicleMap: '',
		},
	});

	useEffect(() => {
		if (initData && initData.place) {
			setValue('name', initData.place?.name);
			setValue('address', initData.place?.address);
			setValue('vehicle', initData.place?.vehicle);
			setValue('map', initData.place?.map);
			setValue('vehicleMap', initData.place?.vehicleMap);
		}
	}, []);

	const onSubmit = (data) => {
		const place = {};

		Object.entries(data).forEach(([key, value]) => {
			if (value) {
				place[key] = value;
			}
		});

		mutation.mutate({
			id: initData._id,
			data: {
				place,
			},
		});
	};

	return (
		<div>
			{initData?.place && Object.keys(initData.place) ? (
				<>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-4'>
							<FormControl className='flex'>
								<FormLabel className='!text-sm min-w-[90px]'>Name: </FormLabel>
								<Input
									disabled={!isEdit}
									name='name'
									className='!text-sm'
									isInvalid={Boolean(errors['name'])}
									errorBorderColor='red.500'
									{...register('name')}
									placeholder='Name'
								/>
								<FormError message={errors['name']?.message} />
							</FormControl>
							<FormControl className='flex'>
								<FormLabel className='!text-sm min-w-[90px]'>Address: </FormLabel>
								<Input
									disabled={!isEdit}
									name='address'
									className='!text-sm'
									isInvalid={Boolean(errors['address'])}
									errorBorderColor='red.500'
									{...register('address')}
									placeholder='Address'
								/>
								<FormError message={errors['address']?.message} />
							</FormControl>
							<FormControl className='flex'>
								<FormLabel className='!text-sm min-w-[90px]'>Vehicle: </FormLabel>
								<Input
									disabled={!isEdit}
									name='vehicle'
									className='!text-sm'
									{...register('vehicle')}
									placeholder='Vehicle'
								/>
							</FormControl>
							<FormControl className='flex'>
								<FormLabel className='!text-sm min-w-[90px]'>Map: </FormLabel>
								<Input disabled={!isEdit} name='map' className='!text-sm' {...register('map')} placeholder='Map' />
							</FormControl>
							<FormControl className='flex'>
								<FormLabel className='!text-sm min-w-[90px]'>Vehicle map: </FormLabel>
								<Input
									disabled={!isEdit}
									name='vehicle'
									className='!text-sm'
									{...register('vehicleMap')}
									placeholder='Vehicle map'
								/>
							</FormControl>
							<div className='space-x-2 !my-5 text-center'>
								<Button size='sm' colorScheme='blue' onClick={() => setIsEdit((prev) => !prev)}>
									{!isEdit ? 'Edit' : 'Cancel'}
								</Button>
								<Button size='sm' colorScheme='green' type='submit'>
									Save
								</Button>
							</div>
						</div>
					</form>
					<div className='space-y-1 text-sm lg:text-base'>
						{/* <p>Name: {initData.place.name}</p>
                	<p>Address: {initData.place.address}</p>
                	<div className='flex'>
                		Vehicle:&nbsp;<p dangerouslySetInnerHTML={{ __html: initData.place.vehicle }}></p>
                	</div> */}
						<div className='space-y-4 !mt-5 md:flex md:space-x-4 md:space-y-0'>
							{initData.place?.map && <div className='flex-1' dangerouslySetInnerHTML={{ __html: initData.place.map }}></div>}
							{initData.place?.vehicleMap && (
								<div className='flex-1' dangerouslySetInnerHTML={{ __html: initData.place.vehicleMap }}></div>
							)}
						</div>
					</div>
				</>
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
							<Input name='vehicle' className='!text-sm' {...register('vehicle')} placeholder='Vehicle' />
						</FormControl>
						<FormControl className='my-2'>
							<Input name='map' className='!text-sm' {...register('map')} placeholder='Map URL' />
						</FormControl>
						<FormControl className='my-2'>
							<Input name='vehicleMap' className='!text-sm' {...register('vehicleMap')} placeholder='Vehicle map' />
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
