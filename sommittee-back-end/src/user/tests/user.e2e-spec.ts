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
    .expect(401)
  return response
})

it('Filtrando usuário especifico', async () => {
  const response = await request(app.getHttpServer())
    .get('/users/01a60b31-b85f-4541-91dc-549f207ac85b')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)
  return response
})

it('Filtrando usuário especifico incorreto', async () => {
  const response = await request(app.getHttpServer())
    .get('/users/01a60b31-b85f-4541-91dc-549f207ac85q')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)
  return response
})

it('Tentando filtrar usuário especifico sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/users/01a60b31-b85f-4541-91dc-549f207ac85b')
    .expect(401)
  return response
})

it('Deletando usuário', async () => {
  const response = await request(app.getHttpServer())
    .delete('/users/c4383e12-1508-4783-9be4-e2edeb4b425f')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)
  return response
})

it('Deletando usuário com ID incorreto', async () => {
  const response = await request(app.getHttpServer())
    .delete('/users/c4383e12-1508-4783-9be4-e2edeb4b425a')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)
  return response
})

it('Deletando usuário sem o token', async () => {
  const response = await request(app.getHttpServer())
    .delete('/users/c4383e12-1508-4783-9be4-e2edeb4b425f')
    .expect(401)
  return response
})