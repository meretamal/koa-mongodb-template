import Queue, { Queue as IQueue } from 'bull';
import { config } from '@/config';

export function createQueue(name: string): IQueue {
  const { url, ...redis } = config.redis;
  if (url) {
    return new Queue(name, url);
  }
  return new Queue(name, { redis });
}
