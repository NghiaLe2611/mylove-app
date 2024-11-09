import { deleteAllPhotos, deletePhoto } from '@/api/photoApi';
import { getTripPhotos } from '@/api/travelApi';
import Fab from '@/components/fab';
import MasonryGallery from '@/components/masonry';
import CustomModal from '@/components/modal';
import { useConfirm } from '@/hooks/useConfirm';
import useCustomToast from '@/hooks/useCustomToast';
import { Button, HStack, Skeleton, Stack, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const Photos = ({ name, activeTab, children }) => {
	const queryClient = useQueryClient();
	const [currentImage, setCurrentImage] = useState(null);

	const imageRef = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { isFetching, data, refetch, error } = useQuery({
		queryKey: ['trip_photos', name],
		queryFn: () => getTripPhotos(name),
		enabled: activeTab === 3,
	});
	const deleteMutation = useMutation({
		mutationFn: (key) => deletePhoto(key),
		onSuccess: (data) => {
			showToast(data?.message || 'Delete successfully');
			console.log(data);
			onClose();
			if (data?.key) {
				queryClient.setQueryData(['trip_photos', name], (oldData) => {
					const newData = oldData.data.filter((item) => item !== data.key);
					return {
						...oldData,
						data: newData,
					};
				});
			}
		},
		onError: (error) => {
			showToast(error.message || 'Delete failed', 'error');
		},
	});
	const deleteAllMutation = useMutation({
		mutationFn: (keys) => deleteAllPhotos(keys),
		onSuccess: (data) => {
			showToast(data?.message || 'Delete successfully');
			if (data?.keys) {
				queryClient.setQueryData(['trip_photos', name], (oldData) => {
					const newData = oldData.data.filter((item) => !data.keys.includes(item));
					return {
						...oldData,
						data: newData,
					};
				});
			}
		},
		onError: (error) => {
			showToast(error.message || 'Delete failed', 'error');
		},
	});

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
		description: `Are you sure to delete all images ?`,
		onConfirm: (res) => {
			if (res) {
				deleteAllMutation.mutate(res);
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

	const openDeleteAllDialog = () => {
		handleDeleteAll(data?.data);
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
				<MasonryGallery>
					{data.data.map((item) => (
						<div key={item} onClick={() => handleShowImage(item)}>
							<img src={`${import.meta.env.VITE_TEBI_URL}/${item}`} alt={item} />
						</div>
					))}
				</MasonryGallery>
			) : (
				<div className='text-center text-lg my-5'>Photos is now empty.</div>
			)}

			<CustomModal title={currentImage} isOpen={isOpen} onClose={handleCloseImage} className='md:!max-w-[600px]'>
				<div className='h-full'>
					<div className='mb-4'>
						{currentImage && (
							<img
								src={`${import.meta.env.VITE_TEBI_URL}/${currentImage}`}
								alt={currentImage}
								className='md:max-h-[600px] m-auto'
							/>
						)}
					</div>
					<HStack spacing={2} justifyContent='center'>
						<Button colorScheme='red' onClick={handleDeleteImage}>
							Delete
						</Button>
						<Button bg='gray.400' onClick={handleCloseImage} className='!text-white'>
							Cancel
						</Button>
					</HStack>
				</div>
			</CustomModal>

			<ConfirmDialog />
			<DeleteAllDialog />
			{data?.data.length ? (
				<Fab handleClick={openDeleteAllDialog} icon={<RiDeleteBin6Fill />} colorScheme='red' title='Delete all' />
			) : null}
		</div>
	);
};

export default Photos;
