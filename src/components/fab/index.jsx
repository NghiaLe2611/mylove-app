import { Button, Tooltip } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';

const Fab = ({ children, title, handleClick }) => {
	return (
		<div className='fixed right-5 bottom-[90px] z-50'>
            {/* fixed right-5 bottom-[90px] z-50 */}
			{title ? (
				<Tooltip label={title}>
					<Button className='!rounded-full !w-10 !h-10 !p-0' colorScheme='primary' onClick={handleClick}>
						{children || <IoMdAdd className='text-lg text-white' />}
					</Button>
				</Tooltip>
			) : (
				<Button className='!rounded-full !w-10 !h-10 !p-0' colorScheme='primary' onClick={handleClick}>
					{children || <IoMdAdd className='text-lg text-white' />}
				</Button>
			)}
		</div>
	);
};

export default Fab;
