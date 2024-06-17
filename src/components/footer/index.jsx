import { Box } from '@chakra-ui/react';
import classes from './footer.module.scss';
import { menu } from '../sidebar';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const Footer = () => {
    const location = useLocation();

	return (
		<Box className={`${classes.footer}`}>
			{/* <ul className='flex items-center'> */}
			{menu.map((item) => (
				<div key={item.title} className={classNames(classes.item, {
                    [classes.active]: item.url === location.pathname
                })}>
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
