import AppHeader from '#app-header/AppHeader.tsx';
import { getMessage } from '#shared/error.ts';
import EditableText from '#shared/ui/EditableText.tsx';
import {
	AppShell,
	AppShellMain,
	AppShellNavbar,
	Skeleton,
} from '@mantine/core';
import { useState } from 'react';
import { Outlet, useLoaderData, useRevalidator } from 'react-router';
import { CampaignContext } from './CampaignContext.ts';
import { campaignLoader } from './campaign-loader.ts';
import { renameCampaign } from './campaign-service.ts';

const CampaignView: React.FC = () => {
	const { campaign: loadedCampaign } = useLoaderData<typeof campaignLoader>();
	const [campaign, setCampaign] = useState(loadedCampaign);
	const revalidator = useRevalidator();

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
				setCampaign(res.data.data);
				await revalidator.revalidate();
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
		<CampaignContext value={campaign}>
			<AppShell
				id="app-shell"
				header={{
					height: 50,
					collapsed: false,
				}}
				navbar={{
					width: 200,
					breakpoint: 'sm',
					collapsed: {
						desktop: false,
						mobile: false,
					},
				}}
				offsetScrollbars={true}
				h="100vh"
			>
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
				<AppShellNavbar />
				<AppShellMain h="100%">
					<Outlet />
				</AppShellMain>
			</AppShell>
		</CampaignContext>
	);
};

export default CampaignView;
