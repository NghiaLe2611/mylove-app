import classes from './home.module.scss';
import { menu } from '@/components/sidebar';
import { formatTextToHyphen } from '@/utils';
import { Card, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// const fadeInUp = {
// 	initial: {
// 		y: 80,
// 		opacity: 0,
// 	},
// 	animate: {
// 		y: 0,
// 		opacity: 1,
// 		transition: {
// 			duration: 0.8,
// 			ease: 'easeInOut',
// 		},
// 	},
// };

const HomeApp = () => {
	return (
		<VStack className={classes.wrapper} spacing={4} align='stretch'>
			{/* <motion.h1
				className={classes.title}
				variants={fadeInUp}
				initial='initial'
				animate='animate'
				whileHover={{ scale: 1.2 }}>
				Welcome to my app
			</motion.h1> */}
			{[...menu].slice(1, menu.length).map((item) => (
				<Card className={`${classes.item} ${classes[formatTextToHyphen(item.title)]}`} key={item.title}>
					<Link to={item.url}>
						<span>{item.title}</span>
					</Link>
				</Card>
			))}
		</VStack>
	);
};

export default HomeApp;
