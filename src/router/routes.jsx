import BadmintonApp from '@/views/badminton';
import GiftApp from '@/views/gift';
import HomeApp from '@/views/home';
import TravelApp from '@/views/travel';
import NotFound from '@/components/NotFound';
import Loader from '@/components/loader';
// import Template1 from '@/components/Template1';
// import Template2 from '@/components/Template2';

const routes = [
	{
		path: '/',
		element: <HomeApp />,
		loader: <Loader />,
		// children: [

		// ],
	},
	{
		path: '/gift',
		element: <GiftApp />,
		loader: <Loader />,
	},
	{
		path: '/badminton',
		element: <BadmintonApp />,
		loader: <Loader />,
	},
	{
		path: '/travel',
		element: <TravelApp />,
		loader: <Loader />,
	},
    {
		path: '/login',
		element: <TravelApp />,
		loader: <Loader />,
	},
	// {
	// 	path: '/template2',
	// 	element: <Template2 />,
	// 	loader: <Loader />,
	// 	// children: [

	// 	// ],
	// },
	{ path: '*', element: <NotFound /> },
];

export default routes;
