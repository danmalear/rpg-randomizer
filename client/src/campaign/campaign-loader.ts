import { getMessage } from '#shared/error.ts';
import { isUUID } from '#shared/uuid.ts';
import { redirect, type LoaderFunctionArgs } from 'react-router';
import { getCampaign } from './campaign-service.ts';

export async function campaignLoader({ params }: LoaderFunctionArgs) {
	try {
		if (!params.campaignId || !isUUID(params.campaignId)) {
			throw Error('Campaign ID malformed');
		}
		const response = await getCampaign(params.campaignId);

		if (!response?.data?.data) {
			throw Error('Campaign not found');
		}

		return {
			campaign: response.data.data,
		};
	} catch (e) {
		console.error(getMessage(e));
		return redirect('/campaign');
	}
}
