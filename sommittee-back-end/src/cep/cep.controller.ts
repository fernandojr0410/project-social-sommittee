import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CepService } from './cep.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) { }

  @UseGuards(AuthGuard)
  @Get(':cep')
  async getCep(@Param('cep') cep: string): Promise<any> {
    return this.cepService.getCepData(cep);
  }
}
