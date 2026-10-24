import type { ICommandHandler } from '#command/command-handler.ts';
import type { CommandFunction } from '#command/command-types.ts';
import type { ICommand } from '#command/command.ts';
import { BadRequestError } from '#shared/error.ts';
import { randomUUID } from 'crypto';
import type {
	CampaignModel,
	ICampaignRepository,
} from './campaign-repository.ts';

export interface CreateCampaign {
	name: string;
}

function validateCreateCampaign(
	command: object,
): asserts command is CreateCampaign {
	if (!('name' in command) || !command.name) {
		throw new BadRequestError('New campaigns must have a name specified');
	}
	if (typeof command.name !== 'string') {
		throw new BadRequestError(
			`Invalid name specified for new campaign: ${command.name}`,
		);
	}
}

interface CampaignCommandHandlerConfig {
	campaignRepository: ICampaignRepository;
}

export class CampaignCommandHandler implements ICommandHandler {
	campaignRepository: ICampaignRepository;

	constructor(config: CampaignCommandHandlerConfig) {
		this.campaignRepository = config.campaignRepository;
	}

	async handle(command: ICommand) {
		if (command.context !== 'Campaign') {
			throw new BadRequestError(
				'Non-campaign command submitted to campaign command handler',
			);
		}
		switch (command.ref) {
			case 'Create':
				return await this.Create(command);
			default:
				throw new BadRequestError(`Invalid campaign command: ${command.ref}`);
		}
	}

	Create: CommandFunction = async (command) => {
		const id = randomUUID();
		const createTime = new Date().toISOString();

		validateCreateCampaign(command.data);

		const campaign: CampaignModel = {
			CampaignId: id,
			Name: command.data.name,
			CreatedUtc: createTime,
			UpdatedUtc: createTime,
		};

		return await this.campaignRepository.create(campaign);
	};
}
