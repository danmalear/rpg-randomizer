import type { MessageResponse } from '#shared/dtos.ts';
import { getMessage } from '#shared/error.ts';
import cors from 'cors';
import 'dotenv/config';
import express, {
	type Express,
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { createServer } from 'http';

// Temporarily empty
// eslint-disable-next-line
interface Repositories {}

function initRepos(): Repositories {
	return {};
}

interface InitCommandHandlersOpts {
	repositories: Repositories;
	// eventBus: IEventBus;
	// commandBus: ICommandBus;
}

// Temporarily empty
// eslint-disable-next-line
interface CommandHandlers {}

function initCommandHandlers({
	repositories: _r,
	// eventBus,
	// commandBus,
}: InitCommandHandlersOpts): CommandHandlers {
	// Initialize

	// Subscribe

	// Return
	return {};
}

interface InitRoutersOpts {
	app: Express;
	repositories: Repositories;
	// commandBus: ICommandBus;
}

// Temporarily empty
// eslint-disable-next-line
interface Routers {}

function initRouters({
	app: _a,
	repositories: _r,
	// commandBus,
}: InitRoutersOpts): Routers {
	// Define shared router opts

	// Initialize routers

	// Initialize routes

	// Return
	return {};
}

function createAppServer() {
	const app = express();

	app.use(cors());
	app.use(express.json());

	const server = createServer(app);

	const repositories = initRepos();

	initCommandHandlers({
		repositories,
		// commandBus,
	});

	initRouters({
		app,
		repositories,
		// commandBus,
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
