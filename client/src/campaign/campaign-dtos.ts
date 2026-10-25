import type { CommandRequest } from '#shared/dtos.ts';
import { isUUID } from '#shared/uuid.ts';
import type { UUID } from 'crypto';

// Commands

export type CampaignCommand<
	TRef extends string,
	TData extends object,
> = CommandRequest<'Campaign', TRef, TData>;

export interface CreateCampaign {
	name: string;
}

export type CreateCampaignCommand = CampaignCommand<'Create', CreateCampaign>;

export interface RenameCampaign {
	name: string;
}

export type RenameCampaignCommand = CampaignCommand<'Rename', RenameCampaign>;

// Queries

/**
 * Hydrated and flattened response structure for campaigns.
 * Useful for showing all relevant data for one record.
 */
export interface CampaignResponse {
	id: UUID;
	name: string;
}

export function validateCampaignResponse(
	response: object,
): asserts response is CampaignResponse {
	if (!('id' in response) || !response.id) {
		throw new Error('Missing Campaign ID');
	}
	if (typeof response.id !== 'string' || !isUUID(response.id)) {
		throw new Error(`Invalid Campaign ID: ${response.id}`);
	}
	if (!('name' in response) || !response.name) {
		throw new Error('Missing Campaign name');
	}
	if (typeof response.name !== 'string') {
		throw new Error(`Invalid Campaign name: ${response.name}`);
	}
}
