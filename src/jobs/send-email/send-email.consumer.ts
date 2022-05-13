import { sendEmailQueue } from '@/jobs/send-email/send-email.queue';
import { sendEmail } from '@/mailer';

sendEmailQueue.process((job) => {
  return sendEmail(job.data);
});
