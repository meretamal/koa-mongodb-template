import { JobOptions } from 'bull';
import { sendEmail } from '@/mailer';
import { createQueue } from './utils/create-queue';

const sendEmailQueue = createQueue('send-email-queue');

sendEmailQueue.process((job) => {
  return sendEmail(job.data);
});

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
