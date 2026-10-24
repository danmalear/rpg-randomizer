import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { UUID } from 'crypto';

export type CampaignModel = Models.public_Campaign;

export type ICampaignRepository = IRepository<CampaignModel>;

export class CampaignRepository
	extends Repository<CampaignModel>
	implements ICampaignRepository
{
	override descriptor = 'Campaign';

	override async getByIdRaw(campaignId: UUID): Promise<CampaignModel | null> {
		try {
			return await db.orm.public.Campaign.first({
				CampaignId: campaignId,
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getById(campaignId: UUID): Promise<CampaignModel | null> {
		try {
			return await db.orm.public.Campaign.first({
				CampaignId: campaignId,
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getAll(): Promise<CampaignModel[]> {
		try {
			return await db.orm.public.Campaign.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: CampaignModel): Promise<CampaignModel> {
		try {
			return await db.orm.public.Campaign.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		campaignId: UUID,
		data: CampaignModel,
	): Promise<CampaignModel | null> {
		try {
			return await db.orm.public.Campaign.where({
				CampaignId: campaignId,
			}).update(data);
		} catch (e) {
			throw this.updateError(campaignId, e);
		}
	}
}
