import AppHeader from '#app-header/AppHeader.tsx';
import { AppShell, AppShellMain, AppShellNavbar } from '@mantine/core';
import { Outlet, useLoaderData } from 'react-router';
import { CampaignContext } from './CampaignContext.ts';
import type { campaignLoader } from './campaign-loader.ts';

const CampaignView: React.FC = () => {
	const { campaign } = useLoaderData<typeof campaignLoader>();

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
				<AppHeader title={campaign.name} />
				<AppShellNavbar />
				<AppShellMain h="100%">
					<Outlet />
				</AppShellMain>
			</AppShell>
		</CampaignContext>
	);
};

export default CampaignView;
