'use client';

import { useState, useCallback } from 'react';

import Link from 'next/link';
import dayjs from 'dayjs';

import { Paper, CircularProgress, Button, TextField } from '@mui/material';

import { findPrescriptions } from '@/apiActions';
import type { IFindPrescriptionsRequestQuery, IPrescription } from '@/types';
import { EmptyContentPlaceholder, InfoRow, ListPagination, Page } from '@/components';
import { prescriptionFrequencyToString } from '@/utils';
import { useDebounce } from '@/hooks';
import { PaginationProvider, usePagination } from '@/contexts';


const paperClassName = 'p-6 flex flex-col gap-4';


function PrescriptionsView() {
	const fetcher = useCallback((q: IFindPrescriptionsRequestQuery) => findPrescriptions(q), []);

	return (
		<PaginationProvider fetcher={fetcher}>
			<Prescriptions />
		</PaginationProvider>
	);
}


function Prescriptions() {
	const { items, isFetching, query, setQuery } = usePagination<IFindPrescriptionsRequestQuery, IPrescription>();

	const [searchTerm, setSearchTerm] = useState(query.search || '');

	useDebounce(searchTerm, () => setQuery({ search: searchTerm }), 300);

	return (
		<Page heading="List of prescriptions">
			<Paper classes={{ root: paperClassName }}>
				<TextField
					value={searchTerm}
					placeholder="Search..."
					aria-label="Search prescriptions"
					size="small"
					onChange={e => setSearchTerm(e.target.value)}
					fullWidth
				/>
			</Paper>

			{isFetching && (
				<div className="block mx-auto min-h-14">
					<CircularProgress aria-label="Loading prescriptions list" />
				</div>
			)}

			{!items.length && !isFetching && (
				<EmptyContentPlaceholder />
			)}

			<Paper
				classes={{ root: `${paperClassName} min-h-32` }}
				component="ul"
				aria-label="Prescription list"
			>
				{items.length > 0 && items.map(prescription => (
					<li
						key={prescription.id}
						className="rounded-2xl border border-gray-300 flex flex-col gap-4 p-6"
					>
						<span className="text-lg font-bold">
							{prescription.medicineName}
						</span>

						<div className="flex justify-between flex-wrap">
							<div className="inline-grid grid-cols-2 gap-10 mb-4 sm:mb-0">
								<InfoRow label="Frequency">
									{prescriptionFrequencyToString(prescription.frequency)}
								</InfoRow>

								<InfoRow label="Valid to">
									{dayjs(prescription.endDate).format('YYYY-MM-DD')}
								</InfoRow>
							</div>

							<Button
								variant="outlined"
								component={Link}
								href={`/prescriptions/${prescription.id}`}
								aria-label={`View details for ${prescription.medicineName}`}
								className="sm:w-auto w-full"
							>
								View details
							</Button>
						</div>
					</li>
				))}
			</Paper>

			<ListPagination />
		</Page>
	);
}


export default PrescriptionsView;
