import { Card, Title } from '@mantine/core';
import type { UUID } from 'crypto';
import type { CampaignResponse as Campaign } from './campaign-dtos.ts';

export interface CampaignCardProps extends React.PropsWithChildren {
	campaign: Campaign;
	onOpenCampaignClicked: (campaignId: UUID) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
	campaign,
	onOpenCampaignClicked,
}) => {
	const { name } = campaign;

	// @TODO Eventually make this customizable?
	const campaignColor = 'black';

	return (
		<Card
			shadow="md"
			p="lg"
			radius="md"
			style={{
				backgroundColor: campaignColor,
			}}
			className="card"
			onClick={() => onOpenCampaignClicked(campaign.id)}
		>
			<Title order={2} className="title" ff="heading">
				{name}
			</Title>
		</Card>
	);
};

export default CampaignCard;
