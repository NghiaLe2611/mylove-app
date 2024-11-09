import React, { useCallback, useState } from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	useDisclosure,
} from '@chakra-ui/react';

export const useConfirm = ({
	title = '',
	description = '',
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	colorScheme = 'red',
	onConfirm,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
    const [confirmData, setConfirmData] = useState(null); 
	const cancelRef = React.useRef();

	const handleConfirm = useCallback(() => {
        onConfirm(confirmData);
		onClose();
    }, [confirmData, onClose, onConfirm]);

    const handleOpen = useCallback((data) => {
        setConfirmData(data);
        onOpen();
    }, []);

	const ConfirmDialog = useCallback(() => {
		return (
			<AlertDialog isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent className='!max-w-[90vw] md:!max-w-[500px]'>
						{title && (
							<AlertDialogHeader fontSize='lg' fontWeight='bold'>
								{title}
							</AlertDialogHeader>
						)}
						<AlertDialogBody>{description}</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								{cancelLabel}
							</Button>
                            <Button colorScheme={colorScheme} onClick={handleConfirm} ml={3}>
								{confirmLabel}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		);
	}, [cancelLabel, colorScheme, confirmLabel, description, handleConfirm, isOpen, onClose, title]);

    return { openDialog: handleOpen, closeDialog: onClose, ConfirmDialog };
};
