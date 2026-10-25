import AppHeader from '#app-header/AppHeader.tsx';
import { getMessage } from '#shared/error.ts';
import EditableText from '#shared/ui/EditableText.tsx';
import { Skeleton } from '@mantine/core';
import { useContext, useState } from 'react';
import { renameCampaign } from './campaign-service.ts';
import { CampaignContext } from './CampaignContext.ts';

const CampaignAppHeader: React.FC = () => {
	const { state: campaignState, dispatch: campaignDispatch } =
		useContext(CampaignContext);

	const { campaign } = campaignState;

	// #region Rename

	const [isRenaming, setIsRenaming] = useState(false);

	const handleNameUpdate = (value: string) => {
		if (value === campaign.name) return;

		setIsRenaming(true);
		renameCampaign({
			id: campaign.id,
			name: value,
		})
			.then(async (res) => {
				campaignDispatch({
					type: 'updated_campaign',
					campaign: res.data.data,
				});
			})
			.catch((e) => {
				alert(`Error renaming campaign: ${getMessage(e)}`);
			})
			.finally(() => {
				setIsRenaming(false);
			});
	};

	// #endregion Rename

	return (
		<AppHeader
			title={
				isRenaming ? (
					<Skeleton height="1em"></Skeleton>
				) : (
					<EditableText
						textElement={'h2'}
						value={campaign.name}
						onSubmit={handleNameUpdate}
					/>
				)
			}
		/>
	);
};

export default CampaignAppHeader;
