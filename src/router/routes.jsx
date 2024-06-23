import NotFound from '@/components/NotFound';
import Loader from '@/components/loader';
import PrivateRoute from '@/components/route/PrivateRoute';
import MainLayout from '@/layouts/MainLayout';
import { Suspense, lazy } from 'react';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => (
	<Suspense fallback={<Loader />}>
		<Component {...props} />
	</Suspense>
);

const HomePage = Loadable(lazy(() => import('@/pages/home')));
const AuthPage = Loadable(lazy(() => import('@/pages/auth')));
const TravelPage = Loadable(lazy(() => import('@/pages/travel')));
const TravelDetail = Loadable(lazy(() => import('@/pages/travel/detail')));
const GiftPage = Loadable(lazy(() => import('@/pages/gift')));
// const BadmintonPage = Loadable(lazy(() => import('@/pages/home')));
// const DiaryPage = Loadable(lazy(() => import('@/pages/home')));

const routes = [
	{
		path: '/login',
		element: <AuthPage />,
	},
	{
		path: '',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <PrivateRoute><HomePage /></PrivateRoute>,
			},
			{
				path: '/travel',
				element: <PrivateRoute><TravelPage /></PrivateRoute>,
			},
            {
                path: '/travel/:id',
                element: <PrivateRoute><TravelDetail /></PrivateRoute>
            },
			{
				path: '/gift',
				element: <PrivateRoute><GiftPage /></PrivateRoute>,
			},
		],
	},
	{ path: '*', element: <NotFound /> },
];

export default routes;
// export default function Routes() {
// 	return useRoutes(routes);
// }
