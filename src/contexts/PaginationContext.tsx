'use client';

import React, {
	useState,
	useMemo,
	useContext,
	useEffect,
	useCallback,
	PropsWithChildren,
} from 'react';

import { IPaginationQuery, IPaginatedResult, IPaginatedResultMeta } from '@/types';
import { useSearch } from '@/hooks';

import { useSnackbars } from './SnackbarsContext';


type IFetcherReturn<E> = Promise<IPaginatedResult<E>>;

type IFetcher<T extends unknown[], E> = (...args: T) => IFetcherReturn<E>;

type IContext<Q extends IPaginationQuery, E = unknown> = IPaginatedResult<E> & {
	isFetching: boolean;
	setQuery: (query: Partial<Record<keyof IPaginationQuery, string>>) => void;
	setPage: (page: Q['page']) => void;
	setPageSize: (pageSize: Q['size']) => void;
};

const metaFallback: IPaginatedResultMeta = {
	count: 0,
	pageCount: 0,
	page: 1,
	size: 10,
	sort: '',
	order: 'asc',
};

const PaginationContext = React.createContext<any>(undefined);


function PaginationProvider<Q extends IPaginationQuery, E>({
	children,
	fetcher,
}: PropsWithChildren<{
	fetcher: IFetcher<[query: Q], E>;
}>) {
	const [result, setResult] = useState<IPaginatedResult<E> | null>(null);
	const [isFetching, setIsFetching] = useState(true);

	const { params, appendSearch } = useSearch();

	const { displaySnackbar } = useSnackbars();

	const fetchResult = useCallback(async () => {
		try {
			setIsFetching(true);
			const res = await fetcher(params as unknown as Q);
			setResult(res);
		} catch (e) {
			console.error(e);
			displaySnackbar({ type: 'error', message: 'Failed to load items, try again later' });
		} finally {
			setIsFetching(false);
		}
	}, [params, fetcher]);

	function setPage(page: IPaginationQuery['page']) {
		appendSearch({ page });
	}

	function setPageSize(size: IPaginationQuery['size']) {
		appendSearch({ size, page: 1 });
	}

	function setQuery(query: Partial<Record<keyof IPaginationQuery, string>>) {
		appendSearch({ ...query });
	}

	useEffect(() => {
		fetchResult();
	}, [fetchResult]);

	const value = useMemo<IContext<Q, E>>(() => ({
		isFetching,
		items: result?.items as E[] || [],
		meta: result?.meta || metaFallback,
		setPage,
		setPageSize,
		setQuery,
	}), [
		isFetching,
		result?.items,
		result?.meta,
		setPage,
		setPageSize,
		setQuery,
	]);

	return (
		<PaginationContext.Provider value={value}>
			{children}
		</PaginationContext.Provider>
	);
}


function usePagination<Q extends IPaginationQuery, E>(): IContext<Q, E> {
	const context = useContext(PaginationContext);

	if (context === undefined) {
		throw new Error('usePagination must be used within a PaginationContext');
	}

	return context as IContext<Q, E>;
}


export { usePagination, PaginationProvider };
