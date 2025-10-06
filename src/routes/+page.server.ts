import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { WakeUpJobModel } from '$lib/models/wakeUpJobModel';
import { dbConnect } from '$lib/server/db.js';

export const actions = {
    add: async ({ request }) => {
        const data = await request.formData();
        const url = data.get('url');
        const frequency = data.get('frequency');
        await dbConnect();
        await WakeUpJobModel.create({ url, frequency })
        console.log('URL:', url);
        console.log('Frequency:', frequency);
        // return { success: true };
        return fail(400, { error: 'Failed to add URL' });
    }   
} satisfies Actions;