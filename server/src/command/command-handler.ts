import type { ICommand } from './command.ts';

/**
 * Handles commands, i.e. will have commands emitted to it from a command bus
 */
export interface ICommandHandler {
	handle: (message: ICommand) => Promise<object>;
}
