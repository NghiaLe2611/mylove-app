import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/redux/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
        devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});

export default store;
