import { Box, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import classes from './header.module.scss';
import Sidebar from '../sidebar';

const Header = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setIsOpenMenu(false);
	}, [location]);

	const handleOpenMenu = () => {
		setIsOpenMenu((prev) => !prev);
	};

    const handleLogin = () => {
       
    }

	return (
		<Box as='header' className={classes.header}>
			<Box as='nav' className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
				<Link to='/' className='flex items-center mr-2'>
					<Image src='/images/love-img.png' alt='logo' maxW={`40px`} />
					<Text className='text-white ml-2 font-medium'>My Love</Text>
				</Link>
				<Box flex={1} className='hidden text-center md:block'>
					<h1 className='text-white font-bold text-lg lg:text-xl'>My Love App</h1>
				</Box>
				<Box ml='auto'>
					<Box as='button' className={`${classes['nav-item']} hidden md:block`} onClick={handleLogin}>
						Sign in
					</Box>
					<Box as='button' className='text-white text-[28px] block md:hidden' onClick={handleOpenMenu}>
						{isOpenMenu ? <MdMenuOpen /> : <MdMenu />}
					</Box>
				</Box>
			</Box>
			<Sidebar isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
		</Box>
	);
};

export default Header;
