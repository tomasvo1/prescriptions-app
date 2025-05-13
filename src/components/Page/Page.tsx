import { PropsWithChildren } from 'react';


interface IPage extends PropsWithChildren {
	heading: string;
	action?: React.ReactNode;
}


function Page({ heading, action, children }: IPage) {
	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="flex justify-between mb-2 flex-wrap">
				<h1 className="text-2xl font-bold sm:text-left text-center">{heading}</h1>
				{action}
			</div>

			{children}
		</div>
	);
}


export default Page;
