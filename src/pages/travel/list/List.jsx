import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import classes from '@/assets/styles/list.module.scss';
import { Pagination } from 'swiper/modules';
import { Image } from '@chakra-ui/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const List = ({ data }) => {
	const navigate = useNavigate();
	const handleClick = (id) => {
		navigate(`/travel/${id}`);
	};
	return (
		<>
			<h3 className={classes.heading}>All Trips</h3>
			{data ? (
				<Swiper
					slidesPerView='auto'
					spaceBetween={10}
					pagination={{
						clickable: true,
					}}
					// centeredSlides={true}
					modules={[Pagination]}
					className={`${classes.slider} travel-list`}>
					{data.map((item) => (
						<SwiperSlide key={item.name} className={classes.item} onClick={() => handleClick(item._id)}>
							{item.image ? (
								<Image src={item.image} alt={item.name} className='rounded-2xl object-cover h-full' />
							) : (
								<Image src='/images/no-image.png' alt='no-image' className='rounded-2xl object-cover h-full' />
							)}
							<div className={classes.title}>{item.name}</div>
							<div className={classes.time}>{moment(item.time).format('DD/MM/YYYY')}</div>
						</SwiperSlide>
					))}
				</Swiper>
			) : null}
		</>
	);
};

export default List;
