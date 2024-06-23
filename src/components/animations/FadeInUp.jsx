import { motion } from 'framer-motion';
import { useMemo } from 'react';

const FadeInUp = ({ children, className, beforeVal = 50, afterVal = 0, duration = 0.4, ease = 'easeInOut' }) => {
	const fadeInUp = useMemo(() => {
		return {
			initial: {
				y: beforeVal,
				opacity: 0,
			},
			animate: {
				y: afterVal,
				opacity: 1,
				transition: {
					duration,
					ease,
				},
			},
		};
	}, [afterVal, beforeVal, duration, ease]);

	return (
		<motion.div variants={fadeInUp} initial='initial' animate='animate' className={className}>
			{children}
		</motion.div>
	);
};

export default FadeInUp;
