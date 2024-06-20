import { Button, Link } from '@chakra-ui/react';

export default function NotFound() {
	return (
		<div className='flex items-center justify-center h-full'>
			<div className='text-center'>
				<div className='font-bold text-6xl mb-5'>Oops!</div>
				<div className='font-medium text-6xl'>404</div>
				<p className='leading-10 mb-5'>The page does not exist or in development.</p>
				<Link href='/' className='bg-primary !text-white !px-5 !py-3 rounded-md !no-underline'>
					Return
				</Link>
			</div>
		</div>
	);
}
