import { Box } from '@chakra-ui/react';
import classes from './footer.module.scss';
import { menu } from '../sidebar';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

function getFirstSlug(str) {
    // Split the string by slashes
    const parts = str.split('/');
    // Filter out any empty strings and return the first "slug" part
    return parts.find(part => part.length > 0) || '';
}

const Footer = () => {
    const location = useLocation();
    console.log(123, location);

    const handleClick = (e, url) => {
        if (url === location.pathname || (getFirstSlug(location.pathname) === getFirstSlug(url))) {
            e.preventDefault();
        }
    };

    return (
        <Box className={classes.footer}>
            {/* <ul className='flex items-center'> */}
            {menu.map((item) => (
                <div key={item.title} className={classNames(classes.item, {
                    [classes.active]: item.url === location.pathname || (getFirstSlug(location.pathname) === getFirstSlug(item.url))
                })}>
                    {
                        <Link to={item.url}
                            onClick={(e) => handleClick(e, item.url)}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    }

                </div>
            ))}
            {/* </ul> */}
        </Box>
    );
};

export default Footer;
