import cron from 'node-cron';

let started = false;
if (!started) {
    started = true;

    cron.schedule('* * * * *', async () => {
        await someTask();
    });
    await someTask();
}


async function someTask() {
    console.log('Starting task');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Task completed');
}