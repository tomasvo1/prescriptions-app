'use client';

import { useEffect } from 'react';

import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { materialTheme } from '@/styles';


interface IGlobalError {
	error: Error;
	reset: () => void;
}


export default function GlobalError({ error, reset }: IGlobalError) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html>
			<body>
				<ThemeProvider theme={materialTheme}>
					<CssBaseline />
					<div
						className="container max-w-screen-xl mx-auto flex flex-col items-center justify-center h-screen gap-6"
						role="alert"
					>
						<h2 className="text-3xl font-bold">Something went wrong</h2>
						<Button
							onClick={reset}
							aria-label="Try to recover from the error"
						>
							Try again
						</Button>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
