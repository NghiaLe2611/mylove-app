import { Box, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import classes from './sidebar.module.scss';

const Sidebar = ({ onClose, isOpen }) => {
	return (
		<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader borderBottomWidth='1px' className='bg-green-600 mb-2 !p-2'>
					<Link to='/' className='flex items-center mr-2'>
						<Image src='/images/love-img.png' alt='logo' maxW={`40px`} />
						<Text className='text-white ml-2 font-medium'>My Love</Text>
					</Link>
				</DrawerHeader>
				<Box as='ul' className={classes.sidebar}>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/gift'>Lucky Money</Link>
					</li>
					<li>
						<Link to='/travel'>Travel</Link>
					</li>
					<li>
						<Link to='/badminton'>Badminton</Link>
					</li>
					<li>
						<Link to='/diary'>Diary</Link>
					</li>
					<li>
						<Link>Sign in</Link>
					</li>
				</Box>
			</DrawerContent>
		</Drawer>
	);
};

export default Sidebar;
