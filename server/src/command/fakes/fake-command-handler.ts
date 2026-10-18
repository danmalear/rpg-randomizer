import type { ICloneable } from '#shared/cloneable.ts';
import type { Faker, FakerCalls } from '#shared/faker.ts';
import type { ICommandHandler } from '../command-handler.ts';

const zeroCalls: FakerCalls<ICommandHandler> = {
	handle: 0,
};

export class FakeCommandHandler
	implements Faker<ICommandHandler>, ICloneable<FakeCommandHandler>
{
	calls: FakerCalls<ICommandHandler>;

	constructor() {
		this.calls = { ...zeroCalls };
	}

	resetCalls() {
		this.calls = { ...zeroCalls };
	}

	async handle() {
		this.calls.handle++;
		return {};
	}

	clone() {
		const newHandler = new FakeCommandHandler();
		newHandler.calls = {
			...this.calls,
		};
		return newHandler;
	}
}
