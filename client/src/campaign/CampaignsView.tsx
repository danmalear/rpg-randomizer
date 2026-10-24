import AppHeader from '#app-header/AppHeader.tsx';
import { getMessage } from '#shared/error.ts';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { ActionIcon, AppShell, Box, Card, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import type { CampaignResponse } from './campaign-dtos.ts';
import { getAllCampaigns } from './campaign-service.ts';

const CampaignsView: React.FC = () => {
	// const navigate = useNavigate();

	const [campaigns, setCampaigns] = useState<CampaignResponse[]>([]);

	// This keeps the array ref through callbacks
	// const campaignsRef = useRef<CampaignResponse[]>([]);
	// campaignsRef.current = campaigns;

	useEffect(() => {
		getAllCampaigns()
			.then((response) => {
				setCampaigns(response.data.data);
			})
			.catch((e) => {
				console.error(e);
				alert(`Error fetching campaigns: ${getMessage(e)}`);
			});
	}, []);

	// const handleOpenCampaignClicked = (campaignId: UUID) => {
	// 	const selectedCampaign = campaigns.find((c) => c.id === campaignId);

	// 	if (!selectedCampaign) {
	// 		throw Error('Selected campaign does not exist');
	// 	}

	// 	let destination = `${campaignId}/map`;
	// 	if (selectedCampaign.activeMapId) {
	// 		destination += `/${selectedCampaign.activeMapId}`;
	// 	}
	// 	navigate(destination);
	// };

	// #region Create campaign stuff
	// const [
	// 	createCampaignOpened,
	// 	{ open: openCreateCampaign, close: closeCreateCampaign },
	// ] = useDisclosure(false);

	// const [correlationMatchState, correlationMatchDispatch] = useReducer(
	// 	correlationMatchReducer,
	// 	{
	// 		isListeningForMatch: false,
	// 		commandCorrelationId: undefined,
	// 		eventsByCorrelationId: {},
	// 	},
	// );

	// const handleAddCampaignClicked: React.MouseEventHandler<HTMLButtonElement> = (
	// 	e,
	// ) => {
	// 	e.preventDefault();
	// 	openCreateCampaign();
	// };

	// const handleCreateCampaign = (campaign: CreateCampaign) => {
	// 	correlationMatchDispatch({
	// 		type: 'listenForMatch',
	// 	});
	// 	createCampaign(campaign)
	// 		.then((res) => {
	// 			correlationMatchDispatch({
	// 				type: 'matchCommand',
	// 				commandCorrelationId: res.data.data.correlationId,
	// 			});
	// 		})
	// 		.catch((e) => {
	// 			console.error(e);
	// 			alert(`Error creating campaign: ${getMessage(e)}`);
	// 		});
	// };

	// const handleCampaignCreated = (event: Event) => {
	// 	try {
	// 		validateCampaignCreated(event.data);
	// 		setCampaigns([...campaignsRef.current, event.data]);
	// 		correlationMatchDispatch({
	// 			type: 'matchEvent',
	// 			event: event,
	// 		});
	// 	} catch (e) {
	// 		console.error('Invalid campaign created event caught:', getMessage(e));
	// 	}
	// };

	// useEventListener(
	// 	'CampaignsView',
	// 	{
	// 		context: 'Campaign',
	// 		ref: 'Created',
	// 	},
	// 	handleCampaignCreated,
	// );

	// useEffect(() => {
	// 	if (correlationMatchState.matchedEvent) {
	// 		validateCampaignCreated(correlationMatchState.matchedEvent.data);
	// 		navigate(`${correlationMatchState.matchedEvent.data.id}/map`);
	// 		correlationMatchDispatch({ type: 'clearMatchedEvent' });
	// 	}
	// }, [correlationMatchState.matchedEvent, navigate]);

	// #endregion Create campaign stuff

	// prevent highlighting text while dragging
	const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
		e: React.MouseEvent,
	) => {
		e.preventDefault();
	};

	// #region Slides
	const slides = campaigns.map((campaign) => (
		<Carousel.Slide key={campaign.id}>
			<Card
			// campaign={campaign}
			// onOpenCampaignClicked={handleOpenCampaignClicked}
			/>
		</Carousel.Slide>
	));

	const spacer = (
		<Carousel.Slide style={{ flexShrink: 1 }}>
			<Box w={50} />
		</Carousel.Slide>
	);

	const addNew = (
		<Carousel.Slide>
			<ActionIcon
				id="add-campaign"
				variant="outline"
				color="gray"
				h="100%"
				w="100%"
				style={{
					borderStyle: 'dashed',
				}}
				// onClick={handleAddCampaignClicked}
			>
				<IconPlus />
			</ActionIcon>
		</Carousel.Slide>
	);
	// #endregion Slides

	return (
		<>
			{/* <CreateCampaignModal
				opened={createCampaignOpened}
				onClose={closeCreateCampaign}
				onCreate={handleCreateCampaign}
			/> */}
			<AppShell
				id="app-shell"
				h="100vh"
				w="100vw"
				header={{
					height: 50,
					collapsed: false,
				}}
				offsetScrollbars={true}
			>
				<AppHeader title="Campaigns" />
				<AppShell.Main h="100%" w="100%" onMouseDown={handleMouseDown}>
					<Flex h="100%" w="100%" px="20%" direction="column" justify="center">
						<Carousel
							slideSize="520px"
							slideGap={20}
							withControls={false}
							height="500px"
							emblaOptions={{
								dragFree: true,
							}}
							className="gradient-mask"
						>
							{spacer}
							{slides}
							{addNew}
							{spacer}
						</Carousel>
					</Flex>
				</AppShell.Main>
			</AppShell>
		</>
	);
};

export default CampaignsView;
