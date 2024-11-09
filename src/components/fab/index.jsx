import { Button, Tooltip } from '@chakra-ui/react';
import classes from './fab.module.scss';

const Fab = ({ icon, title, handleClick, colorScheme = 'primary' }) => {
    return (
        <div className='fixed right-5 md:right-10 bottom-[90px] z-50'>
            {/* fixed right-5 bottom-[90px] z-50 */}
            {title ? (
                <Tooltip label={title}>
                    <Button className={classes.button} colorScheme={colorScheme} onClick={handleClick}>
                        {icon}
                    </Button>
                </Tooltip>
            ) : (
                <Button className={classes.button} colorScheme={colorScheme} onClick={handleClick}>
                    {icon}
                </Button>
            )}
        </div>
    );
};

export default Fab;
