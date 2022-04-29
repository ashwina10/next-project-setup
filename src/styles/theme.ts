import { createTheme, ThemeOptions } from '@mui/material/styles'; // mui styles

const theme: ThemeOptions = createTheme({
	palette: {
		primary: {
			light: '#132F4C',
			main: '#001E3C',
		},
		secondary: {
			main: '#008f4f',
		},
		background: {
			default: '#ffffff',
		},
	},
	typography: {
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(
			','
		),
	},
});

export default theme;
