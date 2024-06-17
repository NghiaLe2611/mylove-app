import { menu } from '@/components/sidebar';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const mapTitles = {
    '/': `My Love App`,
	'/gift': `Lucky Money ${new Date().getFullYear()}`,
	'/badminton': 'Badminton App',
	'/travel': 'Our Trip',
	'/diary': 'Our Diary',
};

const useTitle = () => {
	const location = useLocation();

	const title = useMemo(() => {
		const pageTitle = mapTitles[location.pathname];
		if (pageTitle) return pageTitle;

		return 'My Love App';
	}, [location]);

    const icon = useMemo(() => {
        const item = menu.find(item => item.url === location.pathname);
        return item.icon
    }, [location]);

	return {
		title,
		path: location.pathname.replace(/\//g, ''),
        icon
	};
};

export default useTitle;
