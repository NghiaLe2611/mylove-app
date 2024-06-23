import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
	const toast = useToast();

	const showToast = (title, status = 'success', position = 'top-right', duration = 2000) => {
		toast({
			title,
			status: status ? status : 'success',
			position,
			duration,
			isClosable: true,
		});
	};

	return showToast;
};

export default useCustomToast;
