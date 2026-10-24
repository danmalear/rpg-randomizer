import type { ICommandBus } from '#command/command-bus.ts';
import type { Response } from 'express';
import type { DataResponse, MessageResponse } from './dtos.ts';
import { getMessage, NotImplementedError } from './error.ts';
import type { IRepository } from './repository.ts';
import {
	BaseRouter,
	type BaseRouterOpts,
	type PrivateBaseRouterOpts,
} from './router.ts';
import { isUUID } from './uuid.ts';

export interface BaseObjectRouterOpts<
	TModel = unknown,
	TModelIncludeAll extends TModel = TModel,
	TRepository extends IRepository<TModel, TModelIncludeAll> = IRepository<
		TModel,
		TModelIncludeAll
	>,
> extends BaseRouterOpts {
	repository: TRepository;
	commandBus: ICommandBus;
}

export interface PrivateBaseObjectRouterOpts extends PrivateBaseRouterOpts {
	descriptor: string;
	descriptors: string;
}

type AllBaseObjectRouterOpts<
	TModel,
	TModelIncludeAll extends TModel,
	TRepository extends IRepository<TModel, TModelIncludeAll> = IRepository<
		TModel,
		TModelIncludeAll
	>,
> = BaseObjectRouterOpts<TModel, TModelIncludeAll, TRepository> &
	PrivateBaseObjectRouterOpts;

/**
 * Base class for a router that supports a data object
 */
export class BaseObjectRouter<
	TModel,
	TModelIncludeAll extends TModel,
	TDto,
	TStub = TDto,
	TRepository extends IRepository<TModel, TModelIncludeAll> = IRepository<
		TModel,
		TModelIncludeAll
	>,
	GetOpts = undefined,
	PostOpts = undefined,
	PutOpts = undefined,
	PatchOpts = undefined,
	DeleteOpts = undefined,
> extends BaseRouter<GetOpts, PostOpts, PutOpts, PatchOpts, DeleteOpts> {
	descriptor: string;
	descriptors: string;
	commandBus: ICommandBus;
	repository: TRepository;

	constructor({
		app,
		namespace,
		descriptor,
		descriptors,
		commandBus,
		repository,
	}: AllBaseObjectRouterOpts<TModel, TModelIncludeAll, TRepository>) {
		super({
			app,
			namespace,
		});
		this.descriptor = descriptor;
		this.descriptors = descriptors;
		this.commandBus = commandBus;
		this.repository = repository;
	}

	toDto(_model: TModelIncludeAll): TDto {
		throw new NotImplementedError();
	}

	toStub(_model: TModel): TStub {
		throw new NotImplementedError();
	}

	/**
	 * Add a default get by ID route
	 */
	defaultGetById() {
		this.app.get(
			`/${this.namespace}/:id`,
			async (req, res: Response<MessageResponse | DataResponse<TDto>>) => {
				console.log(
					`${this.descriptor} GET request received. params: ${JSON.stringify(req.params)}`,
				);

				if (!isUUID(req.params.id)) {
					res.status(400).send({ message: 'Invalid UUID format' });
					return;
				}

				const model = await this.repository.getById(req.params.id);
				if (!model) {
					res.status(404).send({
						message: `${this.descriptor} with ID ${req.params.id} not found`,
					});
					return;
				}

				try {
					res.send({ data: this.toDto(model) });
				} catch (e) {
					res.status(500).send({
						message: getMessage(e),
					});
				}
			},
		);
	}

	/**
	 * Add a default get all route
	 */
	defaultGetAll() {
		this.app.get(
			`/${this.namespace}`,
			async (_req, res: Response<MessageResponse | DataResponse<TStub[]>>) => {
				console.log(`${this.descriptor} GET all request received.`);

				const records = await this.repository.getAll();

				const data: TStub[] = [];

				for (const record of records) {
					data.push(this.toStub(record));
				}

				res.send({
					data,
				});
			},
		);
	}
}
