// import { useAppContext } from '@/contexts/AppContext';
import { ImBlocked } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UnAuthorizedPage = () => {
	return (
		<div className='text-xl lg:text-5xl text-center p-4 h-full flex flex-col items-center justify-center text-red-600'>
			{`You're not authorized`}
			<ImBlocked className='mt-5' />
		</div>
	);
};

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);

	if (isLoggedIn) {
		return children;
	}

    return <Navigate to='/login' />;
};

export default PrivateRoute;
