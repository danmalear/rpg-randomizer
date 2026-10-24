import api from '#shared/api.ts';
import type { DataResponse } from '#shared/dtos.ts';
import type { UUID } from 'crypto';
import type {
	CampaignResponse,
	CreateCampaignCommand,
} from './campaign-dtos.ts';

export const getAllCampaigns = async () => {
	return await api.get<DataResponse<CampaignResponse[]>>(`/campaigns`);
};

export const getCampaign = async (id: UUID) => {
	return await api.get<DataResponse<CampaignResponse>>(`/campaigns/${id}`);
};

export const createCampaign = async (data: CampaignResponse) => {
	const commandRequest: CreateCampaignCommand = {
		context: 'Campaign',
		ref: 'Create',
		data: data,
	};
	return await api.post<DataResponse<CampaignResponse>>(
		`/commands`,
		commandRequest,
	);
};
