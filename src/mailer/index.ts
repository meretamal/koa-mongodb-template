import { createTransport } from 'nodemailer';
import { renderFile } from 'ejs';
import { environment } from '@/config/environment';

export const transporter = createTransport({
  host: environment.mailer.smtpHost,
  port: environment.mailer.smtpPort,
  auth: {
    user: environment.mailer.smtpUsername,
    pass: environment.mailer.smtpPassword,
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
    from: { name: environment.app.name, address: environment.mailer.sender },
    to: receptant,
    subject,
    html,
  });
}
