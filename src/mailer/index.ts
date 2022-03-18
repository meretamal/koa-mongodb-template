import { createTransport } from 'nodemailer';
import { renderFile } from 'ejs';
import { config } from '@/config';

export const transporter = createTransport({
  host: config.mailer.smtpHost,
  port: config.mailer.smtpPort,
  auth: {
    user: config.mailer.smtpUsername,
    pass: config.mailer.smtpPassword,
  },
});

export async function sendEmail({
  receptant,
  subject,
  template,
  data,
}: {
  receptant: string;
  subject: string;
  template: string;
  data?: object;
}): Promise<void> {
  const html = await renderFile(
    `${__dirname}/templates/${template}.html.ejs`,
    data,
    {
      async: true,
    },
  );
  await transporter.sendMail({
    from: { name: config.app.name, address: config.mailer.sender },
    to: receptant,
    subject,
    html,
  });
}
