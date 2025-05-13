// This file contains stub api prescriptions. With proper API, these would be just reusable functions
// for api calls

import {
	type IFindPrescriptionsRequestQuery,
	type IFindPrescriptionsResponseBody,
	type IGetPrescriptionResponseBody,
	type IPrescription,
	PrescriptionFrequencies,
	MedicineForms,
	MedicineStrengths,
} from '@/types';

const mockPrescriptions: IGetPrescriptionResponseBody[] = [
	{
		id: '5e47131d-0ec0-4413-9c8c-cdcc990bdb67',
		endDate: new Date('2025-06-01'),
		frequency: PrescriptionFrequencies['28day'],
		strength: MedicineStrengths.FiveHundred,
		note: 'Take after meals',
		form: MedicineForms.tablets,
		dosage: '1 tablet 3 times a day',
		medicineName: 'Amoxicillin',
	},
	{
		id: 'edcb5d18-22b1-419a-94e2-9025ace934de',
		endDate: new Date('2025-06-15'),
		frequency: PrescriptionFrequencies['56day'],
		strength: MedicineStrengths.EightFifty,
		note: 'Before bed',
		form: MedicineForms.powder,
		dosage: '2 scoops once a day',
		medicineName: 'Powdered good medicine',
	},
	{
		id: '407097a0-b3cf-42ba-8633-fd39306fd8a8',
		endDate: new Date('2025-05-17'),
		frequency: PrescriptionFrequencies.asNeeded,
		strength: MedicineStrengths.EightFifty,
		note: 'Before bed',
		form: MedicineForms.powder,
		dosage: '2 scoops once a day',
		medicineName: 'GSK Good stuff',
	},
	{
		id: '149495eb-afee-41a8-b5a3-72c0d9be9c86',
		endDate: new Date('2025-05-27'),
		frequency: PrescriptionFrequencies.custom,
		note: 'First thing in the morning, one hour before breakfast',
		form: MedicineForms.infusionBags,
		dosage: '2 units once a day',
		medicineName: 'Mega infusion bags',
	},
];


export function findPrescriptions(
	query?: IFindPrescriptionsRequestQuery,
): Promise<IFindPrescriptionsResponseBody> {
	// Page and size ideally should be managed via provider/wrapper of some sort. E.g. Pagination provider that
	// could always controls the list, its query, loader states etc.
	const page = query?.page ?? 1;
	const size = query?.size ?? 10;
	const search = query?.search?.toLowerCase();

	const startIndex = (page - 1) * size;
	const endIndex = startIndex + size;

	const filtered = search
		? mockPrescriptions.filter(x => x.medicineName.toLowerCase().includes(search))
		: mockPrescriptions;

	const paginatedItems = filtered.slice(startIndex, endIndex);

	return Promise.resolve({
		items: paginatedItems,
		meta: {
			count: filtered.length,
			page,
			size,
			pageCount: Math.ceil(filtered.length / size),
			sort: query?.sort ?? 'endDate',
			order: query?.order ?? 'asc',
		},
	});
}

export function getPrescription(id: string): Promise<IPrescription> {
	const prescription = mockPrescriptions.find(p => p.id === id);

	if (!prescription) {
		throw new Error('Prescription not found');
	}

	return Promise.resolve(prescription);
}

// Could be Promise<void>, but I think id has to be passed here and I do not want to have unused variables
export function requestARefill(id: string): Promise<{ id: string }> {
	return Promise.resolve({ id });
}
