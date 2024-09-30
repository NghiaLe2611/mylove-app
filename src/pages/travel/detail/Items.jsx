import { Card, CardBody, Image, Link } from '@chakra-ui/react';
import { useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import classes from './items.module.scss';
import { BrowserView, MobileView } from 'react-device-detect';
import classNames from 'classnames';

const Items = ({ data }) => {
	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);
	const swiperRef = useRef(null);

	const updateNavigationDisabled = () => {
		if (!swiperRef.current || !swiperRef.current.swiper) return;

		const { activeIndex } = swiperRef.current.swiper;

		if (navigationPrevRef.current) {
			navigationPrevRef.current.disabled = activeIndex === 0;
		}

		if (navigationNextRef.current) {
			navigationNextRef.current.disabled = activeIndex === data.length - 1;
		}
	};

	if (data && data.length) {
		return (
			<div className='md:grid md:grid-cols-2 gap-4 lg:gap-8'>
				{data.map((item) => (
					<div key={item.name} className='w-full '>
						<Card>
							<CardBody>
								<Swiper slidesPerView={'auto'} spaceBetween={5} className='mb-2'>
									{item.images.length ? (
										item.images.concat(item.images).map((img, index) => (
											<SwiperSlide
												key={`${img}-${index}`}
												className={classNames('!md:w-auto', {
													'!w-[150px]': item.images.length > 1,
												})}>
												<Image
													src={img}
													alt={`${item.name} ${index}`}
													className='rounded-md mx-1 object-cover h-full w-full md:max-w-[300px]'
												/>
											</SwiperSlide>
										))
									) : (
										<div className='w-full'>
											<Image
												src='/images/no-image.png'
												alt='no-image'
												className='w-full border boder-1 md:max-w-[300px]'
											/>
										</div>
									)}
								</Swiper>
								<div className='flex justify-between mb-1'>
									<div className={classes.title}>{item.name}</div>
									<div className='text-sm'>{item.time}</div>
								</div>
								<div className='text-sm'>{item.description}</div>
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
