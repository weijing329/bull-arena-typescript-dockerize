import * as crypto from 'crypto';

export function sha3(obj: Object) {
  const stringifiedObj: string = JSON.stringify(obj);

  const secret = 'abcdefg';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(stringifiedObj)
    .digest('hex');

  return `0x${hash}`;
}
