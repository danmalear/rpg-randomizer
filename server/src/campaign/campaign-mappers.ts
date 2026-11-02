import type { UUID } from 'node:crypto';
import type { CampaignResponse } from './campaign-dtos.ts';
import type { CampaignRaw } from './campaign-repository.ts';

export const toDto = (campaign: CampaignRaw) => {
	const campaignResponse: CampaignResponse = {
		id: campaign.CampaignId as UUID,
		name: campaign.Name,
	};

	return campaignResponse;
};
