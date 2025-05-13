'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { Button, CircularProgress, Paper, Alert } from '@mui/material';

import type { IPrescription } from '@/types';
import { getPrescription, requestARefill } from '@/apiActions';
import { Page, InfoRow, EmptyContentPlaceholder, ConfirmIntercept } from '@/components';
import { prescriptionFrequencyToString, medicineStrengthToString, medicineFormToString } from '@/utils';
import { useSnackbars } from '@/contexts';


function PrescriptionDetails() {
	const [prescription, setPrescription] = useState<IPrescription | null>(null);
	const [isPrescriptionLoading, setIsPrescriptionLoading] = useState(true);

	const { id } = useParams<{ id: string }>();
	const router = useRouter();

	const { displaySnackbar } = useSnackbars();

	const daysUntilExpires = dayjs(prescription?.endDate).diff(dayjs(), 'day');

	async function loadPrescription() {
		try {
			const res = await getPrescription(id);
			setPrescription(res);
		} catch (err) {
			console.error(err);
		} finally {
			setIsPrescriptionLoading(false);
		}
	}

	async function requestRefill(id: string) {
		try {
			await requestARefill(id);
			displaySnackbar('Refill requested');
			router.push('/prescriptions');
		} catch (err) {
			console.error(err);
			displaySnackbar({ type: 'error', message: 'Request for a refill failed' });
		}
	}

	useEffect(() => {
		loadPrescription();
	}, [id]);

	if (isPrescriptionLoading) {
		return (
			<CircularProgress className="block mx-auto" />
		);
	}

	return (
		<Page
			heading={`Prescription${prescription ? ` - ${prescription?.medicineName}` : ''}`}
			action={
				<div className="flex gap-4 mt-4 md:mt-0 md:w-fit w-full flex-wrap">
					<Button
						variant="outlined"
						component={Link}
						href="/prescriptions"
						className="md:w-auto w-full"
						startIcon={<ArrowLeft />}
					>
						Back to prescriptions
					</Button>

					{prescription && (
						<ConfirmIntercept
							title="Do you want to request a refill?"
							submitButtonText="Request a refill"
							text={`Prescription for ${prescription.medicineName} is currently valid until ${dayjs(prescription.endDate).format('YYYY-MM-DD')}`}
						>
							<Button
								className="md:w-auto w-full"
								onClick={() => requestRefill(prescription.id)}
							>
								Request a refill
							</Button>
						</ConfirmIntercept>
					)}
				</div>
			}
		>
			{prescription ? (
				<Paper classes={{ root: 'p-6 flex flex-col gap-4' }}>
					{/* Show a note that prescription expires if there's only a week or less left */}
					{daysUntilExpires > 0 && daysUntilExpires <= 7 && (
						<Alert severity="warning">
							{`Your prescription expires in ${daysUntilExpires} ${daysUntilExpires === 1 ? 'day' : 'days'}, consider requesting a refill`}
						</Alert>
					)}

					{/* Show a note if prescription has expired */}
					{daysUntilExpires <= 0 && (
						<Alert severity="warning">
							Your prescription has expired, consider requesting a refill
						</Alert>
					)}

					<div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
						<InfoRow label="Name of the medicine">
							{prescription.medicineName}
						</InfoRow>
						<InfoRow label="Dosage">
							{prescription.dosage}
						</InfoRow>
						<InfoRow label="Form">
							{prescription.form ? medicineFormToString(prescription.form) : undefined}
						</InfoRow>
						<InfoRow label="Strength">
							{prescription.strength ? medicineStrengthToString(prescription.strength) : undefined}
						</InfoRow>
						<InfoRow label="Frequency">
							{prescriptionFrequencyToString(prescription.frequency)}
						</InfoRow>
						<InfoRow label="Valid to">
							{dayjs(prescription.endDate).format('YYYY-MM-DD')}
						</InfoRow>
						<InfoRow label="Note">
							{prescription.note}
						</InfoRow>
					</div>
				</Paper>
			) : (
				<EmptyContentPlaceholder />
			)}
		</Page>
	);
}


export default PrescriptionDetails;
