import { Component, Suspense, lazy } from 'react';
import NotFound from '@/components/NotFound';
import Loader from '@/components/loader';
import MainLayout from '@/layouts/MainLayout';
import { useRoutes } from 'react-router-dom';
import PrivateRoute from '@/components/route/PrivateRoute';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => (
	<Suspense fallback={<Loader />}>
		<Component {...props} />
	</Suspense>
);

const HomePage = Loadable(lazy(() => import('@/pages/home')));
const AuthPage = Loadable(lazy(() => import('@/pages/auth')));
const TravelPage = Loadable(lazy(() => import('@/pages/travel')));
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
				path: '/gift',
				element: <PrivateRoute><GiftPage /></PrivateRoute>,
			},
		],
	},
	{ path: '*', element: <NotFound /> },
];

// export default routes;
export default function Routes() {
	return useRoutes(routes);
}
