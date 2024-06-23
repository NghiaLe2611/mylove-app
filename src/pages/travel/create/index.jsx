import { addTrip } from '@/api/travelApi';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, FormControl, FormHelperText, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as yup from 'yup';
import classes from '@/assets/styles/modal.module.scss';
import FormError from '@/components/form/FormError';

const tripSchema = yup.object({
	name: yup.string().required(`Trip's name is required`),
	time: yup.string().required('Date is required'),
	image: yup.string().nullable().optional(),
	destination: yup.array().of(
		yup.object().shape({
			name: yup.string().required(`Destionation's name is required`),
			description: yup.string().required('Description is required'),
		}),
	),
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
		const date = new Date(data.time);
		const timestamp = date.getTime();
		const submitData = {
			...data,
			time: timestamp,
		};
		mutation.mutate(submitData);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} className='items-center' isCentered>
			<ModalOverlay />
			<ModalContent className={classes.modal}>
				<ModalHeader className={classes.header}>
					<h3>Add new trip</h3>
					<Button variant='text' className='!p-0' onClick={onClose}>
						<MdClose className='text-xl' />
					</Button>
				</ModalHeader>
				<ModalBody className='p-4 !pb-10 text-sm'>
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
								<FormError message={errors['name']?.message} />
							</FormControl>
							<FormControl className='my-2'>
								<Input
									name='time'
									className='!text-sm'
									isInvalid={Boolean(errors['time'])}
									errorBorderColor='red.500'
									placeholder='Start date'
									type='date'
									{...register('time')}
								/>
                                <FormError message={errors['time']?.message} />
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
				</ModalBody>

				{/* <ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Close
					</Button>
					<Button variant='ghost'>Secondary Action</Button>
				</ModalFooter> */}
			</ModalContent>
		</Modal>
	);
};

export default AddModal;
