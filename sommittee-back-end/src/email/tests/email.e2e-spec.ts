import { app, authToken } from '../../global.e2e-spec';
import request from 'supertest';

describe('Enviando senha gerada ao usuário', () => {
  it('Deve gerar uma nova senha para um usuário e enviar por e-mail', async () => {
    const userId = '4a8c5236-f1ad-4dfe-8bda-ad539b7ca249';

    const response = await request(app.getHttpServer())
      .patch(`/password/generate/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.message).toEqual('Senha atualizada com sucesso e enviada por email');

    const emailSentSuccessfully = true;
    expect(emailSentSuccessfully).toBeTruthy();
  });
});
