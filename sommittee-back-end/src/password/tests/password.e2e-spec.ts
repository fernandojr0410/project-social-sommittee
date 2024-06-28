import request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';



it('Deve gerar uma nova senha para um usuário', async () => {
  const userId = '73511d0a-5c3e-4028-9593-180605f69ab1';

  const response = await request(app.getHttpServer())
    .patch(`/password/generate/${userId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  console.log("Generated Password:", response.body.generatedPassword);

  expect(response.body.generatedPassword).toMatch(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/);
});
