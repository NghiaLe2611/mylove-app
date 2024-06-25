import { getAllTrips } from '@/api/travelApi';
import FadeInDown from '@/components/animations/FadeInDown';
import Fab from '@/components/fab';
import { useQuery } from '@tanstack/react-query';
import List from './list/List';
import AddModal from './create';
import { useDisclosure } from '@chakra-ui/react';
import FavoriteList from './favorite/FavoriteList';

const TravelApp = () => {
	const { isLoading, isFetching, refetch, data } = useQuery({
		queryKey: ['list_destination'],
		queryFn: () => getAllTrips(),
		staleTime: 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	if (isLoading) {
		return (
			<div className='flex flex-col h-full'>
				<FadeInDown>
					<div className='flex items-center mb-6 font-bold text-3xl md:text-4xl'>
						<p>
							{`Let's Plan `}
							<br className='md:hidden' />
							Your <span className='text-primary'>Vacation</span>
						</p>
						<img src='/images/plane.png' alt='plane' className='ml-10' width={40} />
					</div>
				</FadeInDown>
			</div>
		);
	}
	return (
		<div className='flex flex-col h-full'>
			<FadeInDown>
				<div className='flex items-center mb-6 font-bold text-3xl md:text-4xl'>
					<p>
						{`Let's Plan `}
						<br className='md:hidden' />
						Your <span className='text-primary'>Vacation</span>
					</p>
					<img src='/images/plane.png' alt='plane' className='ml-10' width={40} />
				</div>
			</FadeInDown>
			{/* {isFetching ? (
				<div className='text-center p-5'>
					<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='green.500' size='lg' />
				</div>
			) : null} */}
			{data?.length ? (
				<div className='flex-1'>
					<List data={data} />
					<FavoriteList data={data} />
				</div>
			) : (
				<div className='flex-1 flex items-center justify-center'>No destination now. Please add one !</div>
			)}

			<Fab handleClick={onOpen} />
			<AddModal isOpen={isOpen} onClose={onClose} refetchItems={refetch} />
		</div>
	);
};

export default TravelApp;
