import { getExpireTime, logout } from '@/api/auth/authService';
import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppContext = createContext();
const AppUpdaterContext = createContext();

const token = Cookies.get('access_token');

const AppProvider = ({ children }) => {
	// const { token } = useSelector((state) => state.auth);
	const [data, setData] = useState([]);

	const dispatchFn = useDispatch();

	useEffect(() => {
		const isValid = getExpireTime(token);
		if (!isValid) {
            logout(null, dispatchFn);
		}
	}, []);

	const state = useMemo(() => {
		return {
			data,
		};
	}, [data]);

	const dispatch = useMemo(() => {
		return {
			setData,
		};
	}, []);

	return (
		<AppContext.Provider value={state}>
			<AppUpdaterContext.Provider value={dispatch}>{children}</AppUpdaterContext.Provider>
		</AppContext.Provider>
	);
};

function useAppContext() {
	const state = useContext(AppContext);
	if (typeof state === 'undefined') {
		throw new Error('useAppContext must be used within a AppProvider');
	}

	return state;
}

function useAppUpdater() {
	const dispatch = useContext(AppUpdaterContext);
	// const { setData, setTabValue, setWatchlist, setIsShowPopup, setTradeCW } = dispatch;
	if (typeof dispatch === 'undefined') {
		throw new Error('useAppUpdater must be used within a AppProvider');
	}

	const setData = useCallback(
		(val) => {
			dispatch.setData(val);
		},
		[dispatch],
	);

	return { setData };
}

export { AppProvider, useAppContext, useAppUpdater };
