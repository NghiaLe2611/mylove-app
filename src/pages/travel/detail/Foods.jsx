import { formatDate } from '@/utils';
import { Card, CardBody, Link } from '@chakra-ui/react';
import { FaMapMarkedAlt } from 'react-icons/fa';

const Foods = ({ initData }) => {
    if (initData?.foods.length) {
        return (
            <div className='my-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {initData.foods.map((item) => (
                    <div key={item.name} className='w-full'>
                        <Card className='h-full'>
                            <CardBody className='relative'>
                                <div className='space-y-2'>
                                    <p>Name: {item?.name}</p>
                                    <p>Address: {item?.address}</p>
                                    <p>
                                        Date: {item?.date ? formatDate(item.date) : null} {item?.time ? `- ${item.time}` : null}
                                    </p>
                                    <p>
                                        <Link href={item.map} target='_blank' className='inline-flex items-center !text-blue-700'>
                                            Map <FaMapMarkedAlt className='ml-1' />
                                        </Link>
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }

    return <p className='text-center'>Food list is empty now.</p>;
};

export default Foods;
