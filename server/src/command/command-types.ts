import type { ICommand } from './command.ts';

export type CommandFunction = (command: ICommand) => Promise<object>;
