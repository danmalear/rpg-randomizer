import { BadRequestError } from '#shared/error.ts';
import assert from 'assert';
import test, { suite } from 'node:test';
import { validateCommandRequest } from './command-dtos.ts';
import { fakeCommandRequest } from './fakes/fake-command-data.ts';

suite('Command DTOs', () => {
	suite('validateCommandRequest', () => {
		test('validates a complete valid command request', () => {
			assert.doesNotThrow(() => validateCommandRequest(fakeCommandRequest));
		});

		test('validates a minimal valid command request', () => {
			const command = {
				...fakeCommandRequest,
				data: {},
			};

			assert.doesNotThrow(() => validateCommandRequest(command));
		});

		test('throws an error with no command request', () => {
			assert.throws(() => validateCommandRequest(undefined), BadRequestError);
		});

		test('throws an error with bad command request', () => {
			assert.throws(
				() => validateCommandRequest(fakeCommandRequest.ref),
				BadRequestError,
			);
		});

		test('throws an error with no context', () => {
			const command = {
				...fakeCommandRequest,
				context: undefined,
			};

			assert.throws(() => validateCommandRequest(command), BadRequestError);
		});

		test('throws an error with blank context', () => {
			const command = {
				...fakeCommandRequest,
				context: '',
			};

			assert.throws(() => validateCommandRequest(command), BadRequestError);
		});

		test('throws an error with invalid context', () => {
			const command = {
				...fakeCommandRequest,
				context: {
					description: fakeCommandRequest.context,
				},
			};

			assert.throws(() => validateCommandRequest(command), BadRequestError);
		});

		test('throws an error with no ref', () => {
			const command = {
				...fakeCommandRequest,
				ref: undefined,
			};

			assert.throws(() => validateCommandRequest(command), BadRequestError);
		});

		test('throws an error with blank ref', () => {
			const command = {
				...fakeCommandRequest,
				ref: '',
			};

			assert.throws(() => validateCommandRequest(command), BadRequestError);
		});

		test('throws an error with invalid ref', () => {
			const command = {
				...fakeCommandRequest,
				ref: {
					description: fakeCommandRequest.ref,
				},
			};

			assert.throws(() => validateCommandRequest(command), BadRequestError);
		});

		test('throws an error with no data', () => {
			const command = {
				...fakeCommandRequest,
				data: undefined,
			};

			assert.throws(() => validateCommandRequest(command), BadRequestError);
		});
	});
});
