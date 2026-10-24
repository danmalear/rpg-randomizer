import { useContext } from 'react';
import { CampaignContext } from './CampaignContext.ts';

const CampaignView: React.FC = () => {
	const campaign = useContext(CampaignContext);

	return <div>{campaign.name}</div>;
};

export default CampaignView;
