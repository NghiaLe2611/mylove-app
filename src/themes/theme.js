import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
	base: '0em',
	sm: '768px',
	md: '1024px',
	lg: '1280px',
	xl: '1536px',
	'2xl': '1920px',
};

const focusVisibleStyle = {
	backgroundColor: 'var(--input) !important',
	'&:focus-visible': {
		borderColor: 'var(--primary) !important',
		boxShadow: '0 0 0 1px var(--primary) !important',
	},
};

const theme = extendTheme({
	breakpoints,
	colors: {
		primary: {
			500: 'var(--primary)',
			600: 'var(--primary-01)', // hover
			700: 'var(--primary-02)', // click
		},
	},
	components: {
		Input: {
			baseStyle: () => ({
				field: focusVisibleStyle
			}),
		},
		Textarea: {
			baseStyle: () => ({
				backgroundColor: 'var(--input) !important',
				'&:focus-visible': {
					borderColor: 'var(--primary) !important',
					boxShadow: '0 0 0 1px var(--primary) !important',
				},
			}),
		},
	},
});

export { breakpoints, theme };
