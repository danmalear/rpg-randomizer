import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCampaign } from './campaign-dtos.ts';

export interface CreateCampaignModalProps extends React.PropsWithChildren {
	opened: boolean;
	onCreate: (campaign: CreateCampaign) => void;
	onClose: () => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
	opened,
	onCreate,
	onClose,
}) => {
	const campaign = useForm<CreateCampaign>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
		},
		validate: {
			name: (name) => (!name ? 'Campaign Name is required' : null),
		},
	});

	const handleCreateClicked: React.SubmitEventHandler<HTMLFormElement> = (
		e,
	) => {
		e.preventDefault();
		onCreate(campaign.getValues());
		onClose();
	};

	return (
		<Modal opened={opened} onClose={onClose} title="New Campaign" centered>
			<form onSubmit={handleCreateClicked}>
				<TextInput
					label="Campaign Name"
					withAsterisk
					key={campaign.key('name')}
					{...campaign.getInputProps('name')}
				/>
				<Button type="submit" mt="sm">
					Create
				</Button>
			</form>
		</Modal>
	);
};

export default CreateCampaignModal;
