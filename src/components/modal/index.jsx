import classes from '@/assets/styles/modal.module.scss';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

const CustomModal = (props) => {
    const { isOpen, onClose, title } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} className='items-center' isCentered>
            <ModalOverlay />
            <ModalContent className={classes.modal}>
                <ModalHeader className={classes.header}>
                    {title ? <h3>{title}</h3> : null}
                    <Button variant='text' className='!p-0' onClick={onClose}>
                        <MdClose className='text-xl' />
                    </Button>
                </ModalHeader>
                <ModalBody className='p-4 !pb-10 text-sm'>
                    {props.children}
                </ModalBody>
                {/* <ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Close
					</Button>
					<Button variant='ghost'>Secondary Action</Button>
				</ModalFooter> */}
            </ModalContent>
        </Modal>
    );
}

export default CustomModal;