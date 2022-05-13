import { JobOptions } from 'bull';
import { sendEmailQueue } from './send-email.queue';

export function addSendEmailJob(
  jobData: {
    receptant: string;
    subject: string;
    template: string;
    data?: object;
  },
  jobOptions?: JobOptions,
) {
  sendEmailQueue.add(jobData, jobOptions);
}
