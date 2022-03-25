import Queue, { Queue as IQueue } from 'bull';
import { environment } from '@/config/environment';

export function createQueue(name: string): IQueue {
  const { url, ...redis } = environment.redis;
  if (url) {
    return new Queue(name, url);
  }
  return new Queue(name, { redis });
}
