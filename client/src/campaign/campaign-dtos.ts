import type { CommandRequest } from '#shared/dtos.ts';
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

// Queries

/**
 * Hydrated and flattened response structure for campaigns.
 * Useful for showing all relevant data for one record.
 */
export interface CampaignResponse {
	id: UUID;
	name: string;
}
