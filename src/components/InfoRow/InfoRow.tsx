import { PropsWithChildren } from 'react';


interface IInfoRow {
	label: React.ReactNode;
	applyBody1?: boolean;
	className?: string;
}


function InfoRow({ label, children }: PropsWithChildren<IInfoRow>) {
	return (
		<dl className="flex flex-col">
			<dt className="text-xs font-medium text-neutral-600">{label}</dt>
			<dd className="break-words text-md font-medium">
				{children || '-'}
			</dd>
		</dl>
	);
}


export default InfoRow;
