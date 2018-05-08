declare module '*.less' {
	const content: { [className: string]: string };
	export = content;
}

declare module '*.json' {
	const content: {
		code: number,
		data: any,
	}

	export = content;
}

declare module 'react-plyr';

// declaration.d.ts
// declare module '*.less';
