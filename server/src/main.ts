let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

function sha3(obj: Object) {
  const stringifiedObj: string = JSON.stringify(obj);

  const secret = 'abcdefg';
  const hash = crypto.createHmac('sha256', secret)
                      .update(stringifiedObj)
                      .digest('hex');
  
  return `0x${hash}`;
}

import Queue = require('bull');

const REDIS_URL = process.env.REDIS_URL;

const txInQueue = new Queue('tx-in-queue', REDIS_URL);
const txOutQueue = new Queue('tx-out-queue', REDIS_URL);

interface Transaction {
  data: string
}

txInQueue.process((job: Queue.Job<Transaction>, done) => {
  job.progress(38);

  const txHash: string = sha3(job.data);

  job.progress(87);

  txOutQueue.add({txHash});

  done();
})

async function main() {
  txInQueue.add({data: new Date().toISOString()} as Transaction, {repeat: {cron: '*/5 * * * * *'}})
}

main()
