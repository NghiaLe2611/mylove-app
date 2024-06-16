import {Avatar, Box, Image, Text} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {BrowserView, MobileView} from 'react-device-detect';
import {MdMenu, MdMenuOpen} from 'react-icons/md';
import {Link, useLocation} from 'react-router-dom';
import Sidebar from '../sidebar';
import classes from './header.module.scss';
import useTitle from '@/hooks/useTitle';

const Header = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const location = useLocation();

	const title = useTitle();

	useEffect(() => {
		setIsOpenMenu(false);
	}, [location]);

	const handleOpenMenu = () => {
		setIsOpenMenu((prev) => !prev);
	};

	const handleLogin = () => {};

	return (
		<Box as='header' className={classes.header}>
			<BrowserView>
				<Box
					as='nav'
					className='w-full grid grid-cols-[150px_1fr_150px] py-2 items-center mx-auto max-w-screen-xl'>
					<Box>
						<Link to='/' className='flex items-center'>
							<Image src='/images/love-img.png' alt='logo' maxW={`40px`} />
							<Text className='md:text-white ml-2 font-medium'>My Love App</Text>
						</Link>
					</Box>
					<Box className='flex-grow text-center'>
						<h1 className='md:text-white font-bold text-lg lg:text-[1.5rem]'>{title}</h1>
					</Box>
					<Box className='ml-auto'>
						<Avatar size='sm' src='https://bit.ly/broken-link' />
					</Box>
				</Box>
			</BrowserView>
			<MobileView>
				<Box as='nav' className='grid grid-flow-col auto-cols-auto p-3 shadow-md shadow-b-1 -shadow-spread-1 shadow-slate-200'>
					<Box>
						<Box as='button' className='md:text-white text-[28px]' onClick={handleOpenMenu}>
							{isOpenMenu ? <MdMenuOpen /> : <MdMenu />}
						</Box>
					</Box>
					<Box className='flex-grow text-center'>
						<h1 className='md:text-white font-bold text-lg lg:text-xlc'>{title}</h1>
					</Box>
					<Box className='ml-auto'>
						<Avatar size='sm' src='https://bit.ly/broken-link' />
					</Box>
				</Box>
			</MobileView>
			<Sidebar isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
		</Box>
	);
};

export default Header;
