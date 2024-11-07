import { addTrip } from '@/api/travelApi';
import FormError from '@/components/form/FormError';
import CustomModal from '@/components/modal';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, FormControl, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const tripSchema = yup.object({
	name: yup.string().required(`Trip's name is required`),
	startDate: yup.string().required('Start date is required'),
	endDate: yup.string().nullable().optional(),
	// place: yup.string().required('Place is required'),
	image: yup.string().nullable().optional(),
	// destination: yup.array().of(
	// 	yup.object().shape({
	// 		name: yup.string().required(`Destionation's name is required`),
	// 		description: yup.string().required('Description is required'),
	// 	}),
	// ),
});

const AddModal = ({ isOpen, onClose, refetchItems }) => {
	const showToast = useCustomToast();

	const mutation = useMutation({
		mutationFn: addTrip,
		onSuccess: (data) => {
			const { message } = data;
			showToast(message, null, 'bottom');
			refetchItems();
			onClose();
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
		resolver: yupResolver(tripSchema),
	});

	// const { fields } = useFieldArray({
	// 	control,
	// 	name: 'images',
	// });

	const onSubmit = (data) => {
		const startDate = new Date(data.startDate);

		const submitData = {
			...data,
			startDate: startDate.getTime(),
		};

		if (data.endDate) {
			submitData.endDate = new Date(data.endDate).getTime();
		}

		mutation.mutate(submitData);
	};

	return (
        <CustomModal title='Add new trip' isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-10'>
					<FormControl className='my-2'>
						<Input
							name='name'
							className='!text-sm'
							isInvalid={Boolean(errors['name'])}
							errorBorderColor='red.500'
							{...register('name')}
							placeholder='Trip'
						/>
						<FormError message={errors['place']?.message} />
					</FormControl>
					{/* <FormControl className='my-2'>
                            <Input
                                name='name'
                                className='!text-sm'
                                isInvalid={Boolean(errors['place'])}
                                errorBorderColor='red.500'
                                {...register('place')}
                                placeholder='Accomodation'
                            />
                            <FormError message={errors['name']?.message} />
                        </FormControl> */}
					<FormControl className='my-2'>
						<Input
							name='startDate'
							className='!text-sm'
							isInvalid={Boolean(errors['startDate'])}
							errorBorderColor='red.500'
							placeholder='Start date'
							type='date'
							{...register('startDate')}
						/>
						<FormError message={errors['startDate']?.message} />
					</FormControl>
					<FormControl className='my-2'>
						<Input name='endDate' className='!text-sm' placeholder='End date' type='date' {...register('endDate')} />
					</FormControl>
					<FormControl className='my-2'>
						<Input
							name='image'
							className='!text-sm'
							isInvalid={Boolean(errors['image'])}
							errorBorderColor='red.500'
							placeholder='Image url'
							{...register('image')}
						/>
					</FormControl>
				</div>
				<Button type='submit' className='w-full !bg-primary !text-white !text-base' disabled={mutation.isLoading}>
					Add
				</Button>
			</form>
		</CustomModal>
	);
};

export default AddModal;
