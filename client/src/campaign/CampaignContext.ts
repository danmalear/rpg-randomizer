import { createContext } from 'react';
import type { CampaignResponse } from './campaign-dtos.ts';

export const CampaignContext = createContext<CampaignResponse>(null!);
