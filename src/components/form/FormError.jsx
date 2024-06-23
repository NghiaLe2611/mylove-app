import { FormHelperText } from '@chakra-ui/react';

const FormError = ({ message }) => {
	return <FormHelperText className='!text-red-600 !text-xs font-medium !mt-1'>{message}</FormHelperText>;
};

export default FormError;
