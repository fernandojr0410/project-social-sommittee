import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private newPasswordTemplatePath = path.resolve(__dirname, './html/NewPassword.html');
  ;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });
  }

  async sendEmailUser(recipient: string, subject: string, bodyEmail: string): Promise<nodemailer.SentMessageInfo> {
    console.log('Enviando e-mail para:', recipient);
    const info = await this.transporter.sendMail({
      from: process.env.MAILTRAP_USER,
      to: recipient,
      subject: subject,
      html: bodyEmail
    });
    return info;
  }

  async sendPasswordByEmail(recipient: string, name: string, identifier: string, newPassword: string): Promise<boolean> {
    const subject = 'Senha alterada';

    const htmlBody = fs.readFileSync(this.newPasswordTemplatePath, 'utf8');

    const replacedHtmlBody = htmlBody
      .replace('{{name}}', name)
      .replace('{{identifier}}', identifier)
      .replace('{{newPassword}}', newPassword);

    const emailSent = await this.sendEmailUser(recipient, subject, replacedHtmlBody);

    return !!emailSent.accepted.length
  }
}