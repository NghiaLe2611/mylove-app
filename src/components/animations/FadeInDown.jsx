import { motion } from 'framer-motion';
import { useMemo } from 'react';

const FadeInDown = ({ children, className, beforeVal = -50, afterVal = 0, duration = 0.4, ease = 'easeInOut', delay = 0 }) => {
	const fadeInDown = useMemo(() => {
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
					delay,
				},
			},
		};
	}, [afterVal, beforeVal, delay, duration, ease]);

	return (
		<motion.div variants={fadeInDown} initial='initial' animate='animate' className={className}>
			{children}
		</motion.div>
	);
};

export default FadeInDown;
