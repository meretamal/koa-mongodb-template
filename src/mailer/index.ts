import { createTransport, createTestAccount } from 'nodemailer';
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
  const emailData = {
    from: { name: environment.app.name, address: environment.mailer.sender },
    to: receptant,
    subject,
    html,
  };
  if (process.env.NODE_ENV === 'test') {
    const testAccount = await createTestAccount();
    const testTransporter = createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    await testTransporter.sendMail(emailData);
  } else {
    await transporter.sendMail(emailData);
  }
}
