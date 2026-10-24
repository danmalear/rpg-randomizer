import { CommandBus, type ICommandBus } from '#command/command-bus.ts';
import type { ICommandHandler } from '#command/command-handler.ts';
import { CommandRouter, type ICommandRouter } from '#command/command-router.ts';
import type { MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import type { BaseObjectRouterOpts } from '#shared/object-router.ts';
import type { BaseRouterOpts, IBaseRouter } from '#shared/router.ts';
import cors from 'cors';
import 'dotenv/config';
import express, {
	type Express,
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { createServer } from 'http';
import { CampaignCommandHandler } from './campaign/campaign-commands.ts';
import {
	CampaignRepository,
	type ICampaignRepository,
} from './campaign/campaign-repository.ts';
import { CampaignRouter } from './campaign/campaign-router.ts';

interface Repositories {
	campaign: ICampaignRepository;
}

function initRepos(): Repositories {
	const campaign = new CampaignRepository();

	return {
		campaign,
	};
}

interface InitCommandHandlersOpts {
	repositories: Repositories;
	commandBus: ICommandBus;
}

interface CommandHandlers {
	campaign: ICommandHandler;
}

function initCommandHandlers({
	repositories,
	commandBus,
}: InitCommandHandlersOpts): CommandHandlers {
	// Initialize
	const campaign = new CampaignCommandHandler({
		campaignRepository: repositories.campaign,
	});

	// Subscribe
	commandBus.subscribe('Campaign', campaign);

	// Return
	return {
		campaign,
	};
}

interface InitRoutersOpts {
	app: Express;
	repositories: Repositories;
	commandBus: ICommandBus;
}

interface Routers {
	command: ICommandRouter;

	campaign: IBaseRouter;
}

function initRouters({
	app,
	repositories,
	commandBus,
}: InitRoutersOpts): Routers {
	// Define shared router opts
	const baseRouterOpts: BaseRouterOpts = {
		app,
	};

	const baseObjectRouterOpts: Omit<BaseObjectRouterOpts, 'repository'> = {
		...baseRouterOpts,
		commandBus,
	};

	// Initialize routers
	const commandRouter = new CommandRouter({
		...baseRouterOpts,
		commandBus,
	});

	const campaignRouter = new CampaignRouter({
		...baseObjectRouterOpts,
		repository: repositories.campaign,
	});

	// Initialize routes
	commandRouter.init();
	campaignRouter.init();

	// Return
	return {
		command: commandRouter,
		campaign: campaignRouter,
	};
}

function createAppServer() {
	const app = express();

	app.use(cors());
	app.use(express.json());

	const server = createServer(app);

	const repositories = initRepos();

	const commandBus = new CommandBus();

	initCommandHandlers({
		repositories,
		commandBus,
	});

	initRouters({
		app,
		repositories,
		commandBus,
	});

	app.use((req: Request, res: Response<MessageResponse>) => {
		console.error('Unhandled request received');
		res.status(404).send({ message: `Unknown route: ${req.path}` });
	});

	app.use(
		(
			err: unknown,
			_req: Request,
			res: Response<MessageResponse>,
			_next: NextFunction,
		) => {
			console.error(err instanceof Error ? err.stack : getMessage(err));
			res
				.status(500)
				.send({ message: `Internal server error: ${getMessage(err)}` });
		},
	);

	return server;
}

const server = createAppServer();
const port = process.env.PORT ?? '3000';

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
