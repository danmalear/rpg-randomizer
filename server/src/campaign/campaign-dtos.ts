import type { UUID } from 'crypto';

/**
 * Hydrated and flattened response structure for campaigns.
 * Useful for showing all relevant data for one record.
 */
export interface CampaignResponse {
	id: UUID;
	name: string;
}
