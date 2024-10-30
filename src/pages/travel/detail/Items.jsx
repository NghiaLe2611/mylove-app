import { editTrip } from '@/api/travelApi';
import { useConfirm } from '@/hooks/useConfirm';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, Card, CardBody, Image, Link } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './items.module.scss';
import { formatDate } from '@/utils';

const Items = ({ data, id, refetch }) => {
    // const navigationPrevRef = useRef(null);
    // const navigationNextRef = useRef(null);
    // const swiperRef = useRef(null);

    // const updateNavigationDisabled = () => {
    // 	if (!swiperRef.current || !swiperRef.current.swiper) return;

    // 	const { activeIndex } = swiperRef.current.swiper;

    // 	if (navigationPrevRef.current) {
    // 		navigationPrevRef.current.disabled = activeIndex === 0;
    // 	}

    // 	if (navigationNextRef.current) {
    // 		navigationNextRef.current.disabled = activeIndex === data.length - 1;
    // 	}
    // };
    const queryClient = useQueryClient();
    const idRef = useRef(null);
    const showToast = useCustomToast();

    const mutation = useMutation({
        mutationFn: editTrip,
        onSuccess: (data) => {
            const { message } = data;
            showToast(message, null, 'bottom');
            queryClient.invalidateQueries(['detail_destination', id]);
        },
        onError: (error, variables, context) => {
            const errMsg = error.response?.data?.message || error.message;
            alert(errMsg);
            showToast(errMsg, 'error', 'bottom');
        },
    });

    const { openDialog, ConfirmDialog } = useConfirm({
        title: 'Delete destination',
        description: `Are you sure to delete this destination ?`,
        onConfirm: () => {
            if (idRef.current) {
                mutation.mutate({
                    id,
                    data: {
                        id: idRef.current,
                        action: 'delete',
                        destination: data,
                    },
                });
            }
        },
    });

    const handleDeleteDestination = (e, item) => {
        e.stopPropagation();
        idRef.current = item._id;
        openDialog();
    };

    if (data && data.length) {
        return (
            <div className='md:grid md:grid-cols-2 gap-4 lg:gap-8'>
                {data.map((item) => (
                    <div key={item.name} className='w-full'>
                        <Card className='h-full'>
                            <CardBody className='relative'>
                                <Button
                                    variant='ghost'
                                    colorScheme='red'
                                    className='!rounded-full !w-8 !h-8 !p-0 !min-w-0 !absolute top-1 right-1'
                                    // icon={<MdClear />}
                                    onClick={(e) => handleDeleteDestination(e, item)}>
                                    <MdClear />
                                </Button>
                                <Swiper slidesPerView={'auto'} spaceBetween={5} className='mb-2'>
                                    {item.images.length ? (
                                        Array.isArray(item.images) ? (
                                            item.images.map((img, index) => (
                                                <SwiperSlide
                                                    key={`${img}-${index}`}
                                                    className={classNames('!md:w-auto', {
                                                        '!w-[150px]': item.images.length > 1,
                                                    })}>
                                                    <Image
                                                        src={img}
                                                        alt={`${item.name} ${index}`}
                                                        className='rounded-md mx-auto object-cover h-[120px] max-w-[200px]'
                                                    />
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <SwiperSlide
                                                className={classNames('!md:w-auto justify-center', {
                                                    // '!w-[150px]': item.images.length > 1,
                                                })}>
                                                <Image
                                                    src={item.images}
                                                    alt={item.images}
                                                    className='rounded-md mx-auto object-cover h-[120px] max-w-[200px]'
                                                />
                                            </SwiperSlide>
                                        )
                                    ) : (
                                        <div className='w-full'>
                                            <Image
                                                src='/images/no-image.png'
                                                alt='no-image'
                                                    className='rounded-md mx-auto object-cover h-[120px] max-w-[200px]'
                                            />
                                        </div>
                                    )}
                                </Swiper>
                                <div className='flex justify-between mb-1'>
                                    <div className={classes.title}>{item.name}</div>
                                    <div className='text-sm'>{formatDate(item.date)} - {item.time}</div>
                                </div>
                                <div className='text-sm'>
                                    {/* {item.description} */}
                                    <p dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br />') }} />
                                </div>
                                {item.map_url ? (
                                    <div className='text-right'>
                                        <Link href={item.map_url} target='_blank' className='inline-flex items-center !text-blue-700'>
                                            Map url <FaMapMarkerAlt className='ml-1' />
                                        </Link>
                                    </div>
                                ) : null}
                            </CardBody>
                        </Card>
                    </div>
                ))}
                <ConfirmDialog />
            </div>
        );
    }

    return <p>There is no destination now.</p>;

    // Show as slide
    // return data ? (
    // 	<div className='flex justify-between items-center'>
    // 		<button
    // 			ref={navigationPrevRef}
    // 			onClick={() => swiperRef.current.swiper.slidePrev()}
    // 			className={`swiper-button-prev ${classes.prev}`}></button>
    // 		<Swiper
    // 			ref={swiperRef}
    // 			slidesPerView={1}
    // 			spaceBetween={10}
    // 			allowTouchMove={false}
    // 			// navigation={true}
    // 			// navigation={{
    // 			// 	prevEl: navigationPrevRef.current,
    // 			// 	nextEl: navigationNextRef.current,
    // 			// }}
    // 			// pagination={{
    // 			// clickable: true,
    // 			// }}
    // 			modules={[Navigation]}
    // 			onBeforeInit={(swiper) => {
    // 				swiper.params.navigation.prevEl = navigationPrevRef.current;
    // 				swiper.params.navigation.nextEl = navigationNextRef.current;
    // 				updateNavigationDisabled();
    // 			}}
    // 			onSlideChange={(params) => updateNavigationDisabled()}
    // 			className='!mx-5'>
    // 			{data.map((item) => (
    // 				<SwiperSlide key={item.name} className='w-full'>
    // 					<Swiper slidesPerView={'auto'} spaceBetween={5} className='mb-2'>
    // 						{item.images.length ? (
    // 							item.images.concat(item.images).map((img, index) => (
    // 								<SwiperSlide key={`${img}-${index}`} className={item.images.length > 1 && '!w-[150px]'}>
    // 									<Image src={img} alt={`${item.name} ${index}`} className='rounded-md mx-1 object-cover h-full' />
    // 								</SwiperSlide>
    // 							))
    // 						) : (
    // 							<div className='w-full'>
    // 								<img
    // 									src='https://www.bigtextrailerworld.com/content/mu-plugins/bttw-inventory-manager/assets/img/NoPhotoAvailable.png'
    // 									alt='no-image'
    // 								/>
    // 							</div>
    // 						)}
    // 					</Swiper>
    // 					<div className='flex justify-between mb-1'>
    // 						<div className={classes.title}>{item.name}</div>
    // 						<div className='text-sm'>{moment(item.time).format('HH:mm')}</div>
    // 					</div>
    // 					<div className='text-sm'>{item.description}</div>
    // 					<div className='text-right'>
    // 						<Link href={item.map_url} target='_blank' className='inline-flex items-center !text-blue-700'>
    // 							Map url <FaMapMarkerAlt className='ml-1' />
    // 						</Link>
    // 					</div>
    // 				</SwiperSlide>
    // 			))}
    // 		</Swiper>
    // 		<button
    // 			ref={navigationNextRef}
    // 			onClick={() => swiperRef.current.swiper.slideNext()}
    // 			className={`swiper-button-next ${classes.next}`}></button>
    // 	</div>
    // ) : (
    // 	<p>There is no destination now.</p>
    // );
};

export default Items;
