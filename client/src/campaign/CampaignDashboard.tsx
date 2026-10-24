import { useContext } from 'react';
import { CampaignContext } from './CampaignContext.ts';

const CampaignDashboard: React.FC = () => {
	const campaign = useContext(CampaignContext);

	return <div>{campaign.name}</div>;
};

export default CampaignDashboard;
