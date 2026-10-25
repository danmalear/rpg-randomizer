import { createContext, type Dispatch } from 'react';
import type { CampaignAction, CampaignState } from './campaign-reducer';

export interface ICampaignContext {
	state: CampaignState;
	dispatch: Dispatch<CampaignAction>;
}

export const CampaignContext = createContext<ICampaignContext>(null!);
