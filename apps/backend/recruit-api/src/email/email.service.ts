import { Injectable, Logger } from '@nestjs/common';
import { MailDataRequired, default as SendGrid } from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendStatusUpdateEmail(
    recipient: string,
    body: string,
    subject: string
  ): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      from: 'noreply@mintaltd.com',
      templateId: 'status-update-template',
      dynamicTemplateData: { body, subject: subject },
    };

    try {
      await SendGrid.send(mail);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
