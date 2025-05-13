// Mock file. Ideally we should have shared contracts for both BE and FE (including enums etc.)
// Contracts lib / package / dir would include private types for BE only and public types for FE consuming

import { PrescriptionFrequencies, MedicineStrengths, MedicineForms } from './enums';
import { IPaginatedResult, IPaginationQuery } from './pagination';


export interface IPrescription {
	id: string; // Ideally - uuid or similar
	endDate: Date;
	frequency: PrescriptionFrequencies;
	strength?: MedicineStrengths;
	note?: string;
	form?: MedicineForms;
	medicineName: string;
	dosage: string; // Expecting to be described, e.g. "1 tablet 3 times a day"
}

export type IFindPrescriptionsRequestQuery = IPaginationQuery;

// For lists, I assume backend returns array of items and meta (which could contain page, count etc.)
// for handling pagination and table data
export type IFindPrescriptionsResponseBody = IPaginatedResult<IPrescription>;

export type IGetPrescriptionResponseBody = IPrescription;
