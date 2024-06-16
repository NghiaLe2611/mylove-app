import { Box } from '@chakra-ui/react';
import classes from './footer.module.scss';
import { menu } from '../sidebar';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<Box className={`${classes.footer}`}>
			{/* <ul className='flex items-center'> */}
			{menu.map((item) => (
				<div key={item.title} className={classes.item}>
					<Link to={item.url}>
						{item.icon}
						<span>{item.title}</span>
					</Link>
				</div>
			))}
			{/* </ul> */}
		</Box>
	);
};

export default Footer;
