import api from '#shared/api.ts';
import type { DataResponse } from '#shared/dtos.ts';
import type { UUID } from 'crypto';
import type {
	CampaignResponse,
	CreateCampaign,
	CreateCampaignCommand,
	RenameCampaign,
	RenameCampaignCommand,
} from './campaign-dtos.ts';

export const getAllCampaigns = async () => {
	return await api.get<DataResponse<CampaignResponse[]>>(`/campaigns`);
};

export const getCampaign = async (id: UUID) => {
	return await api.get<DataResponse<CampaignResponse>>(`/campaigns/${id}`);
};

export const createCampaign = async (data: CreateCampaign) => {
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

export const renameCampaign = async (data: RenameCampaign) => {
	const commandRequest: RenameCampaignCommand = {
		context: 'Campaign',
		ref: 'Rename',
		data,
	};
	return await api.post<DataResponse<CampaignResponse>>(
		`/commands`,
		commandRequest,
	);
};
