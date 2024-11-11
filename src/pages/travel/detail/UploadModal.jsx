import CustomModal from '@/components/modal'
import ImageUpload from './ImageUpload'

const UploadModal = ({ name, isUpload, closeUpload }) => {
    return (
        <CustomModal title='Add photo' isOpen={isUpload} onClose={closeUpload} className='md:!max-w-[600px]'>
            <ImageUpload name={name} closeUpload={closeUpload} />
        </CustomModal>
    )
}

export default UploadModal