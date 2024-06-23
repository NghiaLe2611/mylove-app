import { Avatar, Box, Button, HStack, Image, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar';
import classes from './header.module.scss';
import useTitle from '@/hooks/useTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { logout } from '@/api/auth/authService';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
// import { MdMenu, MdMenuOpen } from 'react-icons/md';

const Header = () => {
	const { username } = useSelector((state) => state.auth);

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const { title, icon } = useTitle();

	const { colorMode, toggleColorMode } = useColorMode();

	useEffect(() => {
		setIsOpenMenu(false);
	}, [location]);

	const handleOpenMenu = () => {
		setIsOpenMenu((prev) => !prev);
	};

	const handleLogin = () => {};

	const handleLogout = () => {
		logout(null, dispatch);
	};

	return (
		<Box as='header' className={classes.header}>
			<BrowserView>
				<Box as='nav' className='w-full grid grid-cols-[150px_1fr_150px] py-2 items-center mx-auto max-w-screen-xl'>
					<Box>
						<Link to='/' className='flex items-center'>
							<Image src='/images/love-img.png' alt='logo' maxW={`40px`} />
							<Text className='md:text-common ml-2 font-medium'>My Love App</Text>
						</Link>
					</Box>
					<Box className='flex-grow text-center'>
						<h1 className='md:text-common font-bold text-lg lg:text-[1.5rem]'>{title}</h1>
					</Box>
					<Box className='ml-auto'>
						<Avatar size='sm' src='https://bit.ly/broken-link' name={username} className='bg-primary' color='#fff' />
					</Box>
				</Box>
			</BrowserView>
			<MobileView>
				<Box as='nav' className={classes.nav}>
					<h1 className={classes.title}>
						{icon} {title}
					</h1>
					<HStack spacing={4}>
						<Avatar size='sm' src='https://bit.ly/broken-link' name={username} className='!bg-primary' color='#fff' />
						<span onClick={toggleColorMode}>
							{colorMode === 'dark' ? <MdDarkMode className='text-2xl' /> : <MdOutlineLightMode className='text-2xl' />}
						</span>
						<RiLogoutBoxLine className='text-2xl' onClick={handleLogout} />
					</HStack>
				</Box>
			</MobileView>
			<Sidebar isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
		</Box>
	);
};

export default Header;
