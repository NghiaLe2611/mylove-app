import BadmintonApp from '@/views/badminton';
import GiftApp from '@/views/gift';
import HomeApp from '@/views/home';
import TravelApp from '@/views/travel';
import NotFound from '@/components/NotFound';
// import Template1 from '@/components/Template1';
// import Template2 from '@/components/Template2';

const routes = [
	{
		path: '/',
		element: <HomeApp />,
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
	// {
	// 	path: '/template2',
	// 	element: <Template2 />,
	// 	loader: <div>Loading...</div>,
	// 	// children: [

	// 	// ],
	// },
	{ path: '*', element: <NotFound /> },
];

export default routes;
