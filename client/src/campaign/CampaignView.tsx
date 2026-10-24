import { Outlet, useLoaderData } from 'react-router';
import { CampaignContext } from './CampaignContext.ts';
import type { campaignLoader } from './campaign-loader.ts';

const CampaignView: React.FC = () => {
	const { campaign } = useLoaderData<typeof campaignLoader>();

	return (
		<CampaignContext value={campaign}>
			<Outlet />
		</CampaignContext>
	);
};

export default CampaignView;
