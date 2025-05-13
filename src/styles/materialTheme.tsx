import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		background: {
			default: '#F4F6F8',
		},
		primary: {
			main: '#218354',
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 999,
				},
			},
		},
	},
});

export default theme;
