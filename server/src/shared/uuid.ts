import type { UUID } from 'crypto';

export const isUUID = (value: string): value is UUID => {
	// Regular expression to match UUID format
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return uuidRegex.test(value);
};
