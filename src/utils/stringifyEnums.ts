import { PrescriptionFrequencies, MedicineStrengths, MedicineForms } from '@/types';

const mapPrescriptionFrequencyToString: Record<PrescriptionFrequencies, string> = {
	[PrescriptionFrequencies['28day']]: '28 days',
	[PrescriptionFrequencies['56day']]: '56 days',
	[PrescriptionFrequencies['asNeeded']]: 'As needed',
	[PrescriptionFrequencies['custom']]: 'Custom',
};

const mapMedicineStrengthsToString: Record<MedicineStrengths, string> = {
	[MedicineStrengths.EightFifty]: '850mg',
	[MedicineStrengths.FiveHundred]: '500mg',
	[MedicineStrengths.TwoHundredFifty]: '250mg',
};

const mapMedicineFormsToString: Record<MedicineForms, string> = {
	[MedicineForms.powder]: 'Powder',
	[MedicineForms.infusionBags]: 'Infusion bags',
	[MedicineForms.oralSuspension]: 'Oral suspension',
	[MedicineForms.tablets]: 'Tablets',
	[MedicineForms.suspension]: 'Suspension',
};


export function prescriptionFrequencyToString(frequency: PrescriptionFrequencies): string {
	return mapPrescriptionFrequencyToString[frequency];
}

export function medicineStrengthToString(strength: MedicineStrengths): string {
	return mapMedicineStrengthsToString[strength];
}

export function medicineFormToString(form: MedicineForms): string {
	return mapMedicineFormsToString[form];
}
