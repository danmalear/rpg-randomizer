import AppHeader from '#app-header/AppHeader.tsx';
import { getMessage } from '#shared/error.ts';
import EditableText from '#shared/ui/EditableText.tsx';
import { AppShell, AppShellMain, AppShellNavbar } from '@mantine/core';
import { Outlet, useLoaderData, useRevalidator } from 'react-router';
import { CampaignContext } from './CampaignContext.ts';
import { campaignLoader } from './campaign-loader.ts';
import { renameCampaign } from './campaign-service.ts';

const CampaignView: React.FC = () => {
	const { campaign } = useLoaderData<typeof campaignLoader>();
	const revalidator = useRevalidator();

	const handleNameUpdate = (value: string) => {
		if (value === campaign.name) return;

		renameCampaign({
			id: campaign.id,
			name: value,
		})
			.catch((e) => {
				alert(`Error renaming campaign: ${getMessage(e)}`);
			})
			.finally(() => {
				revalidator.revalidate();
			});
	};

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
						<EditableText
							textElement={'h2'}
							value={campaign.name}
							onSubmit={handleNameUpdate}
						/>
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
