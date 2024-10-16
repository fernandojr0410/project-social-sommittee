import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class SmsService {
  private readonly apiKey = process.env.SMS_DEV_API_KEY;
  private readonly smsApiUrl = 'https://api.smsdev.com.br/v1/send';

  constructor(private readonly httpService: HttpService) {}

  // async sendSms(
  //   phoneNumber: string,
  //   message: string,
  // ): Promise<AxiosResponse<any>> {
  //   const data = {
  //     key: this.apiKey,
  //     type: '9',
  //     number: phoneNumber,
  //     msg: message,
  //   };

  //   try {
  //     const response = await this.httpService
  //       .post(this.smsApiUrl, data)
  //       .toPromise();

  //     console.log('Resposta completa do SMSDev:', response.data);

  //     if (response.data.error) {
  //       console.error('Erro ao enviar SMS:', response.data.error);
  //     } else {
  //       console.log('SMS enviado com sucesso:', response.data);
  //     }

  //     return response.data;
  //   } catch (error) {
  //     console.error('Erro ao enviar SMS:', error.message);
  //     throw new Error('Erro ao enviar SMS');
  //   }
  // }
  async sendSms(phoneNumber: string, message: string): Promise<void> {
    console.log(`Simulação de envio de SMS para ${phoneNumber}: ${message}`);
  }
}
