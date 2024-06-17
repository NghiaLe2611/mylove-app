import routes from '@/router/routes';
import { Box } from '@chakra-ui/react';
import { useRoutes } from 'react-router-dom';
import Header from '@/components/header/index';
import Footer from './components/footer';
import classNames from 'classnames';
import useTitle from './hooks/useTitle';

const mapClass = {
   
};

function App() {
	const element = useRoutes(routes);
	const { path } = useTitle();

	return (
		<Box display='flex' flexDirection='column' className='h-full md:p-0 relative'>
			<Header />
			<Box
				as='main'
				className={`${path ? path : 'home'} mx-auto max-w-screen-xl w-full px-3 md:px-0 pt-5 pb-16 md:pb-5 overflow-y-auto`}
				flex={1}
				px={5}>
				{element}
			</Box>
			<Footer />
		</Box>
	);
}

export default App;
