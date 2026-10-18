import type { ICommand } from '#command/command.ts';

const context = 'Context';
const ref = 'DoThis';
const data = {
	prop1: 'string',
	prop2: 1,
};

export const fakeCommandRequest = {
	context,
	ref,
	data,
};

export const fakeCommand: ICommand = {
	context,
	ref,
	data,
};
