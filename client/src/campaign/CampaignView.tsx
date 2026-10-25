import { AppShell, AppShellMain, AppShellNavbar } from '@mantine/core';
import { useReducer } from 'react';
import { Outlet, useLoaderData } from 'react-router';
import { campaignLoader } from './campaign-loader.ts';
import campaignReducer from './campaign-reducer.ts';
import CampaignAppHeader from './CampaignAppHeader.tsx';
import { CampaignContext } from './CampaignContext.ts';

const CampaignView: React.FC = () => {
	const [campaignState, campaignDispatch] = useReducer(campaignReducer, {
		campaign: useLoaderData<typeof campaignLoader>().campaign,
	});

	return (
		<CampaignContext
			value={{
				state: campaignState,
				dispatch: campaignDispatch,
			}}
		>
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
				<CampaignAppHeader />
				<AppShellNavbar />
				<AppShellMain h="100%">
					<Outlet />
				</AppShellMain>
			</AppShell>
		</CampaignContext>
	);
};

export default CampaignView;
