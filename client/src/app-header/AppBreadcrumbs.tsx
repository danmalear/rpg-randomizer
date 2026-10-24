import { Breadcrumbs } from '@mantine/core';
import {
	href,
	NavLink,
	useLocation,
	useMatches,
	useParams,
} from 'react-router';

const AppBreadcrumbs: React.FC = () => {
	const params = useParams();
	const path = useLocation().pathname;
	const matches = useMatches();
	const navLinks: React.ReactNode[] = [];

	type CampaignData = { campaign: { name: string } };
	function validateCampaignRoute(
		campaignData: unknown,
	): asserts campaignData is CampaignData {
		if (
			!campaignData ||
			typeof campaignData !== 'object' ||
			!('campaign' in campaignData) ||
			!campaignData.campaign ||
			typeof campaignData.campaign !== 'object' ||
			!('name' in campaignData.campaign) ||
			!campaignData.campaign.name ||
			typeof campaignData.campaign.name !== 'string'
		) {
			throw Error('Campaign routing malfunctioned - try refreshing');
		}
	}

	const campaignId = params.campaignId;
	const addCampaignLinks = () => {
		navLinks.push(
			<NavLink to="/campaign" end>
				Campaigns
			</NavLink>,
		);
		if (campaignId) {
			const campaignMatch = matches.find((match) =>
				match.pathname.endsWith(campaignId),
			);
			const campaignData = campaignMatch?.loaderData;
			validateCampaignRoute(campaignData);
			const campaignName = campaignData.campaign.name;
			if (path.endsWith(campaignId)) {
				navLinks.push(campaignName);
			} else {
				navLinks.push(
					<NavLink
						to={href('/campaign/:campaignId', {
							campaignId,
						})}
						end
					>
						{campaignName}
					</NavLink>,
				);
			}
		}
	};

	if (path.match(/\/campaign(\/|$)/)) {
		addCampaignLinks();
	}

	// Shave off the active page
	navLinks.pop();

	return <Breadcrumbs separator="/">{navLinks}</Breadcrumbs>;
};

export default AppBreadcrumbs;
