import type { ConditionalKeys } from './utility-types.ts';

export type FakerCalls<T> = {
	// This usage is fine because I just care that the key indexes a function, not how it's called
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	[K in ConditionalKeys<T, Function>]: number;
};

export type Faker<T> = T & {
	calls: FakerCalls<T>;
	resetCalls: () => void;
};
