import { Button, Tooltip } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import classes from './fab.module.scss';

const Fab = ({ children, title, handleClick }) => {
	return (
		<div className='fixed right-5 md:right-10 bottom-[90px] z-50'>
            {/* fixed right-5 bottom-[90px] z-50 */}
			{title ? (
				<Tooltip label={title}>
					<Button className={classes.button} colorScheme='primary' onClick={handleClick}>
						{children || <IoMdAdd />}
					</Button>
				</Tooltip>
			) : (
				<Button className={classes.button} colorScheme='primary' onClick={handleClick}>
					{children || <IoMdAdd />}
				</Button>
			)}
		</div>
	);
};

export default Fab;
