'use client';

import React, {
	useState,
	ReactNode,
	useContext,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react';

import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, XCircle, X } from '@phosphor-icons/react';

import { Snackbar, SnackbarCloseReason, IconButton } from '@mui/material';


type ISnackbarType = 'success' | 'error';
type ISnackbarMessage = string | ReactNode;


export type ISnackbarData = ISnackbarMessage | { type: ISnackbarType; message: ISnackbarMessage; };


interface ISnackbar {
	id: string;
	type: ISnackbarType;
	message: ISnackbarMessage;
}


interface Context {
	snackbars: ISnackbar[];
	displaySnackbar: (snackbarData: ISnackbarData) => string;
	removeSnackbar: (id: string) => void;
}


const MAX_STACK_SIZE = 1;
const AUTO_HIDE_DURATION = 5 * 1000;


const SnackbarsContext = React.createContext<{
	snackbars: ISnackbar[];
	setSnackbars: Dispatch<SetStateAction<ISnackbar[]>>;
} | undefined>(undefined);


function SnackbarsProvider({ children }: { children: ReactNode; }) {
	const [snackbars, setSnackbars] = useState<ISnackbar[]>([]);

	useEffect(() => {
		return () => {
			setSnackbars([]);
		};
	}, []);

	return (
		<SnackbarsContext.Provider value={{ snackbars, setSnackbars }}>
			{children}
			{snackbars.map(snackbar => {
				function onClose(_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) {
					if (reason === 'clickaway') {
						return;
					}
					setSnackbars(s => s.filter(x => x.id !== snackbar.id));
				}

				return (
					<Snackbar
						key={snackbar.id}
						open={true}
						autoHideDuration={AUTO_HIDE_DURATION}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						onClose={onClose}
						message={
							<div className="flex gap-2">
								{snackbar.type === 'success' && (
									<CheckCircle
										className="w-5 h-5 fill-green-600"
										size={20}
									/>
								)}
								{snackbar.type === 'error' && (
									<XCircle
										className="w-5 h-5 fill-red-600"
										size={20}
									/>
								)}
								{snackbar.message}
							</div>
						}
						action={
							<IconButton onClick={onClose} size="small">
								<X className="fill-white" />
							</IconButton>
						}
					/>
				);
			})}
		</SnackbarsContext.Provider>
	);
}


function useSnackbars(): Context {
	const context = useContext(SnackbarsContext);

	if (context === undefined) {
		throw new Error('useSnackbars must be used within a SnackbarsContext');
	}

	const { snackbars, setSnackbars } = context;

	function removeSnackbar(id: string) {
		setSnackbars(s => s.filter(x => x.id !== id));
	}

	function displaySnackbar(snackbarData: ISnackbarData) {
		const id = uuidv4();
		let snackbar: Partial<ISnackbar> = { id };

		if (typeof snackbarData !== 'object') {
			snackbar = {
				type: 'success',
				message: snackbarData as ISnackbarMessage,
				...snackbar,
			};
		} else {
			snackbar = {
				...(snackbarData),
				...snackbar,
			} as ISnackbar;
		}

		setSnackbars(s => {
			if (s.length === MAX_STACK_SIZE) {
				s.pop();
			}
			return [snackbar as ISnackbar, ...s];
		});

		return id;
	}

	return { snackbars, displaySnackbar, removeSnackbar };
}


export { useSnackbars, SnackbarsProvider };
