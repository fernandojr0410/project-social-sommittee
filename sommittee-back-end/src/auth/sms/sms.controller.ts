import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async sendSms(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
  ) {
    try {
      const response = await this.smsService.sendSms(phoneNumber, message);
      return {
        status: 'success',
        message: 'SMS enviado com sucesso',
        data: response,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erro ao enviar SMS',
        error: error.message,
      };
    }
  }
}
