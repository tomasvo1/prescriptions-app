'use client';

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { Paper, Select, IconButton, MenuItem } from '@mui/material';

import { usePagination } from '@/contexts';


// 2 is for easier testing purposes as I have 4 items mocked
const entriesPerPageOptions = [2, 5, 10, 15];


function ListPagination() {
	const { meta, setPage, setPageSize } = usePagination();

	const { count, page, pageCount, size } = meta;

	const from = page && size
		? (page - 1) * size + 1
		: 1;

	const to = page && size
		? Math.min(page * size, count)
		: 1;

	return (
		<Paper classes={{ root: 'p-6 flex sm:justify-end justify-center gap-4 flex-wrap' }}>
			<Select
				value={meta.size || 10}
				size="small"
				className="sm:w-36 w-full"
				onChange={(e) => setPageSize(+e.target.value)}
			>
				{entriesPerPageOptions.map((x, idx) => (
					<MenuItem key={idx} value={x}>{x}</MenuItem>
				))}
			</Select>

			<div className="flex items-center gap-4">
				<IconButton
					aria-label="previous"
					disabled={page ? page <= 1 : true}
					color="primary"
					onClick={() => page ? setPage(+page - 1) : undefined}
				>
					<ArrowLeft />
				</IconButton>

				<span>
					{count > 0
						? `${from}-${to} out of ${count}`
						: '0 out of 0'
					}
				</span>

				<IconButton
					aria-label="next"
					color="primary"
					disabled={page && pageCount ? page >= pageCount : true}
					onClick={() => page ? setPage(+page + 1) : undefined}
				>
					<ArrowRight />
				</IconButton>
			</div>
		</Paper>
	);
}

export default ListPagination;
