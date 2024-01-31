import routes from '@/router/routes';
import { Box } from '@chakra-ui/react';
import { useRoutes } from 'react-router-dom';
import Header from '@/components/header/index';

function App() {
    const element = useRoutes(routes);

	return (
		<Box display='flex' flexDirection='column' className='h-full'>
			<Header />
			<Box as='main' className='mx-auto max-w-screen-xl w-full px-3 md:px-0' flex={1} py={5}>
				{element}
			</Box>
			{/* <Footer /> */}
		</Box>
	);
}

export default App;
