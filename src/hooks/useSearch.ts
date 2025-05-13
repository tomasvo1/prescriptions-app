'use client';

import { useMemo } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

interface IUseSearchReturnBody<T extends Record<string, string>> {
	params: T;
	search: string;
	appendSearch: (additionalParams: Record<string, string | number>) => void;
}

export function buildSearch(params?: Record<string, any> | null) {
	if (!params) return '';

	const urlParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		urlParams.set(key, String(value));
	});

	const search = urlParams.toString().replace(/\+/g, '%20');
	return search ? `?${search}` : '';
}

export function useSearch<T extends Record<string, string>>(): IUseSearchReturnBody<T> {
	const searchParams = useSearchParams();
	const router = useRouter();

	const params = useMemo(() => Array
		.from(searchParams.entries())
		.reduce((acc: Record<string, any>, [k, v]) => {
			const key = decodeURIComponent(k);
			const value = decodeURIComponent(v);

			if (acc[key]) {
				acc[key] = Array.isArray(acc[key]) ? [...acc[key], value] : [acc[key], value];
			} else {
				acc[key] = value;
			}

			return acc;
		}, {}) as T, [searchParams]);

	function updateUrl(paramsObj: Record<string, any>) {
		const search = buildSearch(paramsObj);
		router.push(`${window.location.pathname}${search}`, { scroll: false });
	}

	function appendSearch(additionalParams: Record<string, string | number>) {
		updateUrl({ ...params, ...additionalParams });
	}

	return {
		params,
		search: buildSearch(params),
		appendSearch,
	};
}
