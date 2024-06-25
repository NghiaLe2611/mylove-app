import classes from './home.module.scss';
import { menu } from '@/components/sidebar';
import { formatTextToHyphen } from '@/utils';
import { Card, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomeApp = () => {
	return (
		<VStack className={classes.wrapper} spacing={4} align='stretch'>
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
