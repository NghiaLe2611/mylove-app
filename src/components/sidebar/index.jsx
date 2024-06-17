import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Image,
	Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import classes from './sidebar.module.scss';
import { MdHome, MdCardGiftcard, MdOutlinePlace, MdMenuBook, MdOutlineSportsTennis, MdLogout } from 'react-icons/md';

export const menu = [
	{
		title: 'Home',
		url: '/',
		icon: <MdHome />,
	},
	{
		title: 'Lucky Money',
		url: '/gift',
		icon: <MdCardGiftcard />,
	},
	{
		title: 'Travel',
		url: '/travel',
		icon: <MdOutlinePlace />,
	},
	// {
	// 	title: 'Badminton',
	// 	url: '/badminton',
	// 	icon: <MdOutlineSportsTennis />,
	// },
	// {
	// 	title: 'Diary',
	// 	url: '/diary',
	// 	icon: <MdMenuBook />,
	// },
];

const Sidebar = ({ onClose, isOpen }) => {
	const handleLogout = () => {};

	return (
		<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
			<DrawerOverlay />
			<DrawerContent className='!bg-primary'>
				<DrawerHeader className='!p-4'>
					{/* <Link to='/' className='flex items-center mr-2 !outline-none'>
						<Image src='/images/love-img.png' alt='logo' maxW={`40px`} />
						<Text className='text-common ml-2 font-medium'>My Love</Text>
					</Link> */}
					<Box className='flex items-center'>
						<Avatar size='sm' src='https://bit.ly/broken-link' />
						<Text className='ml-4 text-base text-common'>User</Text>
					</Box>
				</DrawerHeader>
				<Divider orientation='horizontal' />
				<Box as='ul' className={classes.sidebar}>
					{menu.map((item) => (
						<li key={item.title}>
							<Link to={item.url}>
								{item.icon}
								<span>{item.title}</span>
							</Link>
						</li>
					))}
				</Box>
				<Divider orientation='horizontal' />
				<Box className='mt-auto py-5' onClick={handleLogout}>
					<Text className='text-common px-5'>Log out</Text>
				</Box>
			</DrawerContent>
		</Drawer>
	);
};

export default Sidebar;
