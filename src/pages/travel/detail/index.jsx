import { deleteTrip, getDetailTrip } from '@/api/travelApi';
import Loader from '@/components/loader';
import { Button, Image, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdAdd, MdDelete, MdEdit, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import ActionDestinationModal from './ActionDestinationModal';
import Items from './Items';
import classes from './detail.module.scss';
import { useConfirm } from '@/hooks/useConfirm';
import useCustomToast from '@/hooks/useCustomToast';

const style = `<style>.header {display: none;}</style>`;

const Detail = () => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const [isEdit, setIsEdit] = useState();
	const { isFetching, data, refetch, error } = useQuery({
		queryKey: ['detail_destination', id],
		queryFn: () => getDetailTrip(id),
		staleTime: 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: id ? true : false,
	});
	const showToast = useCustomToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: deleteTrip,
		onSuccess: (data) => {
			const { message } = data;
			showToast(message, null, 'bottom');
			queryClient.invalidateQueries(['list_destination']);
			navigate(-1);
		},
		onError: (error, variables, context) => {
			const errMsg = error.response?.data?.message || error.message;
			alert(errMsg);
			showToast(errMsg, 'error', 'bottom');
		},
	});

	const { openDialog, ConfirmDialog } = useConfirm({
		title: 'Delete trip',
		description: `Are you sure to delete this trip ?`,
		onConfirm: () => {
			mutation.mutate(id);
		},
	});

	const handleEdit = () => {
		onOpen();
		setIsEdit(true);
	};

	const handleClose = () => {
		onClose();
		setIsEdit(false);
	};

	if (isFetching) {
		return <Loader />;
	}

	if (error) {
		const errMsg = error.response?.data?.message || error.message;
		return (
			<div className='p-4'>
				<p className='text-center mb-2'>{errMsg}</p>
				<Button
					className='!flex !mx-auto'
					colorScheme='primary'
					onClick={() => {
						navigate('/travel');
					}}>
					Back to list
				</Button>
			</div>
		);
	}

	const handleDeleteTrip = (item) => {
		openDialog();
	};

	return (
		<div className={classes.detail}>
			<div dangerouslySetInnerHTML={{ __html: style }} />

			<div className='relative h-full'>
				{data ? (
					<>
						<div className={classes.img}>
							<span
								className={classes.backBtn}
								onClick={() => {
									navigate(-1);
								}}>
								<IoIosArrowBack className='text-sm' />
							</span>
							<div className={classes.wrapBtn}>
								<Button className={classes.circleBtn} onClick={onOpen} colorScheme='green'>
									<MdAdd />
								</Button>
								<Button className={classes.circleBtn} onClick={handleEdit}>
									<MdEdit />
								</Button>
								{/* <Button className={`${classes.circleBtn} !text-white`} colorScheme='red'>
									<MdFavoriteBorder />
								</Button> */}
								<Button className={`${classes.circleBtn} !text-white`} colorScheme='red' onClick={handleDeleteTrip}>
									<MdDelete />
								</Button>
							</div>
							{data.image ? (
								<Image src={data.image} alt={data.name} className='h-full w-full object-cover' />
							) : (
								<Image
									src='https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
									alt='no-image'
									className='h-full w-full object-cover'
								/>
							)}
						</div>
						<div className={classes.content}>
							<div className='flex flex-wrap items-center justify-between mb-3 md:mb-10'>
								<h2 className={classes.title}>{data.name}</h2>
								<span>{moment(data.time).format('DD/MM/YYYY')}</span>
								<p className='w-full mt-2'>Accomodation: {data?.place}</p>
							</div>
							<Items data={data.destination} id={data._id} refetch={refetch} />
						</div>
					</>
				) : (
					<div className='p-4'>
						<p className='text-center mb-2'>Trip not found.</p>
						<Button
							className='!flex !mx-auto'
							colorScheme='primary'
							onClick={() => {
								navigate('/travel');
							}}>
							Back to list
						</Button>
					</div>
				)}
			</div>

			<ActionDestinationModal isEdit={isEdit} isOpen={isOpen} onClose={handleClose} refetchItems={refetch} editData={data} />
			<ConfirmDialog />
		</div>
	);
};

export default Detail;
