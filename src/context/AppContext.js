import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AppContext = createContext();
const AppUpdaterContext = createContext();

const PriceboardProvider = ({ children }) => {
    const [data, setData] = useState([]);

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
            <AppUpdaterContext.Provider value={dispatch}>
                {children}
            </AppUpdaterContext.Provider>
        </AppContext.Provider>
    );
};

function useAppState() {
    const state = useContext(AppContext);
    if (typeof state === 'undefined') {
        throw new Error('useAppState must be used within a PriceboardProvider');
    }

    return state;
}

function usePriceboardUpdater() {
    const dispatch = useContext(AppUpdaterContext);
    // const { setData, setTabValue, setWatchlist, setIsShowPopup, setTradeCW } = dispatch;
    if (typeof dispatch === 'undefined') {
        throw new Error('usePriceboardUpdater must be used within a PriceboardProvider');
    }

    const setData = useCallback(
        (val) => {
            dispatch.setData(val);
        },
        [dispatch]
    );

    return { setData };
}

export { PriceboardProvider, useAppState, usePriceboardUpdater };

