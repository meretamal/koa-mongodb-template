import Queue, { JobOptions } from 'bull';
import { sendEmail } from '@/mailer';
import { config } from '@/config';

const sendEmailQueue = new Queue('send-email-queue', {
  redis: config.redis,
});

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
