import { deletePhoto } from '@/api/photoApi';
import { getTripPhotos } from '@/api/travelApi';
import CustomModal from '@/components/modal';
import { useConfirm } from '@/hooks/useConfirm';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, HStack, Skeleton, Stack, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

const Photos = ({ name, activeTab, refetchPhotos, children }) => {
    const [currentImage, setCurrentImage] = useState(null);

    const imageRef = useRef(null);

    const { isFetching, data, refetch, error } = useQuery({
        queryKey: ['trip_photos', name],
        queryFn: () => getTripPhotos(name),
        enabled: activeTab === 3,
    });
    const deleteMutation = useMutation({
        mutationFn: (key) => deletePhoto(key),
        onSuccess: (data) => {
            showToast(data?.message || 'Success');
            refetchPhotos();
        },
        onError: (error) => {
            showToast(error.message || 'Upload failed', 'error');
        },
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useCustomToast();


    const { openDialog: handleDeleteImage, ConfirmDialog } = useConfirm({
        title: 'Delete image',
        description: `Are you sure to delete this image ?`,
        onConfirm: () => {
            if (imageRef.current) {
                deleteMutation.mutate(imageRef.current);
            }
        },
    });

    const { openDialog: handleDeleteAll, ConfirmDialog: DeleteAllDialog } = useConfirm({
        title: 'Delete all images',
        description: `Are you sure to delete this all images ?`,
        onConfirm: () => {
            if (imageRef.current) {
                deleteMutation.mutate(imageRef.current);
            }
        },
    });

    const handleShowImage = (item) => {
        setCurrentImage(item);
        imageRef.current = item;
        onOpen();
    };

    const handleCloseImage = () => {
        setCurrentImage(null);
        imageRef.current = null;
        onClose();
    };



    if (isFetching) {
        return (
            <Stack>
                <Skeleton height='150px' />
                <Skeleton height='150px' />
                <Skeleton height='150px' />
            </Stack>
        );
    }

    return (
        <div>
            {children}

            {data?.data.length > 0 ? (
                <>
                    <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>
                        {data.data.map((item) => (
                            <div key={item} onClick={() => handleShowImage(item)}>
                                <img src={`${import.meta.env.VITE_TEBI_URL}/${item}`} alt='item' />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='text-center text-lg my-5'>Photos is now empty.</div>
            )}

            <CustomModal title={currentImage} isOpen={isOpen} onClose={handleCloseImage}>
                <div className='mb-4'>
                    {currentImage && <img src={`${import.meta.env.VITE_TEBI_URL}/${currentImage}`} alt={currentImage} />}
                </div>
                <HStack spacing={2} justifyContent='center'>
                    <Button colorScheme='red' onClick={handleDeleteImage}>
                        Delete
                    </Button>
                    <Button bg='gray.400' onClick={handleCloseImage} className='!text-white'>
                        Cancel
                    </Button>
                </HStack>
            </CustomModal>

            <ConfirmDialog key={currentImage} />
        </div>
    );
};

export default Photos;
