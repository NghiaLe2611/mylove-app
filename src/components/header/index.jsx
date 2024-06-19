import { Avatar, Box, Button, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar';
import classes from './header.module.scss';
import useTitle from '@/hooks/useTitle';
import { useDispatch, useSelector } from 'react-redux';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { logout } from '@/api/auth/authService';

const Header = () => {
	const { isLoggedIn, username } = useSelector((state) => state.auth);

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const { title, icon } = useTitle();

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
						<Avatar size='sm' src='https://bit.ly/broken-link' />
					</Box>
				</Box>
			</BrowserView>
			<MobileView>
				<Box as='nav' className='flex justify-between py-3 px-5 shadow-sm shadow-b-0.5 shadow-slate-100'>
					<h1 className={classes.title}>
						{icon} {title}
					</h1>
					<Box className='flex items-center'>
						<Avatar size='sm' src='https://bit.ly/broken-link' name={username} />
						<Button variant='text' className='ml-2' onClick={handleLogout}>
							<RiLogoutBoxLine className='text-2xl' />
						</Button>
					</Box>
				</Box>
			</MobileView>
			<Sidebar isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
		</Box>
	);
};

export default Header;
