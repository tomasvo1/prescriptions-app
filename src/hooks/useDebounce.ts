import { useEffect, useRef } from 'react';

const DEFAULT_DELAY = 300;

export function useDebounce<T = any>(
	value: T,
	exec: (prop: T) => void,
	delay: number = DEFAULT_DELAY,
) {
	const debounce = useRef<number | undefined>(undefined);
	const didMount = useRef(false);

	useEffect(() => {
		if (!didMount.current) {
			didMount.current = true;
			return;
		}

		if (debounce.current) {
			clearTimeout(debounce.current);
		}

		debounce.current = window.setTimeout(() => {
			exec(value);
		}, delay);

		return () => {
			if (debounce.current) {
				clearTimeout(debounce.current);
				debounce.current = undefined;
			}
		};
	}, [value]);
}
