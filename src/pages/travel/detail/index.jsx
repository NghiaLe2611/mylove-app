import { deleteTrip, getDetailTrip } from '@/api/travelApi';
import Loader from '@/components/loader';
import { useConfirm } from '@/hooks/useConfirm';
import useCustomToast from '@/hooks/useCustomToast';
import {
	Button,
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { IoEllipsisVerticalSharp, IoFastFood } from 'react-icons/io5';
import { MdDelete, MdEdit, MdFileUpload } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Accomodation from './Accomodation';
import ActionDestinationModal from './ActionDestinationModal';
import classes from './detail.module.scss';
import Foods from './Foods';
import ImageUpload from './ImageUpload';
import Items from './Items';
import Photos from './Photos';
import UploadModal from './UploadModal';
import FoodModal from './FoodModal';
const style = `<style>.header {display: none;}</style>`;

const tabStyles = {
	_selected: {
		bg: 'green.500',
		color: 'white',
	},
};

const Detail = () => {
	const [isEdit, setIsEdit] = useState();
	const [tabIndex, setTabIndex] = useState(0);
	const [isUpload, setIsUpload] = useState(false);
	const [isAddFood, setIsAddFood] = useState(false);
	const { id } = useParams();
	const queryClient = useQueryClient();

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

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

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

	const handleTabChange = (index) => {
		setTabIndex(index);
	};

	const handleDeleteTrip = (item) => {
		openDialog();
	};

	return (
		<div className={classes.detail}>
			<div dangerouslySetInnerHTML={{ __html: style }} />

			<div className='relative h-full'>
				{data ? (
					<>
						<div className={`${classes.img} flex items-center justify-center`}>
							<span
								className={classes.backBtn}
								onClick={() => {
									navigate(-1);
								}}>
								<IoIosArrowBack className='text-xl' />
							</span>
							<div className={classes.wrapBtn}>
								<Button
									className={classes.circleBtn}
									onClick={handleEdit}
									colorScheme='blue'
									bg='blue.500'
									title='Edit trip'>
									<MdEdit />
								</Button>
								<Button
									className={classes.circleBtn}
									onClick={onOpen}
									colorScheme='green'
									bg='green.500'
									title='Add destination'>
									<FaMapMarkerAlt />
								</Button>
								<Button
									className={classes.circleBtn}
									// isDisabled={tabIndex !== 2}
									colorScheme='orange'
									bg='orange.500'
									onClick={() => setIsAddFood(true)}
									title='Add food'>
									<IoFastFood />
								</Button>
								{/* <Button className={`${classes.circleBtn} !text-white`} colorScheme='red'>
                                    <MdFavoriteBorder />
                                </Button> */}
								<Button
									className={`${classes.circleBtn} !text-white`}
									// isDisabled={tabIndex !== 3}
									colorScheme='blue'
									bg='blue.600'
									onClick={() => setIsUpload(true)}
									title='Upload photo'>
									<MdFileUpload />
								</Button>
								<Button
									className={`${classes.circleBtn} !text-white`}
									bg='red.500'
									colorScheme='red'
									onClick={handleDeleteTrip}
									title='Delete trip'>
									<MdDelete />
								</Button>

								{/* <Popover placement='bottom'>
									<PopoverTrigger>
										<Button className={classes.circleBtn} colorScheme='yellow'>
											<IoEllipsisVerticalSharp />
										</Button>
									</PopoverTrigger>
									<PopoverContent className='!max-w-fit'>
										<PopoverBody>
											<VStack className='space-y-2'>
												<Button className={classes.circleBtn} onClick={onOpen} colorScheme='green' bg='green.500'>
													<FaMapMarkerAlt />
												</Button>
												<Button
													className={classes.circleBtn}
													// isDisabled={tabIndex !== 2}
													colorScheme='orange'
													bg='orange.500'
													onClick={() => setIsAddFood(true)}>
													<IoFastFood />
												</Button>
												<Button
													className={`${classes.circleBtn} !text-white`}
													// isDisabled={tabIndex !== 3}
													colorScheme='blue'
													bg='blue.600'
													onClick={() => setIsUpload(true)}>
													<MdFileUpload />
												</Button>
											</VStack>
										</PopoverBody>
									</PopoverContent>
								</Popover> */}
							</div>
							{data.image ? (
								<Image src={data.image} alt={data.name} className='h-full w-full object-cover' />
							) : (
								<Image src='/images/no-image.png' alt='no-image' className='object-fit max-h-[160px] max-w-[auto]' />
							)}
						</div>
						<div className={classes.content}>
							<div className='flex flex-wrap items-center justify-between mb-3 md:mb-10'>
								<h2 className={classes.title}>{data.name}</h2>
								<span>
									{moment(data.startDate).format('DD/MM/YYYY')}
									{data.endDate && ` - ${moment(data.endDate).format('DD/MM/YYYY')}`}
								</span>
								{/* <p className='w-full mt-2'>Accomodation: {data?.place}</p> */}
							</div>
							<Tabs
								// variant='enclosed-colored'
								isFitted
								isLazy
								isManual
								onChange={handleTabChange}
								index={tabIndex}>
								<TabList
									overflowY='hidden'
									sx={{
										scrollbarWidth: 'none',
										'::-webkit-scrollbar': {
											display: 'none',
										},
									}}>
									<Tab sx={tabStyles}>Accomodation</Tab>
									<Tab sx={tabStyles}>Destinations</Tab>
									<Tab sx={tabStyles}>Foods</Tab>
									<Tab sx={tabStyles}>Photos</Tab>
								</TabList>

								<TabPanels>
									<TabPanel>
										<Accomodation initData={data} />
									</TabPanel>
									<TabPanel>
										<Items data={data.destination} id={data._id} refetch={handleRefetch} />
									</TabPanel>
									<TabPanel>
										<Foods initData={data} />
									</TabPanel>
									<TabPanel>
										<Photos
											name={data.name}
											activeTab={tabIndex}
											isUpload={isUpload}
											closeUpload={() => setIsUpload(false)}
										/>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</div>
					</>
				) : null}
			</div>

			<ActionDestinationModal isEdit={isEdit} isOpen={isOpen} onClose={handleClose} refetchItems={refetch} editData={data} />
			<UploadModal name={data.name} isUpload={isUpload} closeUpload={() => setIsUpload(false)} />
			<FoodModal initData={data} isAdd={isAddFood} setIsAdd={setIsAddFood} />
			<ConfirmDialog />
		</div>
	);
};

export default Detail;

// invalidateQueries:
// Đánh dấu query là stale(cũ)
// Trigger refetch cho TẤT CẢ queries match với key pattern
// Có thể affect nhiều queries cùng lúc
// Reset entire cache của query đó

// refetch:
// Chỉ refetch một specific query instance
// Không reset cache
// Chỉ affect một query cụ thể
