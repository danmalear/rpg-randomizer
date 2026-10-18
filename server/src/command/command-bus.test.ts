import { NotFoundError } from '#shared/error.ts';
import assert from 'assert';
import { beforeEach, suite, test } from 'node:test';
import { CommandBus } from './command-bus.ts';
import { fakeCommand } from './fakes/fake-command-data.ts';
import { FakeCommandHandler } from './fakes/fake-command-handler.ts';

suite('CommandBus', () => {
	let commandBus: CommandBus;
	const fakeCommandHandler = new FakeCommandHandler();

	beforeEach(() => {
		fakeCommandHandler.resetCalls();
		commandBus = new CommandBus();
	});

	suite('subscribe', () => {
		test('subscribes a handler to a new context', () => {
			commandBus.subscribe('Context', fakeCommandHandler);
			assert.strictEqual(commandBus.handlers['Context'], fakeCommandHandler);
		});

		test('does not subscribe a handler to an existing context', () => {
			commandBus.handlers = {
				Context: fakeCommandHandler,
			};
			const newHandler = new FakeCommandHandler();
			commandBus.subscribe('Context', newHandler);
			assert.strictEqual(commandBus.handlers['Context'], fakeCommandHandler);
		});
	});

	suite('emit', () => {
		beforeEach(() => {
			commandBus.handlers = {
				[fakeCommand.context]: fakeCommandHandler,
			};
		});

		test('emits a valid command', async () => {
			await commandBus.emit(fakeCommand);
			assert.strictEqual(fakeCommandHandler.calls.handle, 1);
		});

		test('throws an error when an invalid context is supplied', async () => {
			const badCommand = { ...fakeCommand };
			badCommand.context = 'BadContext';
			await assert.rejects(commandBus.emit(badCommand), NotFoundError);
		});
	});
});
