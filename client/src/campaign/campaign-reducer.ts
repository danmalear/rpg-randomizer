import type { CampaignResponse } from './campaign-dtos.ts';

export interface CampaignState {
	campaign: CampaignResponse;
}

interface UpdatedCampaignAction {
	type: 'updated_campaign';
	campaign: CampaignResponse;
}

export type CampaignAction = UpdatedCampaignAction;

type CampaignReducer = (
	mapState: CampaignState,
	action: CampaignAction,
) => CampaignState;

const campaignReducer: CampaignReducer = (campaignState, action) => {
	switch (action.type) {
		case 'updated_campaign':
			return {
				...campaignState,
				campaign: action.campaign,
			};
		default:
			throw Error('Invalid campaign reducer action specified');
	}
};

export default campaignReducer;
