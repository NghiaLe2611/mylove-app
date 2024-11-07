import { getTripPhotos } from '@/api/travelApi';
import { Button, HStack, Skeleton, Stack, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ImageUpload from './ImageUpload';
import { useState } from 'react';
import CustomModal from '@/components/modal';

const Photos = ({ name, activeTab }) => {
    const [currentImage, setCurrentImage] = useState(null);
    const { isFetching, data, refetch, error } = useQuery({
        queryKey: ['trip_photos', name],
        queryFn: () => getTripPhotos(name),
        enabled: activeTab === 3,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleShowImage = (item) => {
        setCurrentImage(item);
        onOpen();
    }

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
            <ImageUpload name={name} refetchPhotos={refetch} />

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

            <CustomModal title={currentImage} isOpen={isOpen} onClose={onClose}>
                <div className='mb-2'>
                    {
                        currentImage && <img src={`${import.meta.env.VITE_TEBI_URL}/${currentImage}`} alt={currentImage} />
                    }
                </div>
                <HStack spacing={2} justifyContent='center'>
                    <Button colorScheme='red'>Delete</Button>
                    <Button bg='gray.400' onClick={onClose} className='!text-white'>Cancel</Button>
                </HStack>
            </CustomModal>

        </div>
    );
};

export default Photos;
