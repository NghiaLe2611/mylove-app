import Routes from '@/router/routes';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './components/animations/FadeIn';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/router/routes';

function App() {
    const element = useRoutes(routes);
	return (
		<AnimatePresence mode='wait'>
			{/* <Routes /> */}
            {React.cloneElement(element, { key: location.pathname })}
		</AnimatePresence>
	);
}

export default App;
