import axiosClient from '@/axios/axiosClient';
import useCustomToast from '@/hooks/useCustomToast';
import { getDirectoryPhotoPath } from '@/utils';
import { Button, HStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import { MdFileUpload } from 'react-icons/md';

const MAX_SIZE = 8;

const uploadPhotos = async ({ files, directory, onProgress }) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('files', file);
    });
    formData.append('directory', directory);
    const response = await axiosClient.post('/api/photo/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
        },
    });

    return response.data;
};

const ImageUpload = ({ name, refetchPhotos }) => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUpload, setIsUpload] = useState(false);

    const showToast = useCustomToast();

    const uploadMutation = useMutation({
        mutationFn: ({ files }) =>
            uploadPhotos({
                files,
                directory: getDirectoryPhotoPath(name),
                onProgress: setUploadProgress
            }),
        onSuccess: (data) => {
            console.log(123, data);
            setFiles([]);
            setUploadProgress(0);
            refetchPhotos();
        },
        onError: (error) => {
            showToast(error.message || 'Upload failed', 'error');
        }
    });

    const onFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Basic validation
        const validFiles = selectedFiles.filter((file) => {
            const isValid = file.type.startsWith('image/');
            const isUnderLimit = file.size <= MAX_SIZE * 1024 * 1024; // 8MB limit
            return isValid && isUnderLimit;
        });

        setFiles(validFiles);
    };

    const handleUploadPhoto = async () => {
        if (files.length === 0) {
            showToast('Please select files first', 'error');
            return;
        }

        if (files.length >= 10) {
            showToast('Max file is 10', 'error');
            return;
        }

        uploadMutation.mutate({ files });
    };

    return (
        <div className='text-center'>
            <div className='mb-4'>
                <Button
                    leftIcon={<MdFileUpload />}
                    colorScheme='green'
                    onClick={() => setIsUpload(true)}
                    className={classNames({
                        '!hidden': isUpload
                    })}>
                    Upload
                </Button>
                {isUpload && (
                    <>
                        <div className='flex items-center justify-center w-full my-3'>
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
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Max 10 photos at once and max size is 5MB</p>
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
                                <ul className='text-left px-2 list-disc'>
                                    {files.map((file, index) => (
                                        <li key={index}>
                                            {file.name} ({Math.round(file.size / 1024)} KB)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <HStack spacing={2} justifyContent='center'>
                            <Button colorScheme='green' onClick={handleUploadPhoto} disabled={files.length === 0}>
                                Upload
                            </Button>
                            <Button onClick={() => setIsUpload(false)}>Cancel</Button>
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
