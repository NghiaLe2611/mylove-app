import { motion } from 'framer-motion';

const FadeIn = ({ children, duration = 0.2, className }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: duration }} className={className}>
			{children}
		</motion.div>
	);
};

export default FadeIn;
