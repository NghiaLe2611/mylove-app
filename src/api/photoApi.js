import axiosClient from '@/axios/axiosClient';

const uploadPhotos = async ({ files, directory, onProgress }) => {
    try {
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
    } catch (err) {
        return null;
    }
};

const deletePhoto = async (key) => {
    try {
        const response = await axiosClient.delete(`/api/photo`, {
            data: {
                key
            }
        });
        return response.data;
    } catch (err) {
        return null;
    }
};

const deleteAllPhotos = async (keys) => {
    try {
        const response = await axiosClient.delete(`/api/photo/deleteAll`, {
            data: {
                keys
            }
        });
        return response.data;
    } catch (err) {
        return null;
    }
};


export { uploadPhotos, deletePhoto, deleteAllPhotos }