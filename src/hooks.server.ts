import { WakeUpJobModel } from '$lib/models/wakeUpJobModel';
import { dbConnect } from '$lib/server/db';
import { Frequency, type WakeUpJob } from '$lib/wakeUpJob';
import cron from 'node-cron';

export const jobsByFrequency = new Map<Frequency, WakeUpJob[]>();

let started = false;
if (!started) {
    started = true;

    await dbConnect();

    const frequencies = Object.values(Frequency).filter(value => typeof value === "number") as Frequency[];
    for (const frequency of frequencies) {
        const jobs = await WakeUpJobModel.find({ frequency: frequency }).lean<WakeUpJob[]>();
        jobsByFrequency.set(frequency, jobs);
        const cronExpression = getCronExpression(frequency);
        cron.schedule(cronExpression, async () => {
            var jobs = jobsByFrequency.get(frequency)!;
            console.log(`Running jobs for frequency: ${Frequency[frequency]} (${jobs.length} jobs)`);
            var start = Date.now();
            await DoWakeUps(jobs);
            console.log(`${jobs.length} ${Frequency[frequency]} jobs done in ${Date.now() - start}ms`);
        });
        console.log(`Registered cron job for frequency: ${Frequency[frequency]}`);
    }

}


function getCronExpression(frequency: Frequency): string {
    switch (frequency) {
        case Frequency.Daily:
            return '0 0 * * *';
        case Frequency.Every12Hours:
            return '0 */12 * * *';
        case Frequency.Every6Hours:
            return '0 */6 * * *';
        case Frequency.Every3Hours:
            return '0 */3 * * *';
        case Frequency.EveryHour:
            return '0 * * * *';
        case Frequency.Every30Min:
            return '*/30 * * * *';
        case Frequency.Every15Min:
            return '*/15 * * * *';
        case Frequency.Every5Min:
            return '*/5 * * * *';
        default:
            throw new Error('Invalid frequency');
    }
}


async function DoWakeUps(jobs: WakeUpJob[]) {
    for (const job of jobs) {
        try {
            const response = await fetch(job.url);
            console.log(`Woke up ${job.url}: ${response.status}`);
        } catch (error) {
            console.log(`Error waking up ${job.url}:`, error);
        }
    }
}