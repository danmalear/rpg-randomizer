import type { DataResponse, MessageResponse } from '#shared/dtos.ts';
import { getMessage, getStatusCode } from '#shared/error.ts';
import { BaseRouter, type BaseRouterOpts } from '#shared/router.ts';
import type { Response } from 'express';
import type { ICommandBus } from './command-bus.ts';
import { validateCommandRequest } from './command-dtos.ts';
import type { ICommand } from './command.ts';

export interface CommandRouterOpts extends BaseRouterOpts {
	commandBus: ICommandBus;
}

export class CommandRouter extends BaseRouter {
	commandBus: ICommandBus;

	constructor({ app, commandBus }: CommandRouterOpts) {
		super({
			app,
			namespace: 'commands',
		});

		this.commandBus = commandBus;
	}

	override post() {
		this.app.post(
			`/${this.namespace}`,
			async (req, res: Response<MessageResponse | DataResponse<object>>) => {
				console.log(`Command received. body: ${JSON.stringify(req.body)}`);

				try {
					validateCommandRequest(req.body);
				} catch (e) {
					res.status(getStatusCode(e)).send({ message: getMessage(e) });
					return;
				}

				const command: ICommand = {
					context: req.body.context,
					ref: req.body.ref,
					data: req.body.data,
				};

				const responseData = await this.commandBus.emit(command);

				res.send({ data: responseData });
			},
		);
	}
}
