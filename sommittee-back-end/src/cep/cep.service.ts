import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class CepService {
  private readonly baseUrl = 'https://viacep.com.br/ws';

  constructor(private readonly httpService: HttpService) { }

  async getCepData(cep: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/${cep}/json/`)
      );

      if (response.data.erro) {
        throw new HttpException('CEP não encontrado', HttpStatus.NOT_FOUND);
      }

      const address = response.data;

      return {
        zipcode: address.cep,
        street: address.logradouro || null,
        neighborhood: address.bairro || null,
        city: address.localidade,
        state: address.uf,
      };
    } catch (error) {
      throw new HttpException('Erro ao buscar CEP', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
