export class HttpError extends Error {
	statusCode: number;
	constructor(statusCode: number, message?: string) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends HttpError {
	constructor(message: string = 'Bad Request') {
		super(400, message);
	}
}

export class NotFoundError extends HttpError {
	constructor(message: string = 'Resource Not Found') {
		super(404, message);
	}
}

export class InternalError extends HttpError {
	constructor(message: string = 'Internal Server Error') {
		super(500, message);
	}
}

export class NotImplementedError extends InternalError {
	constructor(message: string = 'Operation is not implemented') {
		super(message);
	}
}

export const getStatusCode = (e: unknown): number => {
	if (e instanceof HttpError) {
		return e.statusCode;
	}

	return 500;
};

export const getMessage = (e: unknown): string => {
	if (e instanceof Error) {
		return e.message;
	} else if (typeof e === 'string') {
		return e;
	} else if (typeof e === 'object' && e !== null) {
		if ('message' in e && typeof e.message === 'string') {
			return e.message;
		}
	}
	return 'Unknown error';
};
