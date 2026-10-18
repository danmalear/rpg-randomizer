import { BadRequestError } from '#shared/error.ts';

/**
 * Valid request body structure for incoming commands.
 */
export type CommandRequest = {
	context: string;
	ref: string;
	data: object;
};

export function validateCommandRequest(
	obj: unknown,
): asserts obj is CommandRequest {
	if (!obj) {
		throw new BadRequestError(`No body supplied to Command request`);
	}
	if (typeof obj !== 'object' || Array.isArray(obj)) {
		throw new BadRequestError(`Invalid body supplied to Command request`);
	}
	if (!('context' in obj) || !obj.context) {
		throw new BadRequestError(`No context supplied to Command request`);
	}
	if (typeof obj.context !== 'string') {
		throw new BadRequestError(`Invalid context supplied to Command request`);
	}
	if (!('ref' in obj) || !obj.ref) {
		throw new BadRequestError(`No ref supplied to Command request`);
	}
	if (typeof obj.ref !== 'string') {
		throw new BadRequestError(`Invalid ref supplied to Command request`);
	}
	if (!('data' in obj) || !obj.data || typeof obj.data !== 'object') {
		throw new BadRequestError(`Invalid data supplied to Command request`);
	}
}
