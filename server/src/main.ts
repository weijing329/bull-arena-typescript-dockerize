import { sha3 } from './sha3';

import * as Queue from 'bull';

const REDIS_URL = process.env.REDIS_URL;

const txInQueue = new Queue('tx-in-queue', REDIS_URL);
const txOutQueue = new Queue('tx-out-queue', REDIS_URL);

interface ITransaction {
  data: string;
}

txInQueue.process((job: Queue.Job<ITransaction>, done: Queue.DoneCallback) => {
  job.progress(38);

  const txHash: string = sha3(job.data);

  job.progress(87);

  txOutQueue.add({ txHash });

  done();
});

async function main() {
  txInQueue.add(
    { data: new Date().toISOString() },
    {
      delay: 100,
      repeat: { cron: '*/5 * * * * *' },
    },
  );
}

main();
