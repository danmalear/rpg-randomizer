// import { campaignLoader } from '#campaign/campaign-loader.ts';
// import CampaignsView from '#campaign/CampaignsView.tsx';
import { campaignLoader } from '#campaign/campaign-loader.ts';
import CampaignsView from '#campaign/CampaignsView.tsx';
import { createBrowserRouter } from 'react-router';
import App from './App.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		errorElement: (
			<main className="ml-1">
				<h2>404 - Page Not Found</h2>
				<p>
					I hate those kitschy 404 pages. Either something is broken or the URL
					is wrong somehow.
				</p>
			</main>
		),
		children: [
			{
				path: 'campaign',
				children: [
					{
						index: true,
						Component: CampaignsView,
					},
					{
						path: ':campaignId',
						loader: campaignLoader,
						// Component: CampaignView,
						children: [],
					},
				],
			},
		],
	},
]);

export default router;
