import type { ICommandHandler } from '#command/command-handler.ts';
import type { CommandFunction } from '#command/command-types.ts';
import type { ICommand } from '#command/command.ts';
import { BadRequestError, NotFoundError } from '#shared/error.ts';
import { randomUUID, type UUID } from 'node:crypto';
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

export interface RenameCampaign {
	id: UUID;
	name: string;
}

function validateRenameCampaign(
	command: object,
): asserts command is RenameCampaign {
	if (!('id' in command) || !command.id) {
		throw new BadRequestError('No ID specified for campaign command');
	}
	if (typeof command.id !== 'string' || !command.id.length) {
		throw new BadRequestError(
			`Invalid ID specified for campaign command: ${command.id}`,
		);
	}
	if (!('name' in command) || !command.name) {
		throw new BadRequestError('No name specified for rename request');
	}
	if (typeof command.name !== 'string') {
		throw new BadRequestError(
			`Invalid name specified when renaming campaign: ${command.name}`,
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
			case 'Rename':
				return await this.Rename(command);
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

	Rename: CommandFunction = async (command) => {
		const updateTime = new Date().toISOString();

		validateRenameCampaign(command.data);

		const campaign = await this.campaignRepository.update(command.data.id, {
			Name: command.data.name,
			UpdatedUtc: updateTime,
		});

		if (!campaign) {
			throw new NotFoundError(`Campaign not found for ID: ${command.data.id}`);
		}

		return campaign;
	};
}
