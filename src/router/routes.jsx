import NotFound from '@/components/NotFound';
import Template1 from '@/components/Template1';
import Template2 from '@/components/Template2';
import BadmintonApp from '@/views/badminton';
import GiftApp from '@/views/gift';
import TravelApp from '@/views/travel';

const routes = [
	{
		path: '/',
		element: <div>
			<h1 className='text-xl font-bold text-center my-5'>Welcome</h1>
		</div>,
		loader: <div>Loading...</div>,
		// children: [

		// ],
	},
    {
		path: '/gift',
		element: <GiftApp />,
		loader: <div>Loading...</div>,
	},
    {
		path: '/badminton',
		element: <BadmintonApp />,
		loader: <div>Loading...</div>,
	},
    {
		path: '/travel',
		element: <TravelApp />,
		loader: <div>Loading...</div>,
	},
    {
		path: '/template2',
		element: <Template2 />,
		loader: <div>Loading...</div>,
		// children: [

		// ],
	},
	{path: '*', element: <NotFound />},
];

export default routes;
