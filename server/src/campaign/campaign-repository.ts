import { db } from '#db';
import type { Models } from '#prisma';
import { Repository, type IRepository } from '#shared/repository.ts';
import type { Scalars } from '@prisma/orm-postgres/components';
import type { UUID } from 'crypto';

export type CampaignRaw = Scalars<Models.public_Campaign>;

export type ICampaignRepository = IRepository<CampaignRaw>;

export class CampaignRepository
	extends Repository<CampaignRaw>
	implements ICampaignRepository
{
	override descriptor = 'Campaign';

	override async getByIdMin(campaignId: UUID): Promise<CampaignRaw | null> {
		try {
			return await db.orm.public.Campaign.first({
				CampaignId: campaignId,
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getByIdFull(campaignId: UUID): Promise<CampaignRaw | null> {
		try {
			return await db.orm.public.Campaign.first({
				CampaignId: campaignId,
			});
		} catch (e) {
			throw this.getByIdError(campaignId, e);
		}
	}

	override async getAll(): Promise<CampaignRaw[]> {
		try {
			return await db.orm.public.Campaign.all();
		} catch (e) {
			throw this.getAllError(e);
		}
	}

	override async create(data: CampaignRaw): Promise<CampaignRaw> {
		try {
			return await db.orm.public.Campaign.create(data);
		} catch (e) {
			throw this.createError(e);
		}
	}

	override async update(
		campaignId: UUID,
		data: Partial<CampaignRaw>,
	): Promise<CampaignRaw | null> {
		try {
			return await db.orm.public.Campaign.where({
				CampaignId: campaignId,
			}).update(data);
		} catch (e) {
			throw this.updateError(campaignId, e);
		}
	}
}
