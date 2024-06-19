import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
	base: '0em',
	sm: '768px',
	md: '1024px',
	lg: '1280px',
	xl: '1536px',
	'2xl': '1920px',
};

const theme = extendTheme({
	breakpoints,
	components: {
		Input: {
			baseStyle: () => ({
				field: {
					backgroundColor: 'var(--input) !important',
					'&:focus-visible': {
						borderColor: 'var(--primary) !important',
						boxShadow: '0 0 0 1px var(--primary) !important',
					},
				},
			}),
		},
	},
});

export { breakpoints, theme };
