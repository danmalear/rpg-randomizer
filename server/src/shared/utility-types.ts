export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type ConditionalKeys<T, U> = {
	[K in keyof T]: NonNullable<T[K]> extends U ? K : never;
}[keyof T];
