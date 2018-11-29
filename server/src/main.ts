import { sha3 } from './sha3';

import * as Queue from 'bull';

const REDIS_URL = process.env.REDIS_URL;

const txInQueue = new Queue('tx-in-queue', REDIS_URL);
const txOutQueue = new Queue('tx-out-queue', REDIS_URL);

interface ITransaction {
  data: string;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function repeat(n: number, cb: () => void) {
  [...Array(n)].forEach(cb);
}

txInQueue.process(
  async (job: Queue.Job<ITransaction>, done: Queue.DoneCallback) => {
    await delay(5000);

    job.progress(38);

    const txHash: string = sha3(job.data);

    job.progress(87);

    txOutQueue.add({ txHash });

    done();
  },
);

async function main() {
  repeat(10, () => {
    txInQueue.add({ data: new Date().toISOString() });
  });
  // txInQueue.add(
  //   { data: new Date().toISOString() },
  //   {
  //     delay: 100,
  //     repeat: { every: 5000, limit: 10 },
  //   },
  // );
}

main();
