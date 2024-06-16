import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const mapTitle = {
	'/gift': `Lucky Money ${new Date().getFullYear()}`,
    '/badminton': 'Badminton App',
    '/travel': 'Our Trip',
    '/diary': 'Our Diary',
};

const useTitle = () => {
	const location = useLocation();

    const title = useMemo(() => {
		const pageTitle = mapTitle[location.pathname];
		if (pageTitle) return pageTitle;
        
		return 'My Love App';
	}, [location]);

	return title;
};

export default useTitle;
