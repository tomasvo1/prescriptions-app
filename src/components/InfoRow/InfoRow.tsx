import { PropsWithChildren } from 'react';


interface IInfoRow {
	label: React.ReactNode;
	applyBody1?: boolean;
	className?: string;
}


function InfoRow({ label, children }: PropsWithChildren<IInfoRow>) {
	return (
		<div className="flex flex-col">
			<dt className="text-xs font-medium text-neutral-600">{label}</dt>
			<dd className="break-words text-md font-medium">
				{children || '-'}
			</dd>
		</div>
	);
}


export default InfoRow;
