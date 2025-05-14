'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { materialTheme } from '@/styles';
import { SnackbarsProvider } from '@/contexts';

import './globals.css';


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<title>Prescriptions app</title>
				<meta
					name="description"
					content="View prescriptions and order refills"
				/>
			</head>
			<body className="min-h-screen sm:p-6 p-4">
				<SnackbarsProvider>
					<AppRouterCacheProvider>
						<ThemeProvider theme={materialTheme}>
							<CssBaseline />
							<div className="container max-w-screen-xl mx-auto sm:p-6 p-0 flex-1 flex flex-col items-center">
								{children}
							</div>
						</ThemeProvider>
					</AppRouterCacheProvider>
				</SnackbarsProvider>
			</body>
		</html>
	);
}
