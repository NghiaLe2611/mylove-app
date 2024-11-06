import { getTripPhotos } from '@/api/travelApi';
import { getDirectoryPhotoPath } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const Photos = ({ name, activeTab }) => {
    const { isFetching, data, refetch, error } = useQuery({
        queryKey: ['trip_photos', name],
        queryFn: () => getTripPhotos(name),
        enabled: activeTab === 3,
    });

    console.log(123, data);

    return <div>
        {
            data?.data ? (
                <div className='grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4'>
                    {
                        data.data.map(item => (
                            <div key={item}>
                                <img src={`${import.meta.env.VITE_TEBI_URL}/${item}`} alt='item' />
                            </div>
                        ))
                    }
                </div>

            ) : 'There is no photos right now.'
        }
    </div>;
};

export default Photos;
