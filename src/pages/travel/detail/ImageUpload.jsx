import { uploadPhotos } from '@/api/photoApi';
import useCustomToast from '@/hooks/useCustomToast';
import { getDirectoryPhotoPath } from '@/utils';
import { Button, HStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MAX_SIZE = 8;
const MAX_FILES = 10;

const ImageUpload = ({ name, isUpload, closeUpload }) => {
    const queryClient = useQueryClient();
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    // const [isUpload, setIsUpload] = useState(false);

    const showToast = useCustomToast();

    const uploadMutation = useMutation({
        mutationFn: ({ files }) =>
            uploadPhotos({
                files,
                directory: getDirectoryPhotoPath(name),
                onProgress: setUploadProgress,
            }),
        onSuccess: (data) => {
            setFiles([]);
            setUploadProgress(0);
            if (data.data?.length) {
                queryClient.setQueryData(['trip_photos', name], (oldData) => {
                    const updatedData = data.data.map((item) => item.key);
                    return {
                        ...oldData,
                        data: oldData.data.concat(updatedData),
                    };
                });
            }
        },
        onError: (error) => {
            showToast(error.message || 'Upload failed', 'error');
        },
    });

    const onFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Basic validation
        const validFiles = selectedFiles.filter((file) => {
            const isValid = file.type.startsWith('image/');
            const isUnderLimit = file.size <= MAX_SIZE * 1024 * 1024;
            return isValid && isUnderLimit;
        });

        setFiles(validFiles);
    };

    const handleRemoveFile = (file) => {
        setFiles((prev) => {
            return prev.filter((item) => item.name !== file.name);
        });
    };

    const handleUploadPhoto = async () => {
        // if (files.length === 0) {
        //     showToast('Please select files first', 'error');
        //     return;
        // }
        if (files.length > MAX_FILES) {
            showToast(`Max file is ${MAX_FILES}`, 'error');
            return;
        }

        uploadMutation.mutate({ files });
    };

    const onDrop = (acceptedFiles, fileRejections) => {
        // // Handle rejected files with errors
        // fileRejections.forEach((file) => {
        //     file.errors.forEach((error) => {
        //         console.error(error.message);
        //     });
        // });
        const validFiles = acceptedFiles.filter((file) => {
            const isValid = file.type.startsWith('image/');
            const isUnderLimit = file.size <= MAX_SIZE * 1024 * 1024;
            return isValid && isUnderLimit;
        });

        setFiles(validFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
        },
        maxFiles: MAX_FILES,
        maxSize: MAX_SIZE * 1024 * 1024,
        noClick: true,
    });

    return (
        <div className='text-center'>
            <div className='mb-4'>
                {isUpload && (
                    <>
                        {/* <div className='flex items-center justify-center w-full my-3'>
                            <label
                                htmlFor='dropzone-file'
                                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                    <svg
                                        className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 20 16'>
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                        />
                                    </svg>
                                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                        <span className='font-semibold'>Click to upload</span> or drag and drop
                                    </p>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Max 10 photos at once and max size is 8MB</p>
                                </div>
                                <input
                                    id='dropzone-file'
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    onChange={onFileChange}
                                    className='hidden'
                                />
                            </label>
                        </div> */}
                        <div className='flex items-center justify-center w-full my-3'>
                            <label
                                {...getRootProps()}
                                htmlFor='dropzone-file'
                                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                <input {...getInputProps()} id='dropzone-file'
                                    type='file'
                                    multiple
                                    className='hidden'
                                    onChange={onFileChange}
                                />
                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                    <svg
                                        className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 20 16'>
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                        />
                                    </svg>
                                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                        <span className='font-semibold'>Click to upload</span> or drag and drop
                                    </p>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Max 10 photos at once and max size is 8MB</p>
                                </div>
                                <input
                                    id='dropzone-file'
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    onChange={onFileChange}
                                    className='hidden'
                                />
                            </label>
                        </div>
                        {files.length > 0 && (
                            <div className='my-2'>
                                <p className='font-bold'>Selected files:</p>
                                <ul className='text-left px-2 list-disc max-w-[400px]'>
                                    {files.map((file, index) => (
                                        <li key={index} className='flex items-center justify-between'>
                                            <span>
                                                {file.name} ({Math.round(file.size / 1024)} KB)
                                            </span>
                                            <span className='text-lg cursor-pointer text-red-500' onClick={() => handleRemoveFile(file)}>
                                                &times;
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <HStack spacing={2} justifyContent='center'>
                            <Button colorScheme='green' onClick={handleUploadPhoto} isDisabled={files.length === 0}>
                                Upload
                            </Button>
                            <Button onClick={closeUpload}>Cancel</Button>
                        </HStack>
                    </>
                )}
            </div>

            {uploadProgress > 0 && (
                <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
                    <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: `${uploadProgress}%` }}></div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
