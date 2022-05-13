import { createQueue } from '@/jobs/utils/create-queue';

export const sendEmailQueue = createQueue('send-email-queue');
