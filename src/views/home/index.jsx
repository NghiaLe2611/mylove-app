import { motion } from 'framer-motion';
import classes from './home.module.scss';

const fadeInUp = {
	initial: {
		y: 80,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: 'easeInOut',
		},
	},
};

const HomeApp = () => {
	return (
		<div>
			<motion.h1
				className={classes.title}
				variants={fadeInUp}
				initial='initial'
				animate='animate'
				whileHover={{ scale: 1.2 }}>
				Welcome to my app
			</motion.h1>
		</div>
	);
};

export default HomeApp;
