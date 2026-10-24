import { isAxiosError } from 'axios';

export const getMessage = (e: unknown): string => {
	if (!e) {
		return 'Unknown error';
	}

	if (typeof e === 'string') {
		return e;
	}

	if (isAxiosError(e)) {
		if (
			e.response?.data &&
			'message' in e.response.data &&
			typeof e.response.data.message === 'string'
		) {
			return e.response.data.message;
		}
		return e.message;
	}

	if (e instanceof Error) {
		return e.message;
	}

	if (typeof e === 'object' && e) {
		if ('message' in e && typeof e.message === 'string') {
			return e.message;
		}
	}
	return `Unknown error: ${JSON.stringify(e)}`;
};
