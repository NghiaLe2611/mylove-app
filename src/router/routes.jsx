import NotFound from '@/components/NotFound';
import Template1 from '@/components/Template1';
import Template2 from '@/components/Template2';

const routes = [
	{
		path: '/',
		element: <Template1 />,
		loader: <div>Loading...</div>,
		// children: [

		// ],
	},
    {
		path: '/tempplate2',
		element: <Template2 />,
		loader: <div>Loading...</div>,
		// children: [

		// ],
	},
	{path: '*', element: <NotFound />},
];

export default routes;
