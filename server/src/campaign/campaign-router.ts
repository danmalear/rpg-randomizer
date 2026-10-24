import {
	BaseObjectRouter,
	type BaseObjectRouterOpts,
} from '#shared/object-router.ts';
import type { CampaignResponse } from './campaign-dtos.ts';
import { toDto } from './campaign-mappers.ts';
import type { CampaignModel } from './campaign-repository.ts';

export type CampaignRouterOpts = BaseObjectRouterOpts<CampaignModel>;

export class CampaignRouter extends BaseObjectRouter<
	CampaignModel,
	CampaignResponse
> {
	constructor({ app, commandBus, repository }: CampaignRouterOpts) {
		super({
			app,
			commandBus,
			repository,
			namespace: 'campaigns',
			descriptor: 'Campaign',
			descriptors: 'Campaigns',
		});
	}

	override toDto = toDto;
	override toStub = toDto;

	override get(): void {
		this.defaultGetById();
		this.defaultGetAll();
	}
}
