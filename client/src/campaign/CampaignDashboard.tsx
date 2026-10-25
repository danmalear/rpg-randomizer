import { useContext } from 'react';
import { CampaignContext } from './CampaignContext.ts';

const CampaignDashboard: React.FC = () => {
	const { state: campaignState } = useContext(CampaignContext);
	const { campaign } = campaignState;

	return <div>{campaign.name}</div>;
};

export default CampaignDashboard;
