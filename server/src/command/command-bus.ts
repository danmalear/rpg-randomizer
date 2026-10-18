import { NotFoundError } from '#shared/error.ts';
import type { ICommandHandler } from './command-handler.ts';
import type { ICommand } from './command.ts';

export interface ICommandBus {
	subscribe: (context: string, handler: ICommandHandler) => void;
	emit: (message: ICommand) => Promise<object>;
}

export class CommandBus implements ICommandBus {
	handlers: Record<string, ICommandHandler>;

	constructor() {
		this.handlers = {};
	}

	/**
	 * Add a class with a handle method to the list of subscribers, so new messages will be processed
	 *
	 * @param context Context to listen to
	 * @param handler A class that can handle messages of the specified type
	 */
	subscribe(context: string, handler: ICommandHandler) {
		// Don't register the same handler context twice
		if (this.handlers[context]) {
			console.warn(
				'Handler attempted to subscribe to context already handled - returning early.',
			);
			return;
		}
		this.handlers[context] = handler;
	}

	/**
	 * Emit a command to its handler
	 *
	 * @param command Command to emit
	 * @returns Data relevant to command
	 */
	async emit(command: ICommand): Promise<object> {
		console.log('Processing command', command.ref);

		const { context } = command;

		if (!this.handlers[context]) {
			throw new NotFoundError(
				`Context ${context} for command request not found.`,
			);
		}

		const handler = this.handlers[context];
		return await handler.handle(command);
	}
}
