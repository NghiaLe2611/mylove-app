import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/footer';
import Header from '@/components/header';
import useTitle from '@/hooks/useTitle';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	const { path } = useTitle();

	return (
		<Box display='flex' flexDirection='column' className='h-full md:p-0 relative'>
			<Header />
			<Box
				as='main'
				className={`${path ? path : 'home'} mx-auto max-w-screen-xl w-full px-3 md:px-0 pt-5 pb-16 md:pb-5 overflow-y-auto`}
				flex={1}
				px={5}>
				<FadeIn>
					<Outlet />
				</FadeIn>
			</Box>
			<Footer />
		</Box>
	);
};

export default MainLayout;
