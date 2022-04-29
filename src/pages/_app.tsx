import React from 'react'; // react package
import type { AppProps } from 'next/app'; // next js _app file types
import { CssBaseline, IconButton } from '@mui/material'; // mui components
import { ThemeProvider } from '@mui/material/styles'; // mui styles
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'; // close button
import { SnackbarProvider } from 'notistack'; // toast library
import { CacheProvider } from '@emotion/react'; // emotion js cache provider
import createEmotionCache from 'styles/createEmotionCache'; // custom cache creator
import theme from 'styles/theme'; // web app's custom theme
import 'styles/globals.css'; // global styles

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Ref for holding notistack close button
const notistackRef = React.createRef<null | any>();

const onClickDismiss = (key: any) => () => {
	notistackRef?.current.closeSnackbar(key);
};

type ComponentWithPageLayout = AppProps & {
	Component: AppProps['Component'] & {
		PageLayout?: any;
	};
};

export default function MyApp(props: ComponentWithPageLayout) {
	const { Component, pageProps } = props;

	return (
		<CacheProvider value={clientSideEmotionCache}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					maxSnack={3}
					ref={notistackRef}
					action={(key) => (
						<IconButton onClick={onClickDismiss(key)}>
							<CloseRoundedIcon color='inherit' />
						</IconButton>
					)}
				>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />

					{/* Main app */}

					{Component.PageLayout ? (
						<Component.PageLayout>
							<Component {...pageProps} />
						</Component.PageLayout>
					) : (
						<Component {...pageProps} />
					)}
				</SnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
