'use client';

import {
	ReactElement,
	ReactNode,
	SyntheticEvent,
	cloneElement,
	useMemo,
	useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { DialogProps, Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material';

interface IChildProps {
	onClick?: (event: SyntheticEvent) => void;
	href?: string;
}

interface IConfirmInterceptProps {
	children: ReactElement<IChildProps>;
	title?: string;
	text?: ReactNode;
	maxWidth?: DialogProps['maxWidth'];
	when?: boolean;
	submitButtonText?: string;
	onOpen?: () => void;
	onClose?: () => void;
	onConfirm?: () => void;
}

function ConfirmIntercept({
	children,
	title,
	text,
	maxWidth,
	submitButtonText,
	when = true,
	onOpen,
	onClose,
	onConfirm,
}: IConfirmInterceptProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { onClick, href } = children.props;
	const router = useRouter();

	const clonedElement = useMemo(
		() =>
			cloneElement(children, {
				onClick(e: SyntheticEvent) {
					e.preventDefault();
					e.stopPropagation();

					if (when) {
						setIsOpen(true);
						onOpen?.();
					} else {
						onClick?.(e);
					}
				},
			}),
		[children, when, onOpen, onClick],
	);

	function handleSubmit() {
		setIsOpen(false);
		onConfirm?.();

		if (href) {
			router.push(href);
		}

		if (onClick) {
			onClick({} as SyntheticEvent);
		}
	}

	return (
		<>
			{clonedElement}

			<Dialog
				open={isOpen && when}
				maxWidth={maxWidth}
				onClose={() => {
					setIsOpen(false);
					onClose?.();
				}}
				onSubmit={handleSubmit}
				title={title}
			>
				<DialogTitle>
					{title}
				</DialogTitle>

				{text && (
					<DialogContent>
						<p>{text}</p>
					</DialogContent>
				)}

				<DialogActions className="flex gap-2 mb-2 mr-2">
					<Button
						variant="outlined"
						onClick={() => {
							onClose?.();
							setIsOpen(false);
						}}
					>
						Cancel
					</Button>
					<Button type="submit" onClick={handleSubmit}>
						{submitButtonText || 'Submit'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}


export default ConfirmIntercept;
