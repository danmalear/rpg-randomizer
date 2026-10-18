import type { Express } from 'express';

export interface BaseRouterOpts {
	app: Express;
}

export interface PrivateBaseRouterOpts {
	namespace: string;
}

type AllBaseRouterOpts = BaseRouterOpts & PrivateBaseRouterOpts;

export interface BaseRouterInitOpts<
	GetOpts,
	PostOpts,
	PutOpts,
	PatchOpts,
	DeleteOpts,
> {
	getOpts?: GetOpts;
	postOpts?: PostOpts;
	putOpts?: PutOpts;
	patchOpts?: PatchOpts;
	deleteOpts?: DeleteOpts;
}

export interface IBaseRouter<
	GetOpts = undefined,
	PostOpts = undefined,
	PutOpts = undefined,
	PatchOpts = undefined,
	DeleteOpts = undefined,
> {
	app: Express;
	namespace: string;

	init: ({
		getOpts,
		postOpts,
		putOpts,
		patchOpts,
		deleteOpts,
	}?: BaseRouterInitOpts<
		GetOpts,
		PostOpts,
		PutOpts,
		PatchOpts,
		DeleteOpts
	>) => void;

	get: (_opts?: GetOpts) => void;
	post: (_opts?: PostOpts) => void;
	put: (_opts?: PutOpts) => void;
	patch: (_opts?: PatchOpts) => void;
	delete: (_opts?: DeleteOpts) => void;
}

/**
 * Base class to establish basic routes for a given namespace
 */
export class BaseRouter<
	GetOpts = undefined,
	PostOpts = undefined,
	PutOpts = undefined,
	PatchOpts = undefined,
	DeleteOpts = undefined,
> implements IBaseRouter<GetOpts, PostOpts, PutOpts, PatchOpts, DeleteOpts> {
	app: Express;
	namespace: string;

	constructor({ app, namespace }: AllBaseRouterOpts) {
		this.app = app;
		this.namespace = namespace;
	}

	init({
		getOpts,
		postOpts,
		putOpts,
		patchOpts,
		deleteOpts,
	}: BaseRouterInitOpts<
		GetOpts,
		PostOpts,
		PutOpts,
		PatchOpts,
		DeleteOpts
	> = {}) {
		this.get(getOpts);
		this.post(postOpts);
		this.put(putOpts);
		this.patch(patchOpts);
		this.delete(deleteOpts);
	}

	get(_opts?: GetOpts) {
		this.app.get(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `GET requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	post(_opts?: PostOpts) {
		this.app.post(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `POST requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	put(_opts?: PutOpts) {
		this.app.put(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `PUT requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	patch(_opts?: PatchOpts) {
		this.app.patch(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `PATCH requests not supported for namespace ${this.namespace}`,
			});
		});
	}

	delete(_opts?: DeleteOpts) {
		this.app.delete(`/${this.namespace}`, async (_req, res) => {
			res.status(400).send({
				message: `DELETE requests not supported for namespace ${this.namespace}`,
			});
		});
	}
}
