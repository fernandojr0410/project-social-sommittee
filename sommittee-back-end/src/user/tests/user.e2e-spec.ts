import request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';

it('Filtrando todos os usuários', async () => {
  const response = await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todos os usuários sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/users')
    .expect(200)

  return response
})

it('Tentando filtrar todos os usuários sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/users')
    .expect(401)

  return response
})

