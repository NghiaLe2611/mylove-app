import { editTrip } from '@/api/travelApi';
import classes from '@/assets/styles/modal.module.scss';
import FormError from '@/components/form/FormError';
import useCustomToast from '@/hooks/useCustomToast';
import {
    Button,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Textarea
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as yup from 'yup';

const addSchema = yup.object({
    name: yup.string().required('Trip is required'),
    date: yup.string().required('Date is required'),
    time: yup.string().nullable().optional(),
    map_url: yup.string().nullable().optional(),
    images: yup.string().nullable().optional(),
    description: yup.string().required('Description is required'),
});

const editSchema = yup.object({
    name: yup.string().required(`Trip is required`),
    date: yup.string().required('Date is required'),
    time: yup.string().nullable().optional(),
    images: yup.string().nullable().optional(),
});

const ActionDestinationModal = ({ isOpen, onClose, refetchItems, editData, isEdit }) => {
    const showToast = useCustomToast();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        // mutationFn: isEdit ? editTrip : addDestination,
        mutationFn: editTrip,
        onSuccess: (data) => {
            const { message } = data;
            showToast(message, null, 'bottom');
            // refetchItems();
            queryClient.invalidateQueries(['detail_destination', editData?._id]);
            // queryClient.invalidateQueries('list_destination');
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
        setValue,
    } = useForm({
        reValidateMode: 'onChange',
        resolver: yupResolver(isEdit ? editSchema : addSchema),
    });

    useEffect(() => {
        if (editData && isEdit) {
            setValue('name', editData.name);
            setValue('time', moment(editData.time).format('YYYY-MM-DD'));
            setValue('images', editData.image);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData, isEdit]);

    // const { fields } = useFieldArray({
    // 	control,
    // 	name: 'images',
    // });

    const onSubmit = (data) => {
        if (isEdit) {
            const date = new Date(data.time);
            const timestamp = date.getTime();
            const submitData = {
                name: data.name,
                time: timestamp,
                images: data.images,
            };

            mutation.mutate({
                id: editData._id,
                data: submitData,
            });
        } else {
            // Add destination
            mutation.mutate({
                id: editData._id,
                data: {
                    destination: data,
                    action: 'add'
                },
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className='items-center' isCentered>
            <ModalOverlay />
            <ModalContent className={classes.modal}>
                <ModalHeader className={classes.header}>
                    <h3>{isEdit ? 'Edit trip' : 'Add new destination'}</h3>
                    <Button variant='text' className='!p-0' onClick={onClose}>
                        <MdClose className='text-xl' />
                    </Button>
                </ModalHeader>
                <ModalBody className='p-4 !pb-10 text-sm'>
                    {isEdit ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-10'>
                                <FormControl className='my-2'>
                                    <Input
                                        name='name'
                                        className='!text-sm'
                                        isInvalid={Boolean(errors['name'])}
                                        errorBorderColor='red.500'
                                        {...register('name')}
                                        placeholder={`Destination`}
                                    />
                                    <FormError message={errors['name']?.message} />
                                </FormControl>
                                <FormControl className='my-2'>
                                    <Input
                                        name='time'
                                        className='!text-sm'
                                        isInvalid={Boolean(errors['time'])}
                                        errorBorderColor='red.500'
                                        placeholder='Date'
                                        type='date'
                                        {...register('time')}
                                    />
                                    <FormError message={errors['time']?.message} />
                                </FormControl>
                                <FormControl className='my-2'>
                                    <Input
                                        name='images'
                                        className='!text-sm'
                                        isInvalid={Boolean(errors['images'])}
                                        errorBorderColor='red.500'
                                        placeholder='Image url'
                                        {...register('images')}
                                    />
                                </FormControl>
                            </div>
                            <Button type='submit' className='w-full !bg-primary !text-white !text-base' disabled={mutation.isLoading}>
                                Edit
                            </Button>
                        </form>
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
                                        placeholder={`Destination`}
                                    />
                                    <FormError message={errors['name']?.message} />
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
                                        placeholder='Start time'
                                        type='time'
                                        {...register('time')}
                                    />
                                    <FormError message={errors['time']?.message} />
                                </FormControl>
                                <FormControl className='my-2'>
                                    <Textarea
                                        name='description'
                                        className='!text-sm'
                                        isInvalid={Boolean(errors['description'])}
                                        errorBorderColor='red.500'
                                        placeholder='Description'
                                        {...register('description')}
                                    />
                                    <FormError message={errors['description']?.message} />
                                </FormControl>
                                <FormControl className='my-2'>
                                    <Input
                                        name='images'
                                        className='!text-sm'
                                        isInvalid={Boolean(errors['images'])}
                                        errorBorderColor='red.500'
                                        placeholder='Image'
                                        {...register('images')}
                                    />
                                </FormControl>
                                <FormControl className='my-2'>
                                    <Input
                                        name='map_url'
                                        className='!text-sm'
                                        isInvalid={Boolean(errors['map_url'])}
                                        errorBorderColor='red.500'
                                        placeholder='Map url'
                                        {...register('map_url')}
                                    />
                                </FormControl>
                            </div>
                            <Button type='submit' className='w-full !bg-primary !text-white !text-base' disabled={mutation.isLoading}>
                                Add
                            </Button>
                        </form>
                    )}
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

export default ActionDestinationModal;
